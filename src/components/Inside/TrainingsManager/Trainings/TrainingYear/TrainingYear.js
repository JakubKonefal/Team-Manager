import React from "react";
import TrainingMonth from "./TrainingMonth/TrainingMonth";

const TrainingYear = ({ trainings, year, teamId }) => {
  const trainingMonthsArray = Object.values(trainings);
  const monthsInTrainingYear = Object.keys(trainings);

  const trainingMonths = trainings
    ? trainingMonthsArray.map((month, index) => (
        <TrainingMonth
          trainings={month}
          key={`${year} ${monthsInTrainingYear[index]}`}
          year={year}
          month={monthsInTrainingYear[index]}
          teamId={teamId}
        />
      ))
    : null;

  return <>{trainingMonths}</>;
};

export default TrainingYear;
