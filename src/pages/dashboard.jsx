import InfoOther from "../components/InfoOther";
import InfoSecond from "../components/InfoSecond";
import InfoMain from "../components/infoMain";
import '../css/dashboard.css'

const Dashboard = (props) => {
  return (
    <>
      <div>
        <div className="environment-info">
          <h1>Thông tin về môi trường</h1>
        </div>
        <InfoMain />
        <InfoSecond />
        <InfoOther/>
      </div>
    </>
  );
};

export default Dashboard;
