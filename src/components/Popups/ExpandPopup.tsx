import styled from '@emotion/styled'
import { TodoListContext, TodoListContextType } from '../../TodoListContext';
import { useContext } from 'react';

const Container = styled.div`
  width: 60%;
  height: 60%;
  position: absolute;
  background-color:white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: "DM Sans";
  font-size: 25px;
  display: grid;
  grid-template-rows: 80% 20%;
  grid-template-columns: 100%;
`;

const Info = styled.div`
  display: grid;
  grid-template-rows: 30% 70%;
  grid-template-columns: 34% 33% 33%;
  grid-row: 1/2;
  grid-column: 1/2;
`

const Title = styled.div`
  grid-row: 1/2;
  grid-column: 1/2;
  border: 2px solid black;
  padding: 5px;
  overflow: hidden;
`

const Description = styled.div`
  grid-row: 2/3;
  grid-column: 1/4;
  border: 2px solid black;
  padding: 5px;
`

const Priority = styled.div`
  grid-row: 1/2;
  grid-column: 3/4;
  border: 2px solid black;
  padding: 5px;
`

const Date = styled.div`
  grid-row: 1/2;
  grid-column: 2/3;
  border: 2px solid black;
  padding: 5px;
`

const Button = styled.button`
  grid-row: 2/3;
  grid-column: 1/2;
  font-family: "DM Sans";
  font-size: 30px;
  font-weight: bold;
  background-color: lightgray;
  cursor: pointer;
`

const ExpandPopup = () => {

    const { setEditInfo, editInfo, setPopupID} = useContext(TodoListContext) as TodoListContextType;

    return (
        <Container>
            <Info>
            <Title>{editInfo.todoTitle}</Title>
            <Description>{editInfo.description}</Description>
            <Priority>{editInfo.priority}</Priority>
            <Date>{editInfo.date}</Date>
            </Info>
            <Button onClick={() => {
                setPopupID(-1);
                setEditInfo({
                    todoTitle: "",
                    projectTitle: "",
                    projectTodos: [],
                    date: "",
                    priority: "",
                    description: "",
                })
                }}>OK</Button>
        </Container> 
    );

}

export default ExpandPopup;