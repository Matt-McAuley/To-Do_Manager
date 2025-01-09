import styled from '@emotion/styled';
import { Link } from 'react-router';

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
        box-shadow: 0px 37px 20px -20px rgba(0,0,0,0.2);
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

export default function Signup() {
    return (
        <Container>
            <Form>
                <SignUp>Sign Up</SignUp>
                <Input type="email" placeholder="Email" />
                <Input type="password" placeholder="Password" />
                <Input type="password" placeholder="Confirm Password" />
                <SubmitButton type="submit">Sign Up</SubmitButton>
            </Form>
            <Text>Already have an account? <Link to="/">Log In</Link></Text>
        </Container>
    )
}