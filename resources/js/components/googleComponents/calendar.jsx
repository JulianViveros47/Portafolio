import React from "react";

export default function Calendar() {
  return (
    <section
      className="calendar-section"
      style={{
       
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <div style={{ width: "100%" }}>
        <iframe
          src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ2qrfq0Gt0X5ER8ArW6ehU0klX4p1N-JMoRY2wJCeh1jOTnWJioEd5w4skiZFRNXE5ScdCPY8zT?gv=true"
          style={{ border: 0, width: "100%", height: "600px" }}
          frameBorder="0"
          title="Google Calendar Appointment Scheduling"
        ></iframe>
      </div>
    </section>
  );
}

