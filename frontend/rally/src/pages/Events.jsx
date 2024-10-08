import React from "react";
import "./Events.css";
import TitleBox from "../components/TitleBox";
import "../components/Box.css";
import AttendeeBox from "../components/AttendeeBox";
import BroadcastBox from "../components/BroadcastBox";
import RoundedBox from "../components/Box";
import ShareButton from "../components/ShareButton";
import { useState, useEffect } from "react";
import InfoBox from "../components/InfoBox";
import Modal from "../components/Modal";
import { useParams } from "react-router-dom";
import BroadcastPage from "../broadcasts/BroadcastPage";

export const Events = () => {
  const { id } = useParams();
  const userEmail = localStorage.getItem('email');

  // get single event by id
  const apiURL = process.env.REACT_APP_API_URL;
  const url = `${apiURL}/events/get_event/` + id;
  console.log(url);
  const [event, setEvent] = useState([]);
  const [attendees, setAttendees] = useState([]);
  const [creatorEmail, setCreatorEmail] = useState([]);
  // const [groupedevents, segroupedtEvents] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {

        console.log(data); // Log the data to see what is being returned

        setEvent(data);
        if (typeof data.attendees === "string") {
          try {
            const parsedAttendees = JSON.parse(data.attendees);
            setAttendees(parsedAttendees);
          } catch (error) {
            console.error("Error parsing attendees JSON string:", error);
          }
        } else {
          setAttendees(data.attendees || []);
        }
      
        console.log("data: ", data); // Log the data to see what is being returned
        const updatedEvent = {
          ...data,
          creatorEmail: data.creator ? data.creator : undefined,  // Set creatorEmail if it exists
          msgs : data.msgs ? data.msgs : []
        };
  
        setEvent(updatedEvent);  // Update the event state with the modified object
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, [url]);

  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);
  const [isAttendeeModalOpen, setIsAttendeeModalOpen] = useState(false);
  const [isBroadcastModalOpen, setIsBroadcastModalOpen] = useState(false);

  const handleDescriptionClick = () => {
    setIsDescriptionModalOpen(true);
  };

  const handleCloseDescriptionModal = () => {
    setIsDescriptionModalOpen(false);
  };

  const handleAttendeeClick = () => {
    setIsAttendeeModalOpen(true);
  };

  const handleCloseAttendeeModal = () => {
    setIsAttendeeModalOpen(false);
  };

  const handleBroadcastClick = () => {
    setIsBroadcastModalOpen(true);
  };

  const handleCloseBroadcastModal = () => {
    setIsBroadcastModalOpen(false);
  };

  return (
    <>
      <div
        className={`background ${
          isDescriptionModalOpen || isAttendeeModalOpen || isBroadcastModalOpen
            ? "blurred"
            : ""
        }`}
      >
        <TitleBox event={event} />
        <InfoBox onDescriptionClick={handleDescriptionClick} event={event} />
        <AttendeeBox onAttendeeClick={handleAttendeeClick} attendees={attendees} />
        <BroadcastBox onBroadcastClick={handleBroadcastClick} event={event} />
        <div className="rounded-box-container">
          <RoundedBox>Donate</RoundedBox>
          <ShareButton code={event.id} />
        </div>
      </div>
      {isDescriptionModalOpen && (
        <Modal onClose={handleCloseDescriptionModal} event={event}>
          <h2>Description</h2>
          <p>
            {event.description || "This event does not have a description yet."}
          </p>
        </Modal>
      )}
      {isAttendeeModalOpen && (
        <Modal onClose={handleCloseAttendeeModal} event={event}>
          <h2>Attendees</h2>
          <ul>
            {attendees &&
              attendees.map((attendee) => (
                <li key={attendee.email}>{attendee.email}</li>
              ))}
          </ul>
        </Modal>
      )}
      {isBroadcastModalOpen && (
        <Modal onClose={handleCloseBroadcastModal} event={event}>
          {/* <h2>Broadcasts</h2>
          <ul>
            <li>Broadcast 1</li>
            <li>Broadcast 2</li>
            <li>Broadcast 3</li>
            <li>Broadcast 4</li>
          </ul> */}
          <BroadcastPage isCreator={userEmail==event.creatorEmail} event={event}/>
        </Modal>
        // <BroadcastBox/>
      )}
    </>
  );
};

export default Events;
