import React from "react";
import { Link } from "react-router-dom";

const Training = props => {
  const trainingDate = new Date(props.date);
  const trainingWeekDayIndex = trainingDate.getDay();
  const getDayOfWeek = dayIndex => {
    return [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ][dayIndex];
  };
  const trainingWeekDay = getDayOfWeek(trainingWeekDayIndex);

  console.log(props);

  return (
    <>
      <span>
        <input type="checkbox" />
      </span>
      <span>
        <Link to={`/my-teams/${props.teamId}/trainings/${props.trainingId}`}>
          {props.date}
        </Link>
      </span>
      <span>{trainingWeekDay}</span>
      <span>{props.start}</span>
      <span>{props.end}</span>
      <span>{props.place}</span>
      <span>{props.type}</span>
      <span>{props.intensity}</span>
    </>
  );
};

export default Training;
