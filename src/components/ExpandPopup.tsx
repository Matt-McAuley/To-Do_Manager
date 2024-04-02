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
`;

const ExpandPopup = () => {

    const { editInfo, expandPopup, setExpandPopup} = useContext(TodoListContext) as TodoListContextType;

    return expandPopup ? (
        <Container>
            <div>{editInfo.todoTitle}</div>
            <div>{editInfo.description}</div>
            <div>{editInfo.priority}</div>
            <div>{editInfo.date}</div>
            <button onClick={() => {setExpandPopup(false)}}>OK</button>
        </Container> 
    ) : null;

}

export default ExpandPopup;