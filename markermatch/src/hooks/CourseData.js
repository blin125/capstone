import { useEffect, useState } from 'react';
import { getCourseData, filterCourses, AddToCart } from '../helperFunctions/HorizontalHelper';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ReactCardFlip from "react-card-flip";
import { DataStore } from '@aws-amplify/datastore';
import ModalPopUp from '../components/ModalPopUp';
import { useAuthenticator } from '@aws-amplify/ui-react';

function CourseData() {


  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [allCourses, setAllCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalBody, setModalBody] = useState('');



  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      const fetchedCourses = await getCourseData();
      setCourses(fetchedCourses);
      setAllCourses(fetchedCourses);
    };

    fetchCourses();
  }, []);

  function closeModal() {
    setShowModal(false);
  }

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filteredCourses = filterCourses(allCourses, term);
    setCourses(filteredCourses);
  }

  const addCourseToCart = (courseId, userId) => {
    const response = AddToCart(courseId, userId, navigate);
    let message = ''
    response.then(response => {
      message = response;


      const title = 'Course';
      setModalTitle(title);
      setModalBody(message);
      setShowModal(true);

    }).catch(error => {
      console.error(error);
    });



  }

  const CourseCard = ({ course, user }) => {
    let isCourseCo = false;
    let isMarkerCo = false;
    let teachingTeam = false;


    if (user?.getSignInUserSession()?.getAccessToken()?.payload["cognito:groups"] != undefined) {
      isCourseCo = user?.getSignInUserSession()?.getAccessToken()?.payload["cognito:groups"][0] === "CourseCoordinators";
      isMarkerCo = user?.getSignInUserSession()?.getAccessToken()?.payload["cognito:groups"][0] === "MarkerCoordinator";
    }
  
    if (isCourseCo || isMarkerCo) {
      teachingTeam = true;
    }

  

    const [isFlipped, setIsFlipped] = useState(false);

    return (
      <>
        <div className="p-2" key={course.id}>
          <ReactCardFlip isFlipped={isFlipped}>
            <Card style={{ height: "60vh", width: "38vh" }} key="front">
              <Card.Img style={{ width: "100%", height: "65%" }} variant="top" src={course.thumbnailId ? `https://capstone-project-team-12-storage-951c1da6205613-staging.s3.ap-southeast-2.amazonaws.com/public/${course.thumbnailId}` : "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Computer_science_education.png/238px-Computer_science_education.png"} />
              <Card.Body>
                <Card.Title style={{ fontWeight: "bolder" }}>{course.name}</Card.Title>
                <Card.Subtitle style={{ fontStyle: "italic" }}>
                  {course.coordinatorName}
                </Card.Subtitle>
                <Card.Text style={{ textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>
                  {course.description}
                </Card.Text>
                <Button variant="secondary" onClick={() => setIsFlipped((prev) => !prev)}>See More</Button>{' '}

                {!teachingTeam && (course.appOpen ? (
                  <Button variant="primary" style={{ backgroundColor: "#005DFF" }} onClick={() => addCourseToCart(course.name, user?.username)}>
                    Add to Cart
                  </Button>
                ) : (
                  <Button variant="secondary" disabled>
                    Closed
                  </Button>
                ))}
              </Card.Body>
            </Card>

            <Card style={{ height: "60vh", width: "38vh" }} key="back">
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
                <Card.Text style={{ minHeight: "20vh", overflowY: "auto" }}>
                  Description: <br />
                  {course.summary}
                </Card.Text>
                <Button variant="secondary" onClick={() => setIsFlipped((prev) => !prev)}>See Less</Button>{' '}
                {!teachingTeam && (course.appOpen ? (
                  <Button variant="primary" style={{ backgroundColor: "#005DFF" }} onClick={() => addCourseToCart(course.name, user?.username)}>
                    Add to Cart
                  </Button>
                ) : (
                  <Button variant="secondary" disabled>
                    Closed
                  </Button>
                ))}              </Card.Body>
            </Card>
          </ReactCardFlip>
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
      </>
    )
  }

  return {
    courses,
    searchTerm,
    handleSearch,
    CourseCard
  };
}

export default CourseData; //"55.5%"