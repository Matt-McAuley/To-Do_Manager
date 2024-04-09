import styled from '@emotion/styled'
import { TodoListContext, TodoListContextType } from '../TodoListContext';
import { useContext } from 'react';

const Container = styled.div`
  width: 70%;
  height 70%;
  position: absolute;
  background-color:white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  border: 2px solid black;
`;

const Alert = styled.h2`
    width: 100%;
    height: 80%;
    padding: 8px;
    font-family: "DM Sans";
    font-size: 30px;
    display: grid;
    place-items: center;
    color: red;
`

const Button = styled.button`
    width: 100%;
    height: 20%;
    font-family: "DM Sans";
    font-size: 30px;
    font-weight: bold;
    background-color: lightgray;
    border-radius: 8px;
    cursor: pointer;
`

const AlertPopup = () => {
    const { alertPopup, setAlertPopup } = useContext(TodoListContext) as TodoListContextType;

    return (alertPopup) ? (
        <Container>
            <Alert>{alertPopup}</Alert>
            <Button onClick={() => setAlertPopup("")}>OK</Button>
        </Container> 
    ) : null;

}

export default AlertPopup;