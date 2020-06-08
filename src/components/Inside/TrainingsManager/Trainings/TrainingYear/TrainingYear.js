import React from "react";
import TrainingMonth from "./TrainingMonth/TrainingMonth";
import moment from "moment";

const TrainingYear = ({
  trainings,
  year,
  userId,
  teamId,
  teamName,
  updateTrainings,
}) => {
  const trainingMonthsInYear = Object.entries(trainings);
  const trainingMonthsSorted = trainingMonthsInYear.sort((a, b) => {
    const firstMonthAsNumber = moment().month(a[0]).format("M");
    const secondMonthAsNumber = moment().month(b[0]).format("M");
    return firstMonthAsNumber - secondMonthAsNumber;
  });

  const trainingMonthsList = trainings
    ? trainingMonthsSorted.map((month) => {
        const monthName = month[0];
        const monthTrainingsList = Object.values(month[1]);
        monthTrainingsList.sort((a, b) => {
          const aDate = moment(new Date(a.trainingInfo.date));
          const bDate = moment(new Date(b.trainingInfo.date));
          return aDate > bDate ? 1 : -1;
        });
        const checkboxes = monthTrainingsList.map((training) => ({
          checked: false,
          id: training.trainingId,
        }));

        return (
          <TrainingMonth
            trainings={monthTrainingsList}
            checkboxes={checkboxes}
            key={`${year} ${monthName}`}
            year={year}
            month={monthName}
            userId={userId}
            teamId={teamId}
            teamName={teamName}
            updateTrainings={updateTrainings}
          />
        );
      })
    : null;

  return <>{trainingMonthsList}</>;
};

export default TrainingYear;
