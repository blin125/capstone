import React, { useState, useEffect } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Course } from '../models';
import { useAuthenticator } from '@aws-amplify/ui-react';
import CourseForm from "../components/CourseForm";
import NavbarComp from "../components/NavbarComp";
import Sidebar from "../components/Sidebar";
import CourseEdit from "../components/CourseEdit";

function EditCourses() {
    const { user } = useAuthenticator((context) => [context.user]);
    const [courses, setCourses] = useState([]);
    const [editingCourse, setEditingCourse] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const userEmail = user?.getSignInUserSession()?.getIdToken()?.payload["email"];
    const type = user?.getSignInUserSession()?.getAccessToken()?.payload["cognito:groups"]?.[0];

    useEffect(() => {
        const fetchCourses = async () => {
            if (type === "CourseCoordinators") {
                const courses = await DataStore.query(Course, (c) => c.coordinatorEmail.eq(userEmail));
                setCourses(courses);
            } else {
                const courses = await DataStore.query(Course);
                setCourses(courses);
            }
        };

        fetchCourses();
    }, [type, userEmail]);

    const filteredCourses = courses.filter(course =>
        !searchTerm || course.name.toLowerCase().includes(searchTerm.toLowerCase())
    );


    return (
        <>
            <NavbarComp />
            <div className="homepage-container">
                <div className="content-container">
                    <Sidebar />
                    <div className="container" style={{ height: "100%", overflow: "auto" }}>
                        <div className="row" style={{ paddingTop: "2vh" }}>
                            <div className="col">


                                {type !== "CourseCoordinators" ? (
                                    <>
                                        <h1>All courses</h1>
                                        <div className="mb-4">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Search courses"
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <h1>Current courses you coordinate</h1>
                                    </>
                                )}


                                {filteredCourses.length === 0 && type === "CourseCoordinators" && (
                                    <div className="mb-3 text-center">
                                        <div>
                                            <p>We couldn't find any courses associated with your account, or the course hasn't been uploaded yet.</p>
                                        </div>
                                    </div>
                                )}


                                {filteredCourses
                                    .filter(course => !searchTerm || course.name.toLowerCase().includes(searchTerm.toLowerCase()))
                                    .slice(0, 10)
                                    .map(course => (
                                        <div key={course.id}>
                                            {editingCourse === course.id ? (
                                                <CourseEdit course={course} userType={type} />
                                            ) : (
                                                <div className="mb-3">
                                                    <div className="card">
                                                        <div className="card-body d-flex justify-content-between">
                                                            <div>
                                                                <h5 className="card-title">{course.name}</h5>
                                                            </div>
                                                            <button className="btn btn-primary" onClick={() => setEditingCourse(course.id)}>Edit Course</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))
                                }

                                {type === 'MarkerCoordinator' && (
                                    courses.length > 10 && filteredCourses.length > 0 ? (
                                        <div className="mb-3 text-center">
                                            <div>
                                                <p>As you are the coordinator of more than 10 courses, we've limited the number of results shown. <br></br>More results will appear once you search for them.</p>
                                            </div>
                                        </div>
                                    ) : (
                                        filteredCourses.length === 0 && (
                                            <div className="mb-3 text-center">
                                                <div>
                                                    <p>No courses found, please refine your search term.</p>
                                                </div>
                                            </div>
                                        )
                                    )
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default EditCourses;
