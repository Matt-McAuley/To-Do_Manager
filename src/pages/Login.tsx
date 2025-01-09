import styled from '@emotion/styled';
import {Link, useNavigate} from "react-router";
import {useState} from "react";
import {toast, ToastContainer} from "react-toastify";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #C1C8E4;
    font-family: "DM Sans";
`;

const LogIn = styled.div`
    font-size: 80px;
    font-weight: bold;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 40vw;
    height: 55vh;
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

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const error = (text: string) => {
        toast.error(text, {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
            pauseOnHover: false,
        });
    }

    const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (email === '' || password === '') {
            error("Please fill out all fields");
            return;
        }
        fetch('http://150.136.36.76:8000/api/login/', {
            body: JSON.stringify({
                email: email,
                password: password,
            }),
            method: "POST",
            credentials: "include",
        }).then(response => {
            if (!response.ok) {
                error("Invalid email or password");
                return;
            }
            navigate('/main');
        });
    }

    return (
        <>
            <ToastContainer />
            <Container>
                <Form onSubmit={formSubmit}>
                    <LogIn>Log In</LogIn>
                    <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.currentTarget.value)}/>
                    <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.currentTarget.value)}/>
                    <SubmitButton type="submit">Log In</SubmitButton>
                </Form>
                <Text>Don't have an account? <Link to="/signup">Sign Up</Link></Text>
            </Container>
        </>
    )
}