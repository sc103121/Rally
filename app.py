from flask import Flask, request, jsonify
import joblib
import pandas as pd
from sklearn.model_selection import train_test_split
from flask_cors import CORS
from sklearn.metrics import accuracy_score
from sklearn.metrics.pairwise import cosine_similarity
import mlflow
import xgboost as xgb
from sklearn.preprocessing import LabelEncoder
import torch
import numpy as np
from transformers import BertTokenizer, BertModel

app = Flask(__name__)
CORS(app)

# Load the dataset
data = pd.read_csv('Event_Dataset.csv')  # Example dataset

# Combine event name and description
data['text'] = data['event_name'] + " " + data['event_description']

# Encode the categorical labels into numerical labels
label_encoder = LabelEncoder()
data['category_encoded'] = label_encoder.fit_transform(data['category'])

# Initialize the BERT tokenizer and model
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model = BertModel.from_pretrained('bert-base-uncased')

# Function to convert text into BERT embeddings and ensure it's 2D
def get_bert_embedding(text):
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True, max_length=512)
    with torch.no_grad():
        outputs = model(**inputs)
    # Take the pooled output, which represents the [CLS] token's embedding and reshape to 2D
    return outputs.pooler_output.numpy()

# Create BERT embeddings for the dataset
data['bert_embedding'] = data['text'].apply(lambda x: get_bert_embedding(x)[0])

# Convert BERT embeddings from list to 2D matrix
X = np.vstack(data['bert_embedding'].values)
y = data['category_encoded']

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Initialize and train the XGBoost Classifier once
clf = xgb.XGBClassifier(use_label_encoder=False, eval_metric='mlogloss')
clf.fit(X_train, y_train)  # Train the model on the training data

# Log the model once
with mlflow.start_run():
    y_pred = clf.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    mlflow.sklearn.log_model(clf, "text_category_model")
    mlflow.log_metric("accuracy", accuracy)

@app.route('/predict', methods=['POST'])
def predict():
    # Get the JSON request data
    request_data = request.get_json()

    event_name = request_data.get('event_name', '')
    event_description = request_data.get('event_description', '')

    # Combine event name and description into a single string and get BERT embedding
    combined_text = event_name + ' ' + event_description
    X_final_test = get_bert_embedding(combined_text).reshape(1, -1)  # Ensure 2D for XGBoost

    # Predict the category for the input event
    predicted_category_encoded = clf.predict(X_final_test)[0]
    predicted_category = label_encoder.inverse_transform([predicted_category_encoded])[0]  # Convert back to original label

    # Call the recommend function to get similar events
    recommendations = recommend_events(event_name, event_description, predicted_category)

    return jsonify({
        'predicted_category': predicted_category,
        'recommendations': recommendations
    })

# Recommendation function to find 3 similar events
def recommend_events(event_name, event_description, predicted_category):
    input_event_text = event_name + ' ' + event_description

    # Get BERT embedding for the input event
    input_event_vector = get_bert_embedding(input_event_text).reshape(1, -1)

    # Calculate cosine similarity between input event and all other events
    event_vectors = np.vstack(data['bert_embedding'])
    similarities = cosine_similarity(input_event_vector, event_vectors).flatten()

    # Sort by similarity score in descending order and get all similar indices
    similar_indices = pd.Series(similarities).sort_values(ascending=False).index

    # Keep track of unique event names and descriptions to avoid duplicates
    unique_names = set()
    unique_descriptions = set()
    unique_indices = []

    # Loop through sorted similar indices and ensure uniqueness
    for idx in similar_indices:
        event_name = data['event_name'][idx]
        event_description = data['event_description'][idx]
        event_category = data['category'][idx]

        # Check if the event name or description has already been used
        if event_name not in unique_names and event_description not in unique_descriptions and event_category == predicted_category:
            unique_indices.append(idx)
            unique_names.add(event_name)
            unique_descriptions.add(event_description)

        # Stop when we have found 3 unique events
        if len(unique_indices) == 3:
            break

    # Retrieve the top 3 unique similar events
    similar_events = data.iloc[unique_indices]

    # Format the recommendations into a list of dictionaries
    recommendations = similar_events[['event_name', 'event_description', 'category']].to_dict(orient='records')

    return recommendations


if __name__ == '__main__':
    # Run the Flask app
    app.run(host='0.0.0.0', port=5001)
