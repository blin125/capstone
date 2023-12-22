import React, { useState, useEffect } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Cart } from '../models';
import { Course } from '../models';
import { ApplicationStatus } from '../models';
import { Alert, useAuthenticator } from '@aws-amplify/ui-react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ReactCardFlip from "react-card-flip";
import ModalPopUp from './ModalPopUp';
import { Amplify, Auth, Storage } from 'aws-amplify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';



function ShoppingCart() {
    const [courses, setCourses] = useState([]);
    const { user } = useAuthenticator((context) => [context.user]);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalBody, setModalBody] = useState('');
    const [imagePro, setImagePro] = useState('');
    
    function closeModal() {
        setShowModal(false);
      }

    let identityId = '';
    async function getId() {
      const credentials = await Auth.currentUserCredentials();
      identityId = credentials.identityId;

    }
    getId();

    async function getUserSelectedCourses() {
        const userCart = await DataStore.query(Cart, (c) => c.userId.eq(user.username));

        let listOfCourses = [];
        if (userCart[0] !== undefined) {
            const selectedCourses = userCart[0].selectedCourses?.split(",");
            const allCourses = await DataStore.query(Course)
            for (let element in selectedCourses) {
                for (let course in allCourses) {
                    if (allCourses[course].name == selectedCourses[element].trim()) {
                        listOfCourses.push(allCourses[course]);
                    }
                }

            }
        }
        return listOfCourses;
    }
    async function deleteUserSelectedCourse(courseId, userId) {
        const userCart = await DataStore.query(Cart, (c) => c.userId.eq(userId));
        const courseRemoved = courseId.trim();
        let selectedCourses = userCart[0].selectedCourses?.split(",");
        let modifiedCourses = []
        for (let element in selectedCourses) {
            if (selectedCourses[parseInt(element)].trim() === courseId) {
                if (parseInt(element) === selectedCourses.length - 1) {
                    selectedCourses.pop()
                    modifiedCourses = selectedCourses
                } else {
                    modifiedCourses = selectedCourses.slice(0, parseInt(element)).concat(selectedCourses.slice(parseInt(element)+1))
                }
            }
        }
        if (selectedCourses.length=== 0) {
            await DataStore.delete(userCart[0]);
        }
        const updatedCart = await DataStore.save(
            Cart.copyOf(userCart[0], updated => {
                updated.selectedCourses = modifiedCourses.toString()
            })
        );

        const newCourses = courses.filter(course => course.name !== courseRemoved);
        const title = 'Course Removed';
        const body = `${courseRemoved} has been removed from your cart.`;

        setModalTitle(title);
        setModalBody(body);
        setShowModal(true);
        setCourses(newCourses);
    }

    const CourseCardCart = ({course, user}) => {
        const [isFlipped, setIsFlipped] = useState(false);
        let appStatus = "No"
        if (course.appOpen) {appStatus = "Yes"}
        return (
          <div className="p-2" key={course.id}>
            <ReactCardFlip isFlipped={isFlipped}>
              <Card style={{ height:"400px", width:"250px" }} key="front">
                <Card.Img style={{ width: "248px", height: "248px" }} variant="top" src={course.thumbnailId ? `https://capstone-project-team-12-storage-951c1da6205613-staging.s3.ap-southeast-2.amazonaws.com/public/${course.thumbnailId}` : "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Computer_science_education.png/238px-Computer_science_education.png"} />
                <Card.Body>
                  <Card.Title style={{ fontWeight:"bolder" }}>{course.name}</Card.Title>
                  <Card.Subtitle style={{ fontStyle:"italic" }}>
                    {course.coordinatorName}
                  </Card.Subtitle>
                  <Card.Text style={{ textOverflow:"ellipsis", whiteSpace:"nowrap", overflow:"hidden"}}>
                    {course.description}
                  </Card.Text>
                  <Button variant="secondary" onClick={() => setIsFlipped((prev) => !prev)}>See More</Button>{' '}
                  <Button variant="primary" style={{ backgroundColor: "#FF0000" }} onClick={() => deleteUserSelectedCourse(course.faculty + " " + course.courseCode, user?.username)}>Remove</Button>
                </Card.Body>
              </Card>

              <Card style={{ height:'400px', width: '250px'}} key="back">
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
                  <Card.Text style={{ height:"199px", overflowY: "auto"}}>
                    Description: <br />
                    {course.summary}
                  </Card.Text>
                  <Button variant="secondary" onClick={() => setIsFlipped((prev) => !prev)}>See Less</Button>{' '}
                  <Button variant="primary" style={{ backgroundColor: "#FF0000" }} onClick={() => deleteUserSelectedCourse(course.faculty + " " + course.courseCode, user?.username)}>Remove</Button>
                </Card.Body>
              </Card>
            </ReactCardFlip>
          </div>
        )
      }

    useEffect(() => {
        const fetchCourses = async () => {
          const result = await Storage.get('cv.pdf', {
            level: 'protected',
            identityId: identityId
          });

            const fetchedCourses = await getUserSelectedCourses();

            setCourses(fetchedCourses);
        };

        fetchCourses();
    }, []);



    const handleCartSubmission = () => {
        if (courses.length == 0){
            const title = 'Empty Cart';
            const body = `There are no courses in your cart!`;

            setModalTitle(title);
            setModalBody(body);
            setShowModal(true);
            navigate("/", { replace: true });
            return;
        }
        navigate("/application-form", { replace: true });
    }




  const url = "https://capstone-project-team-12-storage-951c1da6205613-staging.s3.ap-southeast-2.amazonaws.com/protected/ap-southeast-2%3A010b82c3-6034-4e9a-a441-ec1482f8e3d6/transcript.pdf?x-amz-content-sha256=e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855&x-amz-user-agent=aws-amplify%2F5.3.11+storage%2F2+framework%2F1&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAVECRHT7AOO3KDEAO%2F20231019%2Fap-southeast-2%2Fs3%2Faws4_request&X-Amz-Date=20231019T082439Z&X-Amz-SignedHeaders=host&X-Amz-Expires=900&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDmFwLXNvdXRoZWFzdC0yIkgwRgIhAPHT1kasyOjmlUhTekCAVJIXNh%2FvVYsgiwOgBzAqvoOrAiEA8dLuSxk9On4kdGXZi%2FKc6zocJQ3kjIvHNPnIARx4Szkq6wQIuv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARABGgwzNTIzNTc2ODcyMzIiDOvpJ8F0W3pjbanWtSq%2FBNijM97v0Ttg94krAShuBjxL%2BmljPz62%2BxgqnvVl80wRalxksSnRhOfCanlARSrx11OXT7tjAAsPsANS2dosokXbqsCHn%2BRHSKUkfSev7JokmbGa%2BjQsNuTHQWk%2FDEURd51GwxWXGgkvHptQObVPWaZV00QtiFGGoaImthTUw%2FCo%2F%2BNQqJ0NaQlnxmJ7rc0fxcqd1CKbNeq67Vt1Ir9KWiXV%2B72YLlUkdyAssyYcbCarotcLyzvqyb1mmnlNhcs4nQ7nU0z29b%2FQu54X4lRXqRv%2FqL3bRlmyL61BA2LlLdqTl50AHMpLajF8frE%2Fjh0yr7TLLPxSQwxjclkPjbn4Oc%2BndVB04A%2BZ6zsuH3Pl0p6g6kCxTAJibxVApdUcZmR4rm6XsWx%2BMuj6KNuJUWQR5QjvqiSFMa%2F2sVumHG5iJTtvi0YQbxNDbh0rHOzpYZH5m4Klz1looh1fIgwoGZOsdxx0Jxmka%2BFiEWYvW4Py%2BaJlQa%2Bi7ZcLVuAe98H%2BecI%2FQTGINh2ouSctBaPsfkBsO2xBmjWkiHhvf9t2o5xtllliz3laL1BJb0l8gsCzCRqbilPHVqbrN9pOqwMqaVe0%2FT1IoZARJjFTcTjisfHeExZ0LPHWA5kkSvgwJKYtPDZYxHExJrHbc93c74tceyeiiTMAQ4XQQTASqkMmeCSQRZ9SoerNXp9R0o7S9gbQxKxZtK9VcUKBUru1kJ%2FFrPQrZckP6ALU5Ct86avXeERbCsQMJukkncwp3K85OTlfvNB4MMbPw6kGOoQCoxdiDjUJ2tKSYFglsRn%2BEf3yB6QlsrFvSF6Y%2FxU%2F%2Bm2V4CFH32zrL3kVg7kSLWH10Oy0YtLv%2FKME1gqmk70eJYHMAt%2BwJ4yccO%2F1sLIfp2lygplyO35HKMOdfQPjcCWzIcpJPzk155876brZyXPieUf89r7tbi457a9bwHGGh%2FZK67lAuRHf7nD2ADrVvVOD82mtDmAhc1C%2BZdCKnse23Yp32bkJ%2BN2%2FMU%2BC%2Fhqddmhuc5Mreumnt8EczRP1JljjfgE6lvtozB60lf9XlbvKLPrrS%2BYE8cjphmUdDJCn%2FIIaIZZIAcRkByHDA87PxnjKjnLt3RcXYQawK5M%2FJtXUM8gzT%2F0%3D&X-Amz-Signature=4360f956f0d1523149ef17cc4b65183f5a2722489d14cb501981230eb5d97968"
    return (
        <>
            <div className="grid-container">
                {courses.length !== 0 ? (
                    <div className="shopping-cart">
                        <div className="courses">
                            {courses.map(course => (
                                <CourseCardCart course={course} user={user} />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="cart-ad">
                        <h2>No Courses in Cart</h2>
                        <a href="/home"><h4>Return Home</h4></a>
                    </div>
                )}
                {courses.length != 0 ? (
                  <div id="checkout-button" onClick={handleCartSubmission}> 
                    <FontAwesomeIcon icon={faShoppingCart} /> <p>Checkout!</p>
                  </div>
                ) : (null)}
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
    );
}

export default ShoppingCart;