import "../style.css";
import SessionPieChart from "./SessionPieChart";
import Bubble from "./Bubble";

///data has to be taken from the backend///
const piedata = [
  { name: "Attended", value: 150 },
  { name: "Not Attended", value: 45 },
];

const AnalyticsTop = () => {
  return (
    <div className="analytics-top">
      <div className="analytics-inline">
        <div>
          <div className="analytic-box">
            <h4 className="txt-h4">Best Session</h4>
            <p className="txt-body">Harnessing AI for Business Growth</p>
            <p className="txt-body-small">Attendance: 50</p>
          </div>
          <div className="analytic-box">
            <h4 className="txt-h4">Worst Session</h4>
            <p className="txt-body">Harnessing AI for Business Growth</p>
            <p className="txt-body-small">Attendance: 2</p>
          </div>
        </div>
        <div>
          <div className="analytic-box">
            <p className="txt-h4">Total Attendees</p>
            <p className="hero-number">760</p>
            <p className="txt-body-small align-right">More Info</p>
          </div>
          <div className="analytic-box">
            <p className="txt-h4">Average Attendee Engagement</p>
            <p className="hero-number">1.5h</p>
          </div>
        </div>
        <div className="analytic-box-large">
          <h4 className="txt-h4">Most Performing Session</h4>
          <p className="txt-body">
            Max Capacity <Bubble content={360} />
          </p>
          <SessionPieChart data={piedata} />
        </div>
        <div className="analytic-box-large">
          <h4 className="txt-h4">Least Performing Session</h4>
          <p className="txt-body">
            Max Capacity <Bubble content={360} />
          </p>
          <SessionPieChart data={piedata} />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default AnalyticsTop;
