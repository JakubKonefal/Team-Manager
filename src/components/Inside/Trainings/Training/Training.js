import React from "react";
import { Link } from "react-router-dom";

const Training = ({
  date,
  start,
  end,
  place,
  type,
  intensity,
  teamId,
  trainingId
}) => {
  const trainingDate = new Date(date);
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

  return (
    <>
      <span>
        <input type="checkbox" />
      </span>
      <span>
        <Link to={`/my-teams/${teamId}/trainings/${trainingId}`}>{date}</Link>
      </span>
      <span>{trainingWeekDay}</span>
      <span>{start}</span>
      <span>{end}</span>
      <span>{place}</span>
      <span>{type}</span>
      <span>{intensity}</span>
    </>
  );
};

export default Training;
