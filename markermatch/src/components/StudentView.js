import React, { useState, useMemo, useEffect } from 'react';
import MaterialReactTable from 'material-react-table';
import { DataStore } from '@aws-amplify/datastore';
import { ApplicationStatus } from '../models';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Box } from '@mui/material';
import ModalPopUp from './ModalPopUp';

function UserApplicationStatus() {
    const [data, setdata] = useState([]);
    const { user } = useAuthenticator((context) => [context.user]);
    const [showModal, setShowModal] = useState(false);

    function closeModal() {
        setShowModal(false);
      }

    const columns = useMemo(() => [
        {
            accessorKey: 'courseNo',
            header: 'CourseNo',
        },
        {
            accessorKey: 'hoursRequested',
            header: 'Hours Requested',
        },
        {
            accessorKey: 'hoursAssigned',
            header: 'Hours Assigned',
        },
        {
            accessorKey: 'status',
            header: 'Status',
            Cell: ({ cell }) => (
                <Box
                component="span"
                sx={() => ({
                    backgroundColor: cell.getValue() === "ACCEPTED"? "green": cell.getValue() === "DECLINED" ? "red" : "orange",
                    borderRadius: '0.25rem',
                    color: '#fff',
                    maxWidth: '8.7ch',
                    p: '0.25rem',
                })}
              >
                {cell.getValue()}
              </Box>
            ),
        },],[]);

    useEffect(() => {
        const fetchdata = async () => {
        try 
        {   

            const records = await DataStore.query(ApplicationStatus, (a) => a.userId.eq(user.username));
            const newRecord = records.map((record) => ({
                courseNo: record.appliedCourses,
                hoursRequested:  record.hoursRequested,
                hoursAssigned:  record.hoursAssigned,
                status: record.status,
            }));

            setdata(newRecord);
        } catch (e) {
            setShowModal(true);
            }
        };
        fetchdata();
    }, [user.username]);

    const [m, setMaxHeight] = useState(getMaxHeight());

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

    return (

        <div className='student-table'>

            {showModal && (
                <ModalPopUp
                    show={showModal}
                    onHide={closeModal}
                    title="Error"
                    body="Error fetching data."
                    primaryButtonLabel="Close"
                    onPrimaryButtonClick={closeModal}
                />
            )}
            <MaterialReactTable columns={columns} data={data}
            muiTableContainerProps={{ sx: { maxHeight: `${m}px` } }}
            />
        </div>
    );
}
export default UserApplicationStatus;
