import NavbarComp from '../components/NavbarComp';
import Sidebar from '../components/Sidebar';
import StudentView from '../components/StudentView';



function Studentpage() {
  return (
    <>
      <NavbarComp />
        <div className="student-container">
          <Sidebar />
          <StudentView />
        </div>
    </>
  );
}

export default Studentpage;
