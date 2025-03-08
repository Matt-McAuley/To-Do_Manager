import styled from '@emotion/styled';
import { Link } from 'react-router';
import {useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import {useNavigate} from "react-router";
import {backendURL} from "../constants.ts";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #C1C8E4;
    font-family: "DM Sans";
`;

const SignUp = styled.div`
    font-size: 80px;
    margin-bottom: 10px;
    font-weight: bold;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 40vw;
    height: 70vh;
    background-color: #5680E9;
    padding: 20px;
    border-radius: 10px;
    border: 3px solid black;
    box-shadow: 0 0 10px black;
`;

const Input = styled.input`
    width: 60%;
    height: 5vh;
    border-radius: 8px;
    border: 3px solid black;
    font-size: 22px;
    padding: 10px;
    text-align: center;
`;

const SubmitButton = styled.button`
    border: 2px solid black;
    border-radius: 8px;
    width: 60%;
    height: 10%;
    background-color: #5AB9EA;
    cursor: pointer;
    font-size: 22px;
    &:hover {
        box-shadow: 0 37px 20px -20px rgba(0,0,0,0.2);
        transform: translate(0px, -5px) scale(1.05);
    }
    transition: all ease-in-out 300ms;
    margin-top: 10px;
    margin-bottom: 18px;
`;

const Text = styled.span`
    margin-top: 10px;
    font-size: 20px;
    font-weight: bold;
`;

const DoesntMatch = styled.span`
    color: red;
    font-size: 20px;
    font-weight: bold;
`;

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const error = (text: string) => {
        toast.error(text, {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
            pauseOnHover: false,
        });
    }
    const success = (text: string) => {
        toast.success(text, {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
            pauseOnHover: false,
        });
    }

    const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            error("Passwords don't match");
            return;
        }
        if (email === '' || password === '') {
            error("Please fill out all fields");
            return;
        }
        fetch(`${backendURL}/api/user/`, {
            method: 'POST',
            body: JSON.stringify({email, password}),
            credentials: 'include',
        }).then(response => {
            if (response.ok) {
                success("Account created successfully, redirecting to login page");
                setTimeout(() => navigate('/'), 3000);
            } else {
                error("User with that email already exists");
            }
        }).catch(() => {error("Account creation failed")});
    }

    return (
        <>
            <ToastContainer />
            <Container>
                <Form onSubmit={formSubmit}>
                    <SignUp>Sign Up</SignUp>
                    <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.currentTarget.value)}/>
                    <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.currentTarget.value)}/>
                    <Input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.currentTarget.value)}/>
                    {(password != confirmPassword) ? <DoesntMatch>Passwords don't match</DoesntMatch> : null}
                    <SubmitButton type="submit">Sign Up</SubmitButton>
                </Form>
                <Text>Already have an account? <Link to="/">Log In</Link></Text>
            </Container>
        </>
    )
}