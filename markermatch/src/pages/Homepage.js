import NavbarComp from '../components/NavbarComp';
import Sidebar from '../components/Sidebar';
import HorizontalLayout from '../components/HorizontalLayout';


function Homepage() {


  return (
    <>
      <NavbarComp />
      <div className="homepage-container">
        <div className="content-container">
          <Sidebar />
          <HorizontalLayout />
        </div>
      </div>
    </>
  );
}

export default Homepage;
