import React from "react";
import TrainingMonth from "./TrainingMonth/TrainingMonth";
import moment from "moment";

const TrainingYear = ({ trainings, year, userId, teamId, onDeleteUpdate }) => {
  const trainingMonthsArray = Object.values(trainings);
  const trainingMonthsNames = Object.keys(trainings);

  const trainingMonths = trainings
    ? trainingMonthsArray.map((month, index) => {
        const trainingsInMonth = Object.values(month);
        const trainingsSortedByDate = trainingsInMonth.sort((a, b) => {
          const aDate = moment(new Date(a.trainingInfo.date));
          const bDate = moment(new Date(b.trainingInfo.date));
          return aDate > bDate ? 1 : -1;
        });
        const checkboxes = trainingsInMonth.map((training) => ({
          checked: false,
          id: training.trainingId,
        }));

        return (
          <TrainingMonth
            trainings={trainingsSortedByDate}
            checkboxes={checkboxes}
            key={`${year} ${trainingMonthsNames[index]}`}
            year={year}
            month={trainingMonthsNames[index]}
            userId={userId}
            teamId={teamId}
            onDeleteUpdate={onDeleteUpdate}
          />
        );
      })
    : null;

  return <>{trainingMonths}</>;
};

export default TrainingYear;
