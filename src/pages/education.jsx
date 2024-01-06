
import NewSpaper from "../components/NewSpaper";
import Statistics from "../components/Statistics";
import VideoEducation from "../components/VideoEducation";

import '../css/education.css'

const Dashboard = (props) => {
  return (
    <>
      <div>
        <div className="environment-info">
        <h1>Nội dung giáo dục</h1>
        </div>    
        <VideoEducation />
        <NewSpaper/>
        <Statistics/>
      </div>
    </>
  );
};

export default Dashboard;
