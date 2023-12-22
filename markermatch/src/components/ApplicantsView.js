import React, { useState, useMemo, useEffect } from 'react';
import MaterialReactTable from 'material-react-table';
import { DataStore } from '@aws-amplify/datastore';
import { ApplicationStatus, MarkerApplication, Course } from '../models';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { json, useLocation } from 'react-router-dom';
import { Box, Button, ListItemIcon, MenuItem, Typography } from '@mui/material';
import emailjs from "@emailjs/browser";
import ModalPopUp from './ModalPopUp';
import { BiWindows, AiOutlineDownload } from 'react-icons/bi';
import { Amplify, Auth, Storage } from 'aws-amplify';
import { Dataset } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Modal from 'react-bootstrap/Modal';
import ModalTitle from 'react-bootstrap/ModalTitle'

function ApplicantsView() {
    const [data, setData] = useState([]);
    const [rowSelection, setRowSelection] = useState({});
    const { user } = useAuthenticator((context) => [context.user]);
    const location = useLocation();
    const [getApplicants, setApplicants] = useState([]);
    const [selectedApplicant, setSelectedApplicant] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [showUserModal, setShowUserModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalBody, setModalBody] = useState('');

    

    const theme = createTheme({
        palette: {
            or: {
                main: "#D8F0F0",
            },
        },
    });

    function closeModal() {
        setShowModal(false);

    }

    const selectedCourse = location.pathname.split("/")[2].replace("-", "");


    const columns = useMemo(() => [
        {
            accessorKey: 'id',
            header: 'AUID',
            isEditable: true,
        },

        {
            accessorKey: 'fullName',
            header: 'Name',

        },
        {
            accessorKey: 'availability',
            header: 'Available (hours/sem)',
        },
        {
            accessorKey: 'hoursAssigned',
            header: 'Hours Assigned',
        },
        {
            accessorKey: 'prevMarker',
            header: 'Previous Tutor',
        },
        {
            accessorKey: 'overseas',
            header: 'Overseas',
        },
        {
            accessorKey: 'pref',
            header: 'Preference',
        },
        {
            accessorKey: 'qualification',
            header: 'Qualification',
        },
        {
            accessorKey: 'status',
            header: 'Status',
            Cell: ({ cell }) => (
                <Box
                    component="span"
                    sx={() => ({
                        backgroundColor: cell.getValue() === "ACCEPTED" ? "green" : cell.getValue() === "DECLINED" ? "red" : "orange",
                        borderRadius: '0.25rem',
                        color: '#fff',
                        maxWidth: '8.7ch',
                        p: '0.25rem',
                    })}
                >
                    {cell.getValue()}
                </Box>
            ),
        },], []);
    useEffect(() => emailjs.init("2pleAgaYx5r4wvmHv"), []);

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const courseInfo = await getCourse(selectedCourse);
                getAllApplicants(selectedCourse).then(fetchApplicants => {
                    let count = 0;
                    const newRecord = fetchApplicants.map((record) => {

                        let properties = getJsonData(fetchApplicants[count].courseSpecifics, 0);
                        let id = record.userId.split(' ');

                        count += 1;

                        return {
                            id: record.auid,
                            fullName: record.givenName + ' ' + record.familyName,
                            overseas: record.overseas === true ? 'Yes' : 'No',
                            prevMarker: properties.previousTutor === 'true' ? 'Yes' : 'No',
                            qualification: record.underPostGrad,
                            availability: record.maxHours,
                            pref: properties.preference,
                            hoursAssigned: properties.assignedHours,
                            status: properties.status,
                            identityId: id[1]
                        };
                    });

                    setData(newRecord);

                });
            } catch (e) {
                setShowModal(true);
            }
        };
        fetchdata();
    }, [user.username]);

    function getJsonData(jSonData, count, check) {
        const myData = {};
        const jsonObject = JSON.parse(jSonData);

        jsonObject[selectedCourse].forEach(item => {
            if (item.property === "assignedHours" || item.property === "status" || item.property === "preference" || item.property === "previousTutor") {
                myData[item.property] = item.value + "";
            }
        });

        if (!myData.hasOwnProperty('previousTutor')) {
            myData['previousTutor'] = 'false';
        }

        return myData;
    }

    const [myHeight, setMaxHeight] = useState(getMaxHeight());


    function getAllApplicants(selectedCourse) {
        return DataStore.query(MarkerApplication).then(allMarkers => {
            const applicants = allMarkers.filter(marker =>
                marker.courseSpecifics.includes(selectedCourse)
            );
            return applicants;
        });
    }
    async function getApplicant(id) {
        const marker = await DataStore.query(MarkerApplication, (m) => m.auid.eq(id));
        return marker[0];
    }

    async function getCourse(selectedCourse) {
        return await DataStore.query(Course, (c) => c.courseCode.eq(selectedCourse.slice(-3)));
    }

    function getMaxHeight() {
        const viewportHeight = window.innerHeight;
        const subtractedHeight = 300;
        return viewportHeight - subtractedHeight;
    }

    function handleResize() {
        setMaxHeight(getMaxHeight());
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });
    function updateCourseSpecifics(applicant, value, status, check) {
        const jsonObject = JSON.parse(applicant.courseSpecifics);
        const myCourse = Object.keys(jsonObject).find(key => key === selectedCourse);

        if (myCourse) {
            jsonObject[myCourse].forEach(item => {
                if (item.property === "assignedHours") {
                    item.value = value;
                }
                if (item.property === "status") {
                    item.value = status;
                }

            });
        }
        return JSON.stringify(jsonObject);

    }

    const sendEmail = async ({ row }, myStatus) => {
        const applicant = await getApplicant(row.original.id);

        let username = applicant.givenName;
        let useremail = applicant.preferredEmail;

        const serviceId = "service_mroqh3a"

        let templateId = "template_eqxqmrb";

        if (myStatus === "DECLINED") {
            templateId = "template_tkg84ui"
        }

        try {
            await emailjs.send(serviceId, templateId, {
                name: username,
                recipient: useremail,
                course_name: selectedCourse,
            });

            const title = 'Success!';
            const body = 'Email sent to participant.';

            setModalTitle(title);
            setModalBody(body);
            setShowModal(true);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
   


    };

    const handleCloseUserModal = () => setShowUserModal(false);


    const handleShowUserModal = async (selected) => {

        const applicant = await getApplicant(selected);
        setSelectedApplicant(applicant);
        setShowUserModal(true);
    };


    function updateApplicationStatus(applicant) {
        const jsonObject = JSON.parse(applicant.courseSpecifics);
        const myCourse = Object.keys(jsonObject).find(key => key === selectedCourse);
        let assignedHours = 0;
        let status = ""
        if (myCourse) {
            jsonObject[myCourse].forEach(item => {
                if (item.property === "assignedHours") {
                    assignedHours = item.value;
                }
                if (item.property === "status") {
                    status = item.value;
                }

            });
        }
        return [assignedHours, status];

    }
    const updateCells = async ({ row }, updatedValue) => {
        if (!isNaN(updatedValue) && parseInt(updatedValue) >= 0) {
            try {
                const updatedData = [...data];
                updatedData[row.index].hoursAssigned = updatedValue;
                setData(updatedData);
            } catch (e) {
                console.log(e)
            }
        }

    }
    const updateCell = async ({ row }, check, myStatus) => {


        if (check === 0) {

            const updatedValue = window.prompt('Assign Hours');
            if (!isNaN(updatedValue) && parseInt(updatedValue) >= 0) {
                try {
                    const updatedData = [...data];
                    updatedData[row.index].hoursAssigned = updatedValue;
                    setData(updatedData);
                } catch (e) {
                    console.log(e)
                }
            }

        }

        else if (check === 1) {

            const applicant = await getApplicant(row.original.id);

            if (row.original.hoursAssigned === "0" && myStatus !== "DECLINED") {
                return "Invalid";
            }


            try {

                const withoutId = applicant.userId.split(' ')

                const data = await DataStore.query(ApplicationStatus, (a) => a.userId.eq(withoutId[0]));
                for (const myObject of data) {
                    let course = myObject.appliedCourses;
                    course = course.replace(" ", "");
                    if (course === selectedCourse) {


                        const [assignedHours, status] = updateApplicationStatus(applicant);
                        await DataStore.save(ApplicationStatus.copyOf(myObject, updated => {
                            if (status === "DECLINED") {
                                updated.hoursAssigned = "0";
                            }
                            else {
                                updated.hoursAssigned = assignedHours + "";
                            }
                            updated.status = status;
                        }));
                    }
                }


                await DataStore.save(MarkerApplication.copyOf(applicant, updated => {
                    updated.courseSpecifics = updateCourseSpecifics(applicant, row.original.hoursAssigned, myStatus, 1);
                }));


            } catch (e) {
                alert(e);
            }


        }
    };

    const downloadTranscript = async ({ row }) => {

        const result = await Storage.get('transcript.pdf', {
            level: 'protected',
            identityId: row.original.identityId
        });

        const link = document.createElement('a');
        link.href = result;
        link.download = row.original.id + 'transcript.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    }

    const downloadCV = async ({ row }) => {
        const result = await Storage.get('cv.pdf', {
            level: 'protected',
            identityId: row.original.identityId
        });

        const link = document.createElement('a');
        link.href = result;
        link.download = row.original.id + 'cv.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }


    return (
        <div className="student-table">
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

            <h1>All Courses &gt; Application for {selectedCourse}</h1>
            <ThemeProvider theme={theme}>
                <MaterialReactTable
                    columns={columns}
                    data={data}
                    muiTableContainerProps={{ sx: { maxHeight: `${myHeight}px` } }}
                    positionToolbarAlertBanner="bottom"
                    state={{ rowSelection }}
                    onRowSelectionChange={setRowSelection}
                    isEditable={(column) => column.isEditable}
                    enableRowActions
                    renderRowActionMenuItems={({ row }) => [
                        <MenuItem id="m-2" key="transcript" onClick={() => downloadTranscript({ row })}>
                            <p className="action-edit" style={{ fontFamily: 'Roboto, Halvetica, Arial, sans-serif' }}>
                            <i className="fa fa-download"></i> Transcript
                            </p>
                        </MenuItem>,
                        <MenuItem id="m-3" key="cv" onClick={() => downloadCV({ row })}>
                            <p className="action-edit" style={{ fontFamily: 'Roboto, Halvetica, Arial, sans-serif' }}>
                            <i className="fa fa-download"></i> CV
                            </p>
                        </MenuItem>,
                        <MenuItem id="m-3" key="user" onClick={() => handleShowUserModal(row.original.id)}>
                            <p className="action-edit" style={{ fontFamily: 'Roboto, Halvetica, Arial, sans-serif' }}>
                            <i className="fa fa-eye"></i> User Info
                            </p>
                        </MenuItem>,
                        ]}
                    onEditingRowSave={updateCell}
                    enableRowSelection
                    renderBottomToolbarCustomActions={({ table }) => {
                        const handleAccepted = async () => {
                            table.getSelectedRowModel().flatRows.map(async (row) => {
                                let val = await updateCell({ row }, 1, "ACCEPTED");
                                val = await updateCell({ row }, 1, "ACCEPTED");

                                if (val === "Invalid") {
                                    const title = 'Error';
                                    const body = `Please assign hours to a student before accepting them.`;
                    
                                    setModalTitle(title);
                                    setModalBody(body);
                                    setShowModal(true);
                                } else {
                                    await sendEmail({ row }, "ACCEPTED");
                                }

                            });
                        };
                        const handleDeclined = async () => {
                            table.getSelectedRowModel().flatRows.map(async (row) => {
                                await updateCell({ row }, 1, "DECLINED");
                                await updateCell({ row }, 1, "DECLINED");
                                await sendEmail({ row }, "DECLINED");
                            });
                        };
                        const handleEdit = async () => {
                            const updatedValue = window.prompt('Assign Hours to all selected applicants');
                            table.getSelectedRowModel().flatRows.map(async (row) => {
                                await updateCells({ row }, updatedValue)
                            });
                        };

                        return (
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <Button
                                    color="success"
                                    disabled={!table.getIsAllRowsSelected() && !table.getIsSomeRowsSelected()}
                                    onClick={handleAccepted}
                                    variant="contained"
                                >
                                    ACCEPT
                                </Button>
                                <Button
                                    color="error"
                                    disabled={!table.getIsAllRowsSelected() && !table.getIsSomeRowsSelected()}
                                    onClick={handleDeclined}
                                    variant="contained"
                                >
                                    DECLINE
                                </Button>
                                <Button
                                    color="or"
                                    disabled={!table.getIsAllRowsSelected() && !table.getIsSomeRowsSelected()}
                                    onClick={handleEdit}
                                    variant="contained"
                                >
                                    <p style={{ margin: '0px', padding: '0px' }}><i className="fa fa-plus"> </i> Assign Hours</p>
                                </Button>

                            </div>
                        );
                    }}
                />
            </ThemeProvider>
            <br></br>
            <h6 style={{ textAlign: "center" }}>Tip: Click the "..." under actions to download a students transcript, CV, or to view more info about a user.</h6>
            <Modal show={showUserModal} onHide={handleCloseUserModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {selectedCourse}: {selectedApplicant.givenName} {selectedApplicant.familyName}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table>
                        <tbody>
                            <tr>
                                <th colSpan="2"><b>Personal Details</b></th>
                            </tr>
                            <tr>
                                <td>UPI:</td>
                                <td>{selectedApplicant.upi}</td>
                            </tr>
                            <tr>
                                <td>AUID:</td>
                                <td>{selectedApplicant.auid}</td>
                            </tr>
                            <tr>
                                <td>Email:</td>
                                <td>{selectedApplicant.preferredEmail}</td>
                            </tr>

                            <tr>
                                <th colSpan="2"><b>Academic Details</b></th>
                            </tr>
                            <tr>
                                <td>Degree:</td>
                                <td>{selectedApplicant.degree}</td>
                            </tr>
                            <tr>
                                <td>Years of Study:</td>
                                <td>{selectedApplicant.yearsOfStudy}</td>
                            </tr>
                            <tr>
                                <td>Level of Study:</td>
                                <td>{selectedApplicant.underPostGrad}</td>
                            </tr>
                            <tr>
                                <td>Overseas:</td>
                                <td>{selectedApplicant.overseas === true ? 'Yes' : 'No'}</td>
                            </tr>

                            <tr>
                                <th colSpan="2"><b>Application Details</b></th>
                            </tr>
                            <tr>
                                <td>Current Tutor:</td>
                                <td>{selectedApplicant.currentTutor === true ? 'Yes' : 'No'}</td>
                            </tr>
                            <tr>
                                <td>Max Hours per Week:</td>
                                <td>{selectedApplicant.maxHours}</td>
                            </tr>
                            <tr>
                                <td>Valid NZ Work Permit:</td>
                                <td>{selectedApplicant.validNzWorkPermit === true ? 'Yes' : 'No'}</td>
                            </tr>
                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleCloseUserModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>


    );
}
export default ApplicantsView;