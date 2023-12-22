import { CognitoIdentityProviderClient, AdminCreateUserCommand, AdminDisableUserCommand, ListUsersCommand, AdminEnableUserCommand, AdminAddUserToGroupCommand, AdminRemoveUserFromGroupCommand } from "@aws-sdk/client-cognito-identity-provider"; // ES Modules import
import { useState } from 'react';
import {fromCognitoIdentityPool} from "@aws-sdk/credential-providers";
import { useAuthenticator } from '@aws-amplify/ui-react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NavbarComp from "../components/NavbarComp";
import Sidebar from "../components/Sidebar";

function MarkerSignUp() {
    const { user } = useAuthenticator((context) => [context.user]); 

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [formDataSuspend, setFormDataSuspend] = useState({
        emailSuspend: ""
    });

    const [formDataEnable, setFormDataEnable] = useState({
        emailEnable: ""
    });

    const [formDataPerms, setFormDataPerms] = useState({
        emailPerms: "",
        levelPerms: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleChangeSuspend = (e) => {
        const { name, value } = e.target;
        setFormDataSuspend(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleChangeEnable = (e) => {
        const { name, value } = e.target;
        setFormDataEnable(prevData => ({
            ...prevData,
            [name]: value
        }));
    };
    const handleChangePerms = (e) => {
        const { name, value } = e.target;
        setFormDataPerms(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    async function handleSubmit(e) {
        e.preventDefault();

        for (let key in formData) {
            if (formData[key] == "") {
                alert("Please fill in all fields")
                return;
            }
        }

        
        const client = new CognitoIdentityProviderClient({ region: "ap-southeast-2", credentials: fromCognitoIdentityPool({
            clientConfig: { region: "ap-southeast-2" }, // Configure the underlying CognitoIdentityClient.
            identityPoolId: 'ap-southeast-2:0678cb96-f6b0-4c3d-b6ba-8174a82a77f8',
            logins: {
                'cognito-idp.ap-southeast-2.amazonaws.com/ap-southeast-2_uTyA7UL9p': user.getSignInUserSession().getIdToken().getJwtToken()
            },
          }) });
        const input = { // AdminCreateUserRequest TODO: ADD ATTRIBUTES GIVENNAME FAMILYNAME EMAIL
            UserPoolId: "ap-southeast-2_uTyA7UL9p",
            Username: formData.email,
            UserAttributes: [
                {
                Name: "email_verified",
                Value: "True",
                },
            ],
            TemporaryPassword: formData.password,
            ForceAliasCreation: false,
            MessageAction: "SUPPRESS",
            DesiredDeliveryMediums: [
                "EMAIL",
            ],
            UserAttributes: [
                {
                    "Name": "email",
                    "Value": formData.email
                }
            ]
        };
        try{
            const command = new AdminCreateUserCommand(input);
            const response = await client.send(command);
        } catch (error) {
            console.error('Error submitting user:', error);
            alert("fail2")
            alert(error)
            alert('An error has occurred, please refer to console.');
        }
    }

    async function handleSubmitSuspend(e) {
        e.preventDefault();

        for (let key in formDataSuspend) {
            if (formDataSuspend[key] == "") {
                alert("Please fill in all fields")
                return;
            }
        }
        
        const client = new CognitoIdentityProviderClient({ region: "ap-southeast-2", credentials: fromCognitoIdentityPool({
            clientConfig: { region: "ap-southeast-2" }, // Configure the underlying CognitoIdentityClient.
            identityPoolId: 'ap-southeast-2:0678cb96-f6b0-4c3d-b6ba-8174a82a77f8',
            logins: {
                'cognito-idp.ap-southeast-2.amazonaws.com/ap-southeast-2_uTyA7UL9p': user.getSignInUserSession().getIdToken().getJwtToken()
            },
        }) });

        const commandUsers = new ListUsersCommand({
            UserPoolId: "ap-southeast-2_uTyA7UL9p",
            AttributesToGet: ["email", "sub"],
            Limit: 1,
            Filter: "email = '" + formDataSuspend.emailSuspend + "'"
        });
        let responseSuspend;

        try{
            responseSuspend = await client.send(commandUsers);
            if (!responseSuspend.Users[0]) {
                alert("User not found");
                return;
            }
        } catch (error) {
            console.error('Error submitting user:', error);
            alert("fail1")
            alert(error)
            alert('An error has occurred, please refer to console.');
        }
        

        
        const input = { // AdminDisableUserRequest
            UserPoolId: "ap-southeast-2_uTyA7UL9p", // required
            Username: responseSuspend.Users[0].Username, // required
         };
        try{
            const command = new AdminDisableUserCommand(input);
            const response = await client.send(command);
        } catch (error) {
            console.error('Error submitting user:', error);
            alert("fail2")
            alert(error)
            alert('An error has occurred, please refer to console.');
        }
    }

    async function handleSubmitEnable(e) {
        e.preventDefault();

        for (let key in formDataEnable) {
            if (formDataEnable[key] == "") {
                alert("Please fill in all fields")
                return;
            }
        }
        
        const client = new CognitoIdentityProviderClient({ region: "ap-southeast-2", credentials: fromCognitoIdentityPool({
            clientConfig: { region: "ap-southeast-2" }, // Configure the underlying CognitoIdentityClient.
            identityPoolId: 'ap-southeast-2:0678cb96-f6b0-4c3d-b6ba-8174a82a77f8',
            logins: {
                'cognito-idp.ap-southeast-2.amazonaws.com/ap-southeast-2_uTyA7UL9p': user.getSignInUserSession().getIdToken().getJwtToken()
            },
        }) });

        const commandUsers = new ListUsersCommand({
            UserPoolId: "ap-southeast-2_uTyA7UL9p",
            AttributesToGet: ["email", "sub"],
            Limit: 1,
            Filter: "email = '" + formDataEnable.emailEnable + "'"
        });
        let responseEnable;

        try{
            responseEnable = await client.send(commandUsers);
            if (!responseEnable.Users[0]) {
                alert("User not found");
                return;
            }
        } catch (error) {
            console.error('Error submitting user:', error);
            alert("fail1")
            alert(error)
            alert('An error has occurred, please refer to console.');
        }
        

        
        const input = { // AdminDisableUserRequest
            UserPoolId: "ap-southeast-2_uTyA7UL9p", // required
            Username: responseEnable.Users[0].Username, // required
         };
        try{
            const command = new AdminEnableUserCommand(input);
            const response = await client.send(command);
        } catch (error) {
            console.error('Error submitting user:', error);
            alert("fail2")
            alert(error)
            alert('An error has occurred, please refer to console.');
        }
    }

    async function handleSubmitPerms(e) {
        e.preventDefault();

        for (let key in formDataPerms) {
            if (formDataPerms[key] == "") {
                alert("Please fill in all fields")
                return;
            }
        }
        
        const client = new CognitoIdentityProviderClient({ region: "ap-southeast-2", credentials: fromCognitoIdentityPool({
            clientConfig: { region: "ap-southeast-2" }, // Configure the underlying CognitoIdentityClient.
            identityPoolId: 'ap-southeast-2:0678cb96-f6b0-4c3d-b6ba-8174a82a77f8',
            logins: {
                'cognito-idp.ap-southeast-2.amazonaws.com/ap-southeast-2_uTyA7UL9p': user.getSignInUserSession().getIdToken().getJwtToken()
            },
        }) });

        const commandUsers = new ListUsersCommand({
            UserPoolId: "ap-southeast-2_uTyA7UL9p",
            AttributesToGet: ["email", "sub"],
            Limit: 1,
            Filter: "email = '" + formDataPerms.emailPerms + "'"
        });
        let responseEnable;

        try{
            responseEnable = await client.send(commandUsers);
            if (!responseEnable.Users[0]) {
                alert("User not found");
                return;
            }
        } catch (error) {
            console.error('Error submitting user:', error);
            alert("fail1")
            alert(error)
            alert('An error has occurred, please refer to console.');
        }
        
        if (formDataPerms.levelPerms === "Remove") {
            // remove from markercoordinator
            const input = { 
                GroupName: "MarkerCoordinator",
                Username: responseEnable.Users[0].Username, 
                UserPoolId: "ap-southeast-2_uTyA7UL9p"
            };
            try{
                const command = new AdminRemoveUserFromGroupCommand(input);
                const response = await client.send(command);
            } catch (error) {
                console.error('Error submitting user:', error);
                alert("fail2")
                alert(error)
                alert('An error has occurred, please refer to console.');
            }


            // remove from coursecoordinator
            const input1 = { 
                GroupName: "CourseCoordinators",
                Username: responseEnable.Users[0].Username, 
                UserPoolId: "ap-southeast-2_uTyA7UL9p"
            };
            try{
                const command1 = new AdminRemoveUserFromGroupCommand(input1);
                const response = await client.send(command1);
            } catch (error) {
                console.error('Error submitting user:', error);
                alert("fail2")
                alert(error)
                alert('An error has occurred, please refer to console.');
            }


        } else{
            const input = { 
                GroupName: formDataPerms.levelPerms,
                Username: responseEnable.Users[0].Username, 
                UserPoolId: "ap-southeast-2_uTyA7UL9p"
            };
            try{
                const command = new AdminAddUserToGroupCommand(input);
                const response = await client.send(command);
            } catch (error) {
                console.error('Error submitting user:', error);
                alert("fail2")
                alert(error)
                alert('An error has occurred, please refer to console.');
            }
        }
    }

    return (
        <>
            <NavbarComp />
            <div className="content-container">
                <Sidebar />
                <Form className="p-4 rounded" style={{ fontWeight: 600, width:'600px', height: '100%' }} onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Sign up user to website manually</Form.Label><br></br>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            name="email"
                            placeholder="johndoe@example.com"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            type="password"
                            onChange={handleChange}
                        /><br></br>
                        <Button variant="primary" type="submit">Submit</Button>
                    </Form.Group>
                </Form>
                <Form className="p-4 rounded" style={{ fontWeight: 600, width:'600px', height: '100%' }} onSubmit={handleSubmitSuspend}>
                    <Form.Group>
                        <Form.Label>Suspend User Email</Form.Label>
                        <Form.Control
                            name="emailSuspend"
                            placeholder="johndoe@example.com"
                            value={formDataSuspend.emailSuspend}
                            onChange={handleChangeSuspend}
                        />
                        <Form.Text>Stops the user from signing into the website</Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit">Submit</Button>
                </Form>
                <Form className="p-4 rounded" style={{ fontWeight: 600, width:'600px', height: '100%' }} onSubmit={handleSubmitEnable}>
                    <Form.Group>
                        <Form.Label>Enable User Email</Form.Label>
                        <Form.Control
                            name="emailEnable"
                            placeholder="johndoe@example.com"
                            value={formDataSuspend.emailEnable}
                            onChange={handleChangeEnable}
                        />
                        <Form.Text>Allows a user to sign into the website again after being suspended.</Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit">Submit</Button>
                </Form>
                <Form className="p-4 rounded" style={{ fontWeight: 600, width:'600px', height: '100%' }} onSubmit={handleSubmitPerms}>
                    <Form.Group>
                        <Form.Label>Change User Email Permissions</Form.Label>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            name="emailPerms"
                            placeholder="johndoe@example.com"
                            value={formDataPerms.emailPerms}
                            onChange={handleChangePerms}
                        />
                        <Form.Label>Permissions:</Form.Label>
                        <Form.Select
                            name="levelPerms"
                            aria-label="Default select example"
                            value={formDataPerms.levelPerms}
                            onChange={handleChangePerms}
                        >
                            <option value="MarkerCoordinator">MarkerCoordinator</option>
                            <option value="CourseCoordinators">CourseCoordinator</option>
                            <option value="Remove">Remove all permissions (user level)</option>
                        </Form.Select>
                    </Form.Group>
                    <Button variant="primary" type="submit">Submit</Button>
                </Form>
            </div>
        </>
    );
}

export default MarkerSignUp;