import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/ReactCalendar/SelectDate.css";

function SelectDate() {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div style={{ paddingTop: "200px" }}>
      <label>Select a date: </label>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => {
          setSelectedDate(date);
          console.log(date);
        }}
        dateFormat="MMMM / dd / yyyy"
        calendarClassName="date-picker-calendar"
      />
    </div>
  );
}

export default SelectDate;
