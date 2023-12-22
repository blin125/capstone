import NavbarComp from "../components/NavbarComp";
import Sidebar from "../components/Sidebar";
import AllApplicationsView from "../components/AllApplicationsView";

function AllApplicants() {
    return (
        <>
            <NavbarComp />
            <div className="homepage-container">
                <div className="content-container">
                    <Sidebar/>
                    <AllApplicationsView/>
                </div>
            </div>
        </>
    );
}

export default AllApplicants
