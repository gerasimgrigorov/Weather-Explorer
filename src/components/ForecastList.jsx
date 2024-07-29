import { getDayOfWeek } from "../../utils/formulas";
import SingleTempBadge from "./SingleTempBadge";

export default function ForecastList({ days }) {
  // console.log(days);

  return (
    <div>
      <ul className="forecast-list">
        {days.map((day, index) => {
          if (index === 0) {
            return (
              <SingleTempBadge
                key={index}
                day={day}
                specialClass={"first-forecast-child"}
              />
            );
          } else if (index === days.length - 1) {
            return (
              <SingleTempBadge
                key={index}
                day={day}
                specialClass={"last-forecast-child"}
              />
            );
          } else {
            return <SingleTempBadge key={index} day={day} />;
          }
        })}
      </ul>
    </div>
  );
}
