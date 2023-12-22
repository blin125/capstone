import NavbarComp from "../components/NavbarComp";
import Sidebar from "../components/Sidebar";
import ApplicantsView from "../components/ApplicantsView";

function ApplicantsTable() {
    return (
        <>
            <NavbarComp />
            <div className="homepage-container">
                <div className="content-container">
                    <Sidebar/>
                    <ApplicantsView/>
                </div>
            </div>
        </>
    );
}

export default ApplicantsTable
