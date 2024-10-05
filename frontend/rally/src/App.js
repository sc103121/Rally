import logo from './logo.svg';
import './App.css';
import background, { Background } from './main/main.jsx';
import { Bar } from './main/horizontalBar.jsx';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <Background/>
      <Bar/>
    </div>
  );
}

export default App;
