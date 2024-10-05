import React from "react";
import "./Events.css";
import TitleBox from "../components/TitleBox";
import "../components/Box.css";
import AttendeeBox from "../components/AttendeeBox";
import BroadcastBox from "../components/BroadcastBox";
import RoundedBox from "../components/Box";
import ShareButton from "../components/ShareButton";
import { useState } from "react";
import InfoBox from "../components/InfoBox";
import Modal from "../components/Modal";
import { useParams } from "react-router-dom";

export const Events = ({ event }) => {
  const { id } = useParams();
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
        <TitleBox />
        <InfoBox onDescriptionClick={handleDescriptionClick} />
        <AttendeeBox onAttendeeClick={handleAttendeeClick} />
        <BroadcastBox onBroadcastClick={handleBroadcastClick} />
        <div className="rounded-box-container">
          <RoundedBox>Donate</RoundedBox>
          <ShareButton />
        </div>
      </div>
      {isDescriptionModalOpen && (
        <Modal onClose={handleCloseDescriptionModal}>
          <h2>Full Description</h2>
          <p>
            Lorum ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec
            nisl nec nisl. Lorum ipsum dolor sit amet, consectetur adipiscing
            elit. Nullam nec nisl nec nisl. Lorum ipsum dolor sit amet,
            consectetur adipiscing elit. Nullam nec nisl nec nisl. Lorum ipsum
            dolor sit amet, consectetur adipiscing elit. Nullam nec nisl nec
            nisl.
          </p>
        </Modal>
      )}
      {isAttendeeModalOpen && (
        <Modal onClose={handleCloseAttendeeModal}>
          <h2>Attendees</h2>
          <ul>
            <li>Attendee 1</li>
            <li>Attendee 2</li>
            <li>Attendee 3</li>
            <li>Attendee 4</li>
          </ul>
        </Modal>
      )}
      {isBroadcastModalOpen && (
        <Modal onClose={handleCloseBroadcastModal}>
          <h2>Broadcasts</h2>
          <ul>
            <li>Broadcast 1</li>
            <li>Broadcast 2</li>
            <li>Broadcast 3</li>
            <li>Broadcast 4</li>
          </ul>
        </Modal>
      )}
    </>
  );
};

export default Events;
