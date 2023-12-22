import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { DataStore } from '@aws-amplify/datastore';
import { MarkerApplication } from '../models';
import { useState, useEffect } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router';
import { Amplify, Auth, Storage } from 'aws-amplify';
import CourseData from '../hooks/CourseData';
import { Cart, Course, ApplicationStatus } from '../models';
import Card from 'react-bootstrap/Card';
import ReactCardFlip from "react-card-flip";
import '../styles/MarkerApplicationForm.css';
import MultiStepProgressBar from "./MultiStepProgressBar/MultiStepProgressBar";
import NavbarComp from '../components/NavbarComp';
import Sidebar from '../components/Sidebar';
import ModalPopUp from './ModalPopUp';


function MarkerApplicationForm() {
    const { user } = useAuthenticator((context) => [context.user]);
    const { courses } = CourseData();
    const [outCourses, setCourses] = useState([]);
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);

    const [showLastModal, setShowLastModal] = useState(false);

    const [modalTitle, setModalTitle] = useState('');
    const [modalBody, setModalBody] = useState('');

    function closeModal() {
        setShowModal(false);
    }

    function closeLastModal() {
        setShowLastModal(false);
        window.location.href = "/application-status";
    }

    let identityId = '';
    async function getId() {
        const credentials = await Auth.currentUserCredentials();
        identityId = credentials.identityId;

    }
    getId();



    const ApplicationCard = ({ course }) => {
        const [isFlipped, setIsFlipped] = useState(false);
        let appStatus = "No"
        if (course.appOpen) { appStatus = "Yes" }
        return (
            <div className="p-2" key={course.id}>
                <ReactCardFlip isFlipped={isFlipped}>
                    <Card style={{ height: "52vh", width: "35vh", overflowY:"auto" }} key="front">
                       <Card.Body>
                            <Card.Title style={{ fontWeight: "bolder" }}>{course.name}</Card.Title>
                            <Card.Subtitle style={{ fontStyle: "italic" }}>
                                {course.coordinatorName}
                            </Card.Subtitle>
                            <Card.Text style={{ textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>
                                {course.description}
                            </Card.Text>
                            <Button variant="secondary" onClick={() => setIsFlipped((prev) => !prev)}>See More</Button>{' '}
                
                            
                            <div id="spacer">
                            <Card.Text>Please select if you've been a tutor for this course:</Card.Text>
                                <Form.Check
                                    name={course.faculty + course.courseCode + "_previousTutor"}
                                    type="checkbox"
                                    id="previousTutor"
                                    checked={formData.courseSpecifics[course.faculty + course.courseCode + "_previousTutor"]}
                                    onChange={handlePreviousMarkerChange}
                                />
              
                            </div>
                            <Card.Text>Rank your preference (where 1 is your most preferred course)</Card.Text>
                            <Form.Control
                                name={course.faculty + course.courseCode + "_preference"}
                                value={formData.courseSpecifics[course.faculty + course.courseCode + "_preference"]}
                                onChange={handlePreferenceChange}
                                type="number"
                                id="preference"
                                // defaultValue="1"
                                required
                            />
                            <Card.Text>Previous Grade</Card.Text>
                            <Form.Select
                                name={course.faculty + course.courseCode + "_previousGrade"}
                                value={formData.courseSpecifics[course.faculty + course.courseCode + "_previousGrade"]}
                                onChange={handleGradeChange}
                                id="previousGrade"
                                required
                            >
                                <option value="">Select Grade</option>
                                <option value="A+">A+</option>
                                <option value="A">A</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B">B</option>
                                <option value="B-">B-</option>
                                <option value="C+">C+</option>
                                <option value="C">C</option>
                                <option value="C-">C-</option>
                            </Form.Select>
                            

                        </Card.Body>
                    </Card>

                    <Card style={{ height: "52vh", width: "35vh" }} key="back">
                        <Card.Body>
                            <Card.Text>
                                Minimum Grade: {course.minGrade}
                            </Card.Text>
                            <Card.Text>
                                Estimated Hours: {course.totalHours}
                            </Card.Text>
                            <Card.Text>
                                Taking Applications: {course.appOpen ? 'Yes' : 'No'}
                            </Card.Text>

                            <Card.Text style={{ maxheight: "1vh", overflowY: "auto" }}>
                                Description: <br />
                                {course.summary}
                            </Card.Text>

                            <Button variant="secondary" onClick={() => setIsFlipped((prev) => !prev)}>See Less</Button>{' '}
            

                        </Card.Body>
                    </Card>
                </ReactCardFlip>
            </div>
        )
    }

    
    const handlePreviousMarkerChange = (e) => {
        const { name, checked } = e.target;
        setFormData(prevState => ({
          ...prevState,
          courseSpecifics: {
            ...prevState.courseSpecifics,
            [name]: checked
          }
        }));

      }

    async function getUserSelectedCourses() {
        const userCart = await DataStore.query(Cart, (c) => c.userId.eq(user.username));
        let listOfCourses = [];

        if (userCart[0] !== undefined) {
            const selectedCourses = userCart[0].selectedCourses?.split(",");
            const allCourses = await DataStore.query(Course)
            for (let element in selectedCourses) {
                for (let course in allCourses) {

                    if (allCourses[course].faculty + allCourses[course].courseCode === selectedCourses[element].trim().replace(/\s+/g, '')) {
                        listOfCourses.push(allCourses[course]);
                    }
                }
            }
        }

        return listOfCourses;
    }

    const [formData, setFormData] = useState({
        givenName: user?.attributes?.given_name,
        familyName: user?.attributes?.family_name,
        auid: '',
        upi: '',
        preferredEmail: user?.attributes?.email,
        overseas: false,
        validNzWorkPermit: false,
        degree: '',
        yearsOfStudy: '',
        underPostGrad: 'Undergraduate',
        currentTutor: false,
        maxHours: 0,
        transcriptId: '',
        cvId: '',
        courseSpecifics: {}
    });

    useEffect(() => {
        const fetchCourses = async () => {
            const fetchedCourses = await getUserSelectedCourses();

            setCourses(fetchedCourses);
        };

        fetchCourses();
    }, []);



    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'number') {
        const numericValue = parseInt(value, 10);
        const nonNegativeValue = Math.max(numericValue, 0);
        setFormData((prevData) => ({
            ...prevData,
            [name]: nonNegativeValue,
        }));
        }else if (type === 'radio') {
            setFormData(prevData => ({
                ...prevData,
                [name]: value === "Yes"
            }));
        } else if (type === 'checkbox') {
            setFormData(prevData => ({
                ...prevData,
                [name]: checked
            }));
        } else {
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };

const handlePreferenceChange = (e) => {
    const { name, value } = e.target;
    const numericValue = parseInt(value, 10);
    const nonNegativeValue = Math.max(numericValue, 0);
    formData.courseSpecifics[name] = nonNegativeValue;
    setFormData((prevData) => ({
        ...prevData,
        courseSpecifics: {
            ...prevData.courseSpecifics,
            [name]: nonNegativeValue,
        },
    }));
};


    const handleGradeChange = async (e) => {
        const { name, value } = e.target;
        formData.courseSpecifics[name] = value
    }


    const handleCvChange = async (e) => {
        const file = e.target.files[0];
        if (file.type != "application/pdf") {
            const title = 'Error';
            const body = "Your file has not been uploaded. This input only accepts '.pdf' file extensions.";

            setModalTitle(title);
            setModalBody(body);
            setShowModal(true);
            return;
        }
        try {
            formData.cvId = (await Storage.put("cv.pdf", file, { level: "protected" })).key;
            const title = 'Success';
            const body = "CV successfully uploaded!";

            setModalTitle(title);
            setModalBody(body);
            setShowModal(true);
        } catch (error) {
            console.log("Error uploading cv: ", error);
        }
    }

    const handleTranscriptChange = async (e) => {
        const file = e.target.files[0];
        if (file.type != "application/pdf") {
            const title = 'Error';
            const body = "Your file has not been uploaded. This input only accepts '.pdf' file extensions.";

            setModalTitle(title);
            setModalBody(body);
            setShowModal(true);
            return;
        }
        try {
            formData.transcriptId = (await Storage.put("transcript.pdf", file, { level: "protected" })).key;
            const title = 'Success';
            const body = "File successfully uploaded!";

            setModalTitle(title);
            setModalBody(body);
            setShowModal(true);
        } catch (error) {
            console.log("Error uploading transcript: ", error);
        }
    }


        const handleSubmit = async (e) => {
            e.preventDefault();
            if (!validateStep1() || !validateStep2()) {
                const title = 'Error';
                const body = 'Please complete all required fields in step 1 and step 2 before submitting.';
                setModalTitle(title);
                setModalBody(body);
                setShowModal(true);
                return;
              }
        const reform = {};
        for (const key in formData.courseSpecifics) {
            const [course, property] = key.split('_');
            if (!reform[course]) {
                reform[course] = [];
            }
            reform[course].push({
                property: property,
                value: formData.courseSpecifics[key],
            });
        }
        for (const course in reform) {
            reform[course].push({
                property: 'assignedHours',
                value: "0",
            });
            reform[course].push({
                property: 'status',
                value: 'PENDING',
            });

        }

        try {
            console.log(formData)
            await DataStore.save(
                new MarkerApplication({
                    givenName: formData.givenName,
                    familyName: formData.familyName,
                    userId: user?.username + ' ' + identityId,
                    auid: formData.auid,
                    upi: formData.upi,
                    preferredEmail: formData.preferredEmail,
                    overseas: formData.overseas,
                    validNzWorkPermit: formData.validNzWorkPermit,
                    degree: formData.degree,
                    yearsOfStudy: formData.yearsOfStudy,
                    underPostGrad: formData.underPostGrad,
                    currentTutor: formData.currentTutor,
                    maxHours: parseInt(formData.maxHours),
                    transcriptId: formData.transcriptId,
                    cvId: formData.cvId,
                    courseSpecifics: JSON.stringify(reform),
                    bucketVal: identityId
                })
            );
            addCheckOut(outCourses, user.username, parseInt(formData.maxHours));
            const title = 'Success';
            const body = "Application successfully uploaded!";

            setModalTitle(title);
            setModalBody(body);
            setShowLastModal(true);
            


        } catch (error) {
            console.error('Error submitting application:', error);
            const title = 'Error';
            const body = 'An error has occurred, please refer to console.';

            setModalTitle(title);
            setModalBody(body);
            setShowModal(true);
        }
    };
    const [step1Valid, setStep1Valid] = useState(false);
    const [step2Valid, setStep2Valid] = useState(false);
    
    const validateStep1 = () => {
        const isStep1Valid = formData.transcriptId !== '' && formData.cvId !== '';
        return isStep1Valid;
      };

    const validateStep2 = () => {
        const isStep2Valid = (
          formData.givenName !== '' &&
          formData.familyName !== '' &&
          formData.auid !== '' &&
          formData.upi !== '' &&
          formData.preferredEmail !== '' &&
          formData.degree !== '' &&
          formData.yearsOfStudy !== '' &&
          formData.maxHours !== ''
        );
        return isStep2Valid;
      };
    const [step, setStep] = useState(1);

    const nextPageNumber = (pageNumber) => {
        switch (pageNumber) {
            case "1":
                break;
            case "2":
                break;
            case "3":
                break;
        }
    };
    const handleNext = () => {
        
        if (!validateStep1() && step === 1) {
                const title = 'Error';
                const body = 'Please complete all required fields in the CV section.';
                setModalTitle(title);
                setModalBody(body);
                setShowModal(true);
                return;
              }
        else if(validateStep2() !== true && step === 2) {
                const title = 'Error';
                const body = 'Please complete all required fields in the details section.';
                setModalTitle(title);
                setModalBody(body);
                setShowModal(true);
                return;
              }
        setStep(step + 1);
    };

    const handlePrevious = () => {
        setStep(step - 1);
    };



    async function addCheckOut(outCourses, userId, hours) {
        let flag = true;

        if (outCourses.length !== 0) {

            try {


                for (const course of outCourses) {
                    await DataStore.save(new ApplicationStatus({
                        userId: userId,
                        appliedCourses: course.faculty + " " + course.courseCode,
                        hoursRequested: hours + "",
                        hoursAssigned: "0",
                        status: "PENDING",


                    }));
                }
            } catch (error) {
                flag = false;
            }
        }
        if (flag) {
            deleteAllSelectedCourses();
        }
        else {
            const title = 'Error';
            const body = 'Error submitting the form';

            setModalTitle(title);
            setModalBody(body);
            setShowModal(true);
        }
    }
    async function deleteAllSelectedCourses() {
        const userCart = await DataStore.query(Cart, (c) => c.userId.eq(user.username));
        const selectedCourses = userCart[0].selectedCourses?.split(",") || [];

        try {
            await DataStore.delete(userCart[0]);
        } catch (e) {
            const title = 'Error';
            const body = "Error removing selected courses from cart";

            setModalTitle(title);
            setModalBody(body);
            setShowModal(true);
        }
    }


    return (
        <>
            <div className="page-container">
                <NavbarComp />
                <div className="content">
                    <Sidebar />
                    <Form className="p-4 rounded" style={{ fontWeight: 600, width: '100%', height: '100%' }} onSubmit={handleSubmit}>
                        <MultiStepProgressBar step={step.toString()} onPageNumberClick={nextPageNumber} />
                        {step === 1 && (
                            <div>

                                <Row className="mb-3">
                                    <Form.Group controlId="formFile" className="mb-3">
                                        <Form.Label>Upload your transcript:</Form.Label>
                                        <Form.Control
                                            type="file"
                                            name="transcript"
                                            onChange={handleTranscriptChange}
                                            accept="application/pdf"

                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formFile" className="mb-3">
                                        <Form.Label>Upload your CV:</Form.Label>
                                        <Form.Control
                                            type="file"
                                            name="cv"
                                            onChange={handleCvChange}
                                            accept="application/pdf"
                                        />
                                    </Form.Group>
                                </Row>

                                <button className="next-button" type="button" onClick={handleNext}>Next</button>
                            </div>
                        )}

                        {step === 2 && (
                            <div>

                                <Row className="justify-content-center mb-3">
                                    <Form.Group as={Col}>
                                        <Form.Label className="w-100">Given Name</Form.Label>
                                        <Form.Control
                                            name="givenName"
                                            placeholder="John"
                                            value={formData.givenName}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col}>
                                        <Form.Label className="w-100">Family Name</Form.Label>
                                        <Form.Control
                                            name="familyName"
                                            placeholder="Doe"
                                            value={formData.familyName}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Row>

                                <Row className="justify-content-center mb-3">
                                    <Form.Group as={Col}>
                                        <Form.Label className="w-100">Auckland University ID (AUID)</Form.Label>
                                        <Form.Control
                                            name="auid"
                                            placeholder="e.g. 123456789"
                                            value={formData.auid}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col}>
                                        <Form.Label className="w-100">University Username (UPI)</Form.Label>
                                        <Form.Control
                                            name="upi"
                                            placeholder="e.g. tuoa001"
                                            value={formData.upi}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col}>
                                        <Form.Label className="w-100">Contact Email:</Form.Label>
                                        <Form.Control
                                            name="preferredEmail"
                                            value={formData.preferredEmail}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Row>

                                <Row className="justify-content-center mb-3">




                                    <Form.Group as={Col}>
                                        <Form.Label className="w-100">What degree are you studying?</Form.Label>
                                        <Form.Control
                                            name="degree"
                                            placeholder="e.g. Bachelor of Science, Major in Computer Science"
                                            value={formData.degree}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col}>
                                        <Form.Label className="w-100">How long have you been studying?</Form.Label>
                                        <Form.Control
                                            name="yearsOfStudy"
                                            placeholder="e.g. 2 years"
                                            value={formData.yearsOfStudy}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Row>


                                <Row className="justify-content-center mb-3">

                                    <Form.Group as={Col} className="d-flex align-items-center">
                                        <Form.Label className="w-100">Are you an Undergraduate or Postgraduate student?</Form.Label>
                                        <Form.Select
                                            name="underPostGrad"
                                            aria-label="Default select example"
                                            value={formData.underPostGrad}
                                            onChange={handleChange}
                                        >
                                            <option value="Undergraduate">Undergraduate</option>
                                            <option value="Postgraduate">Postgraduate</option>
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group as={Col} className="d-flex align-items-center">
                                        <Form.Label className="w-100">What is the maximum number of hours you can work per semester?</Form.Label>
                                        <Form.Control
                                            name="maxHours"
                                            value={formData.maxHours}
                                            onChange={handleChange}
                                            type="number"
                                            style={{ width: '100px' }}
                                        />
                                    </Form.Group>
                                </Row>



                                <Row className="justify-content-center mb-3">
                                    <Form.Group as={Col} className="d-flex align-items-center border p-3">
                                        <Form.Label className="w-100">Are you legally allowed to be employed in NZ?</Form.Label>
                                        <div className="d-flex">
                                            <Form.Check
                                                type="radio"
                                                id="validNzWorkPermitYes"
                                                name="validNzWorkPermit"
                                                value="Yes"
                                                checked={formData.validNzWorkPermit}
                                                onChange={handleChange}
                                                label="Yes"
                                                className="mr-3"
                                            />
                                            <Form.Check
                                                type="radio"
                                                id="validNzWorkPermitNo"
                                                name="validNzWorkPermit"
                                                value="No"
                                                checked={!formData.validNzWorkPermit}
                                                onChange={handleChange}
                                                label="No"
                                            />
                                        </div>
                                    </Form.Group>

                                    <Form.Group as={Col} className="d-flex align-items-center border p-3">
                                        <Form.Label className="w-100">Are you currently contracted as a tutor?</Form.Label>
                                        <div className="d-flex">
                                            <Form.Check
                                                type="radio"
                                                id="currentTutorYes"
                                                name="currentTutor"
                                                value="Yes"
                                                checked={formData.currentTutor}
                                                onChange={handleChange}
                                                label="Yes"
                                                className="mr-3"
                                            />
                                            <Form.Check
                                                type="radio"
                                                id="currentTutorNo"
                                                name="currentTutor"
                                                value="No"
                                                checked={!formData.currentTutor}
                                                onChange={handleChange}
                                                label="No"
                                            />
                                        </div>
                                    </Form.Group>

                                    <Form.Group as={Col} className="d-flex align-items-center border p-3">
                                        <Form.Label className="w-100">Are you currently overseas?</Form.Label>
                                        <div className="d-flex">
                                            <Form.Check
                                                type="radio"
                                                id="overseasYes"
                                                name="overseas"
                                                value="Yes"
                                                checked={formData.overseas}
                                                onChange={handleChange}
                                                label="Yes"
                                                className="mr-3"
                                            />
                                            <Form.Check
                                                type="radio"
                                                id="overseasNo"
                                                name="overseas"
                                                value="No"
                                                checked={!formData.overseas}
                                                onChange={handleChange}
                                                label="No"
                                            />
                                        </div>
                                    </Form.Group>

                                </Row>


                                <button className="previous-button" type="button" onClick={handlePrevious}>Previous</button>
                                <button className="next-button" type="button" onClick={handleNext}>Next</button>
                            </div>
                        )}

                        {step === 3 && (
                            <div>

                                <Row>
                                    <div className="grid-container-c">
                                        <div className="courses">
                                            {outCourses.map(course => (
                                                <ApplicationCard key={course.id} course={course} user={user} />
                                            ))}
                                        </div>
                                    </div>
                                </Row>
                                <button className="previous-button" type="button" onClick={handlePrevious}>Previous</button>
                                <Button className="next-button " variant="primary" type="submit">Submit</Button>
                            </div>
                        )}
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

                {showLastModal && (
                    <ModalPopUp
                        show={showLastModal}
                        onHide={closeLastModal}
                        title={modalTitle}
                        body={modalBody}
                        primaryButtonLabel="Close"
                        onPrimaryButtonClick={closeLastModal}
                    />
                )}
            </div>
        </>
    );
}

export default MarkerApplicationForm