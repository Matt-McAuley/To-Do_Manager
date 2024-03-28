import styled from '@emotion/styled'
import { Button } from '@mui/material'
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
`;

const AlertPopup = () => {
    const { alertPopup, setAlertPopup } = useContext(TodoListContext) as TodoListContextType;

    return (alertPopup) ? (
        <Container>
            <h2>{alertPopup}</h2>
            <Button onClick={() => setAlertPopup("")}>OK</Button>
        </Container> 
    ) : null;

}

export default AlertPopup;