import CourseForm from "../components/CourseForm";
import NavbarComp from "../components/NavbarComp";
import Sidebar from "../components/Sidebar";

function AddCourses() {
    return (
        <>
            <NavbarComp />
            <div className="homepage-container">
                <div className="content-container">
                    <Sidebar />
                    <CourseForm />
                    </div>
                </div>
        </>
    );
}

export default AddCourses
