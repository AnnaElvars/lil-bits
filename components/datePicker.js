import DatePicker from "react-datepicker";
import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";

const CalendarPick = () => {
  const [selectedDateTime, setSelectedDateTime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const handleDateTimeChange = (date) => {
    if (date instanceof Date && !isNaN(date)) {
      setSelectedDate(date);
      setSelectedTime(date);
      const formattedDateTime =
        date.toLocaleDateString() +
        " " +
        date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      handleDateTimeChange(formattedDateTime);
    } else {
      setSelectedDate("");
      setSelectedTime("");
      setSelectedDateTime("");
    }
  };

  //   const isBrowser = typeof window !== "undefined";

  //   const [enteredEmail, setEnteredEmail] = useState(() => {
  //     if (isBrowser) {
  //       const email = localStorage.getItem("enteredEmail");
  //       return email ? JSON.parse(email) : "";
  //   }
  //   return "";
  // });
  //   const order = JSON.parse(localStorage.getItem(enteredEmail)) || {};
  // useEffect(() => {

  //   localStorage.setItem(order, selectedDateTime.toString());
  // }, [selectedDateTime]);

  return (
    <div className="relative p-2">
      <DatePicker
        selected={selectedDateTime.toLocaleDateString}
        // selected={selectedDate && selectedTime ? new Date(selectedDate + " " + selectedTime) : null}
        onChange={handleDateTimeChange}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={30}
        dateFormat="d, MMMM, yyyy h:mm aa"
        minTime={new Date().setHours(16, 0)}
        maxTime={new Date().setHours(23, 0)}
        inline
        // className=" bg-lime border-2 border-kale rounded-lg shadow-lg"
        // calendarClassName=""
      />
      {/* Additional code and components */}
    </div>
  );
};

export default CalendarPick;

// const Calendar = () =>{
//     return(
//         <div>
//     selected={startDate}
//     onChange={(date) => setStartDate(date)}
//      showTimeSelect
//     includeTimes={[
//   setHours(setMinutes(new Date(), 0), 16),
//   setHours(setMinutes(new Date(), 30), 16),
//   setHours(setMinutes(new Date(), 0), 17),
//   setHours(setMinutes(new Date(), 30), 17),
//   setHours(setMinutes(new Date(), 0), 18),
//   setHours(setMinutes(new Date(), 30), 18),
//   setHours(setMinutes(new Date(), 0), 19),
//   setHours(setMinutes(new Date(), 30), 19),
//   setHours(setMinutes(new Date(), 0), 20),
//   setHours(setMinutes(new Date(), 30), 20),
//   setHours(setMinutes(new Date(), 0), 21),
//   setHours(setMinutes(new Date(), 30), 21),
//   setHours(setMinutes(new Date(), 0), 22),
//   setHours(setMinutes(new Date(), 30), 22),
// ]}
// dateFormat="MMMM d, yyyy h:mmaa" *
// </div>
// )}
// export default DateP;
