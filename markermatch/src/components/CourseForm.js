import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { DataStore } from '@aws-amplify/datastore';
import { Course } from '../models';
import { useState } from 'react';
import ReactCardFlip from "react-card-flip";
import Card from 'react-bootstrap/Card';
import { Storage } from 'aws-amplify';
import Collapse from 'react-bootstrap/Collapse';
import ModalPopUp from './ModalPopUp';

function CourseForm() {
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalBody, setModalBody] = useState('');

    function closeModal() {
        setShowModal(false);
      }
    const [isFlipped, setIsFlipped] = useState(false);
    const [previewFile, setPreviewFile] = useState(null);
    const [uploadFile, setUploadFile] = useState(null);
    const [requiredMarkers, setRequiredMarkers] = useState(false);
    const [formData, setFormData] = useState({
        faculty: 'COMPSCI',
        courseCode: '391',
        coordinatorName: 'John Doe',
        coordinatorEmail: 'johndoe@gmail.com',
        year: '2023',
        semester: '1',
        directorName: 'Jane Doe',
        directorEmail: 'Janedoe@gmail.com',
        estimatedStudents: '100',
        requireMarkers: false,
        enrolledStudents: '90',
        markersNeeded: 0,
        preassignMarkers: false,
        totalHours: '50',
        minGrade: 'A+',
        description: 'A ficticious Computer Science course.',
        summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pretium consectetur neque et pretium. leo sed velit volutpat mollis. Suspendisse posuere massa eget ante pretium, at fringilla leo pretium. Pellentesque eget posuere dolor. Nunc lacinia risus quis purus venenatis vestibulum. Phasellus ut porta tortor, sit ',
        thumbnailId: '',
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));

    };


    const handleFilePreview = async (e) => {
        const file = e.target.files[0];

        setUploadFile(file);


        /* set the preview image */
        const reader = new FileReader();

        reader.onload = () => {
            setPreviewFile(reader.result);
        };

        reader.readAsDataURL(file);

    }

    const handleFileUpload = async () => {

        const fileType = uploadFile.type.split('/').pop();

        /* only recognise these ones lol */
        if (!(fileType === 'jpeg' || fileType === 'jpg' || fileType === 'png' || fileType === 'webp')) {
            const title = 'Error';
            const body = `Invalid media type.`;

            setModalTitle(title);
            setModalBody(body);
            setShowModal(true);
            return
        }

        /* randomise thumnbail id to prevent same id */
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';

        for (let i = 0; i < 9; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters[randomIndex];
        }
        result = result + '.' + fileType;


        const updatedFormData = { ...formData, thumbnailId: result };
        setFormData(updatedFormData);

        try {
            formData.thumbnailId = (await Storage.put(result, uploadFile, { level: "public" })).key;
        } catch (error) {
            console.log("Error uploading thumbnail: ", error);
        }


    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (uploadFile !== null) {
            try {
                await handleFileUpload();
            }
            catch (error){
                const title = 'Error';
                const body = `Failed to upload thumbnail`;

                setModalTitle(title);
                setModalBody(body);
                setShowModal(true);
            }
        }  


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

            const courses = await DataStore.query(Course, (c) => c.name.eq(`${formData.faculty} ${formData.courseCode}`))

            if (courses.length > 0){
                alert('Error, a course with this name already exists.')
                return;
            }
            await DataStore.save(
                new Course({
                    coordinatorName: formData.coordinatorName,
                    coordinatorEmail: formData.coordinatorEmail,
                    courseCode: formData.courseCode,
                    yearSemester: `${formData.year} Semester ${formData.semester}`,
                    faculty: formData.faculty,
                    preassignMarkers: formData.preassignMarkers,
                    requireMarkers: formData.requireMarkers,
                    estimatedStudents: formData.estimatedStudents,
                    enrolledStudents: formData.enrolledStudents,
                    summary: formData.summary,
                    minGrade: formData.minGrade,
                    totalHours: `${formData.totalHours}`,
                    appOpen: true,
                    description: formData.description,
                    directorName: formData.directorName,
                    directorEmail: formData.directorEmail,
                    name: `${formData.faculty} ${formData.courseCode}`,
                    thumbnailId: formData.thumbnailId,
                    markersNeeded: parseInt(formData.markersNeeded),
                    markersAssigned: 0
                })
            );
            const title = 'Course added';
            const body = `Course added successfully.`;

            setModalTitle(title);
            setModalBody(body);
            setShowModal(true);
        } catch (error) {
            console.error('Error adding course:', error);
            const title = 'Error';
            const body = 'An error has occurred, please refer to console.';

            setModalTitle(title);
            setModalBody(body);
            setShowModal(true);
        }
    };


    return (
        <div id="course-form-template" style={{display: 'flex'}}>
            
                <div id="preview" style={{flex: 1, padding: '1rem'}}>
                    <h2>Student View</h2>
                    <br>
                    </br>
                    <br></br>
                    <ReactCardFlip isFlipped={isFlipped}>
                        <Card style={{ width: '25vw', height: '60vh' }} key="front">
                            <Card.Img style={{ maxHeight: "40vh", maxWidth: "25vw", width: "100%", height: "auto" }} variant="top" src={previewFile || "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Computer_science_education.png/238px-Computer_science_education.png"} />                               <Card.Body>
                                <Card.Title>{formData.faculty + ' ' + formData.courseCode}</Card.Title>
                                <Card.Text>
                                    {formData.coordinatorName}
                                </Card.Text>
                                <Card.Text>
                                    {formData.description}
                                </Card.Text>
                                <Button className="align-self-end" variant="secondary" onClick={() => setIsFlipped((prev) => !prev)}>See More</Button>{' '}
                            </Card.Body>
                        </Card>

                        <Card style={{ width: '25vw', height: '60vh' }} key="back">
                            <Card.Body>
                                <Card.Text>
                                    Minimum Grade: {formData.minGrade}
                                </Card.Text>
                                <Card.Text>
                                    Estimated Hours: {formData.totalHours}
                                </Card.Text>
                                <Card.Text>
                                    Taking Applications: {formData.appOpen ? 'Yes' : 'No'}
                                </Card.Text>
                                <Card.Text style={{ height: "60%", overflowY: "auto" }}>
                                    Description: <br />
                                    {formData.summary}
                                </Card.Text>
                                <Button variant="secondary" className="align-self-end" onClick={() => setIsFlipped((prev) => !prev)}>Return</Button>{' '}
                            </Card.Body>
                        </Card>
                    </ReactCardFlip>

                </div>

                <div id="form-template2" style={{ flex: 1, padding: '1rem' }}>
            <Form className="border p-4 rounded fadeIn poop" style={{ fontWeight: 600 }} onSubmit={handleSubmit}>
                {/* <h2>Add Course Form:</h2> */}
                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label>Course Faculty</Form.Label>
                        <Form.Control
                            name="faculty"
                            placeholder="e.g. COMPSCI"
                            value={formData.faculty}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Course Code</Form.Label>
                        <Form.Control
                            name="courseCode"
                            placeholder="e.g. 225"
                            value={formData.courseCode}
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
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>⠀</Form.Label>
                        <Form.Control
                            name="coordinatorEmail"
                            placeholder="Email"
                            value={formData.coordinatorEmail}
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
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>⠀</Form.Label>
                        <Form.Control
                            name="directorEmail"
                            placeholder="Email"
                            value={formData.directorEmail}
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
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Please submit a thumbnail:</Form.Label>
                        <Form.Control type="file" accept="image/*" onChange={handleFilePreview} />
                    </Form.Group>
                </Row>
                <Button variant="primary" type="submit">Submit</Button>
            </Form>
            </div>
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
        </div >
    );
}

export default CourseForm
