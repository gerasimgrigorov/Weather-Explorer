import { getDayOfWeek } from "../../utils/formulas";
import SingleTempBadge from "./SingleTempBadge";

export default function ForecastList({ days }) {
  console.log(days);

  return (
    <div>
      <ul className="forecast-list">
        {days.map((day, index) => (
          <SingleTempBadge key={index} day={day} />
        ))}
      </ul>
    </div>
  );
}
