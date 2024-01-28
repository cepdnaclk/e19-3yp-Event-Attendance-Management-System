import "../style.css";
import SessionLineChart from "./SessionLineChart";
import SessionBarChart from "./SessionBarChart";
import Bubble from "./Bubble";

const AnalyticsTop = () => {
  return (
    <div className="analytics-charts">
      <div className="analytics-inline">
        <div className="analytic-box-chart">
          <h4 className="txt-h4">Attendee entrance count in each hour</h4>
          <div class="line"></div>
          <p className="txt-body">
            Session: <Bubble content={"Harnessing AI for Business Growth"} />{" "}
            max capacity <Bubble content={360} />
          </p>
          <SessionLineChart />
        </div>
        <div className="analytic-box-chart">
          <h4 className="txt-h4">Conference room Attendance</h4>
          <div class="line"></div>
          <p className="txt-body">
            Session: <Bubble content={"Harnessing AI for Business Growth"} />{" "}
            max capacity <Bubble content={360} />
          </p>
          <SessionBarChart />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsTop;
