import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { DataStore } from '@aws-amplify/datastore';
import { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import ModalPopUp from './ModalPopUp';
import { Course } from '../models';

function CourseEdit({ course, userType }) {

    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalBody, setModalBody] = useState('');

    function closeModal() {
        setShowModal(false);
    }

    const userBool = userType !== "MarkerCoordinator"
    const [isFlipped, setIsFlipped] = useState(false);
    const [previewFile, setPreviewFile] = useState(null);
    const [uploadFile, setUploadFile] = useState(null);
    const [requiredMarkers, setRequiredMarkers] = useState(course.requireMarkers);

    const [formData, setFormData] = useState({
        faculty: course.faculty,
        courseCode: course.courseCode,
        coordinatorName: course.coordinatorName,
        coordinatorEmail: course.coordinatorEmail,
        year: course.year,
        semester: course.semester,
        directorName: course.directorName,
        directorEmail: course.directorEmail,
        estimatedStudents: course.estimatedStudents,
        requireMarkers: course.requireMarkers,
        enrolledStudents: course.enrolledStudents,
        markersNeeded: course.markersNeeded,
        preassignMarkers: course.preassignMarkers,
        totalHours: course.totalHours,
        minGrade: course.minGrade,
        description: course.description,
        summary: course.summary,
        thumbnailId: course.thumbnailId,
        markersAssigned: course.markersAssigned,
        appOpen: course.appOpen
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;


        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));

    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        for (const key in formData) {
            if (formData[key] === '' && key !== 'thumbnailId') {
                const title = 'Error';
                const body = `Please fill in all fields (no empty fields are allowed).`;

                setModalTitle(title);
                setModalBody(body);
                setShowModal(true);
                return;
            }

        }


        try {
            const original = await DataStore.query(Course, course.id);

            if (original) {
                await DataStore.save(
                    Course.copyOf(original, updated => {
                        updated.faculty = formData.faculty;
                        updated.courseCode = formData.courseCode;
                        updated.coordinatorName = formData.coordinatorName;
                        updated.coordinatorEmail = formData.coordinatorEmail;
                        updated.year = formData.year;
                        updated.semester = formData.semester;
                        updated.directorName = formData.directorName;
                        updated.directorEmail = formData.directorEmail;
                        updated.estimatedStudents = formData.estimatedStudents;
                        updated.requireMarkers = formData.requireMarkers;
                        updated.enrolledStudents = formData.enrolledStudents;
                        updated.preassignMarkers = formData.preassignMarkers;
                        updated.totalHours = formData.totalHours;
                        updated.minGrade = formData.minGrade;
                        updated.description = formData.description;
                        updated.summary = formData.summary;
                        updated.thumbnailId = formData.thumbnailId;
                        updated.name = `${formData.faculty} ${formData.courseCode}`;
                        updated.markersNeeded = parseInt(formData.markersNeeded);
                        updated.markersAssigned = formData.markersAssigned;
                        updated.appOpen = formData.appOpen;
                    })
                );
            }

            const title = 'Success';
            const body = 'Course successfully edited.';

            setModalTitle(title);
            setModalBody(body);
            setShowModal(true);
        } catch (error) {
            console.error('Error editing course:', error);
            const title = 'Error';
            const body = 'An error has occurred, please refer to console.';

            setModalTitle(title);
            setModalBody(body);
            setShowModal(true);
        }
    };


    return (


        <Form className="mb-3 border p-4 rounded " style={{ fontWeight: 600 }} onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col}>
                    <Form.Label>Course Faculty</Form.Label>
                    <Form.Control
                        name="faculty"
                        placeholder="e.g. COMPSCI"
                        value={formData.faculty}
                        disabled={userBool}
                        onChange={handleChange}

                    />
                </Form.Group>

                <Form.Group as={Col}>
                    <Form.Label>Course Code</Form.Label>
                    <Form.Control
                        name="courseCode"
                        placeholder="e.g. 225"
                        value={formData.courseCode}
                        disabled={userBool}
                        onChange={handleChange}
                        type="number"
                    />
                </Form.Group>

                <Form.Group as={Col}>
                    <Form.Label>Course Coordinator</Form.Label>
                    <Form.Control
                        name="coordinatorName"
                        placeholder="Name"
                        value={formData.coordinatorName}
                        disabled={userBool}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group as={Col}>
                    <Form.Label>⠀</Form.Label>
                    <Form.Control
                        name="coordinatorEmail"
                        placeholder="Email"
                        value={formData.coordinatorEmail}
                        disabled={userBool}
                        onChange={handleChange}
                    />
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col}>
                    <Form.Label>Year</Form.Label>
                    <Form.Control
                        name="year"
                        defaultValue="2023"
                        value={formData.year}
                        disabled={userBool}
                        onChange={handleChange}
                        type="number"
                    />
                </Form.Group>

                <Form.Group as={Col}>
                    <Form.Label>Semester</Form.Label>
                    <Form.Select
                        name="semester"
                        aria-label="Default select example"
                        value={formData.semester}
                        disabled={userBool}
                        onChange={handleChange}
                    >
                        <option value="1">Semester 1</option>
                        <option value="2">Semester 2</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group as={Col}>
                    <Form.Label>Course Director</Form.Label>
                    <Form.Control
                        name="directorName"
                        placeholder="Name"
                        value={formData.directorName}
                        disabled={userBool}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group as={Col}>
                    <Form.Label>⠀</Form.Label>
                    <Form.Control
                        name="directorEmail"
                        placeholder="Email"
                        value={formData.directorEmail}
                        disabled={userBool}
                        onChange={handleChange}
                    />
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} className="d-flex align-items-center">
                    <Form.Label>Estimated number of students</Form.Label>
                    <Form.Control
                        name="estimatedStudents"
                        value={formData.estimatedStudents}
                        disabled={userBool}
                        onChange={handleChange}
                        type="number"
                    />
                </Form.Group>
                <Form.Group as={Col} className="d-flex align-items-center">
                    <Form.Label>Current number of enrolled students</Form.Label>
                    <Form.Control
                        name="enrolledStudents"
                        value={formData.enrolledStudents}
                        onChange={handleChange}
                        type="number"
                    />
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col}>
                    <Form.Label>Do you require markers for this course? ⠀⠀⠀⠀⠀⠀⠀⠀⠀</Form.Label>
                    <Form.Check
                        type="switch"
                        id="custom-switch-1"
                        label=""
                        checked={formData.requireMarkers}
                        onChange={(e) => {
                            handleChange(e);
                            setRequiredMarkers(e.target.checked);

                        }}
                        disabled={userBool}
                        aria-controls="collapse-text"
                        aria-expanded={requiredMarkers}
                        name="requireMarkers"
                    />
                </Form.Group>
            </Row>

            <Collapse in={requiredMarkers}>
                <div id="collapse-text" style={{ padding: 0 }}>
                    <Row className="mb-3">
                        <Form.Group as={Col} className="d-flex align-items-center">
                            <Form.Label>How many markers would be needed for this course?</Form.Label>
                            <Form.Control
                                name="markersNeeded"
                                value={formData.markersNeeded}
                                onChange={handleChange}
                                type="number"
                            />
                        </Form.Group>

                        <Form.Group as={Col} className="d-flex align-items-center">
                            <Form.Label>Would you like to preassign markers if available?⠀⠀⠀</Form.Label>
                            <Form.Check
                                type="switch"
                                id="custom-switch-2"
                                label=""
                                checked={formData.preassignMarkers}
                                disabled={userBool}
                                onChange={handleChange}
                                name="preassignMarkers"
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} className="d-flex align-items-center">
                            <Form.Label>Number of marking hours per semester</Form.Label>
                            <Form.Control
                                name="totalHours"
                                value={formData.totalHours}
                                onChange={handleChange}
                                type="number"
                            />
                        </Form.Group>

                        <Form.Group as={Col} className="d-flex align-items-center">
                            <Form.Label className='mx-2'>Applicant minimum grade</Form.Label>
                            <Form.Select
                                name="minGrade"
                                aria-label="Default select example"
                                value={formData.minGrade}
                                disabled={userBool}
                                onChange={handleChange}
                            >
                                <option value="A+">A+</option>
                                <option value="A">A</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B">B</option>
                                <option value="B-">B-</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>
                </div>


            </Collapse>

            <Row className="mb-3">
                <Form.Group as={Col}>
                    <Form.Label>A short description of what the course is about</Form.Label>
                    <Form.Control
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col}>
                    <Form.Label>Please list the number and type of assessments that markers would have to do throughout the semester.</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="summary"
                        value={formData.summary}
                        onChange={handleChange}
                    />
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col}>
                    <Form.Label>Please unselect to stop taking applications.</Form.Label>
                    <Form.Check
                        type="switch"
                        id="custom-switch-2"
                        label=""
                        checked={formData.appOpen}
                        onChange={(e) => {
                            handleChange(e);
                        }}

                        name="appOpen"
                    />
                </Form.Group>
            </Row>
            <Button variant="primary" type="submit">Confirm Changes</Button>
            {showModal && (
                <ModalPopUp
                    show={showModal}
                    onHide={closeModal}
                    title={modalTitle}
                    body={modalBody}
                    primaryButtonLabel="Close"
                    onPrimaryButtonClick={closeModal}
                />
            )}
        </Form>

    );
}

export default CourseEdit
