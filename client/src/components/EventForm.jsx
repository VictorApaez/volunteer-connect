import React from "react";
import Modal from "react-modal";
import "../styles/EventForm.css";

export function EventForm({
  modalIsOpen,
  setNewEvent,
  newEvent,
  setModalIsOpen,
  setEvents,
  events,
}) {
  function handleModalClose() {
    setModalIsOpen(false);
  }
  function handleEventCreate() {
    setEvents([...events, newEvent]);
    setModalIsOpen(false);
  }

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 1000,
    },
    content: {
      backgroundColor: "white",
      padding: "2rem",
      borderRadius: "4px",
      border: "none",
      boxShadow: "0 0 20px rgba(0, 0, 0, 0.3)",
      width: "80%",
      maxWidth: "600px",
      margin: "0 auto",
      height: "fit-content",
    },
  };
  return (
    <Modal
      style={customStyles}
      isOpen={modalIsOpen}
      onRequestClose={handleModalClose}
    >
      <form className="event-form" onSubmit={handleEventCreate}>
        <input
          className="event-form-input"
          placeholder="Add Name..."
          type="text"
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        />
        <button className="event-form-submit" type="submit">
          Save
        </button>
        <button
          className="event-form-cancel"
          type="button"
          onClick={handleModalClose}
        >
          Cancel
        </button>
      </form>
    </Modal>
  );
}
