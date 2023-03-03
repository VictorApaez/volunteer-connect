import { EventForm } from "./EventForm";
import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

function Calendar() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newEvent, setNewEvent] = useState(null);
  const [events, setEvents] = useState([
    {
      title: "Shift 1",
      start: "2023-02-20T08:00:00",
      end: "2023-02-20T16:00:00",
      editable: true,
    },
    {
      title: "Shift 2",
      start: "2023-02-23T12:00:00",
      end: "2023-02-23T20:00:00",
      editable: true,
    },
  ]);

  function handleDateSelect(info) {
    setNewEvent({
      start: info.startStr,
      end: info.endStr,
      title: "",
      allDay: info.allDay,
      editable: true,
    });
    setModalIsOpen(true);
  }

  return (
    <>
      <div
        className="calendar-wrapper"
        style={{
          flex: "1",
          position: "relative",
          marginTop: "80px",
          padding: "40px",
        }}
      >
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          initialView="dayGridMonth"
          events={events}
          scrollTime="06:00:00"
          selectable={true}
          editable={true}
          select={handleDateSelect}
          height="100%"
          stickyHeaderDates={true}
        />

        {newEvent && (
          <EventForm
            modalIsOpen={modalIsOpen}
            setModalIsOpen={setModalIsOpen}
            setNewEvent={setNewEvent}
            newEvent={newEvent}
            setEvents={setEvents}
            events={events}
          />
        )}
      </div>
    </>
  );
}

export default Calendar;
