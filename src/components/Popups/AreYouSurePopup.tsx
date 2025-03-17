import styled from '@emotion/styled'
import { TodoListContext, TodoListContextType } from '../../TodoListContext';
import { useContext } from 'react';

const Container = styled.div`
    width: 40%;
    height: 30%;
    position: absolute;
    background-color:white;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    font-family: "DM Sans", serif;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;

const Question = styled.label`
    font-family: "DM Sans", serif;
    font-size: 30px;
    font-weight: bold;
`

const Project = styled.label`
    font-family: "DM Sans", serif;
    font-size: 35px;
    overflow: hidden;
    text-overflow: ellipsis;
`

const Title = styled.div`
    font-family: "DM Sans", serif;
    font-size: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
`

const NoButton = styled.button`
    font-family: "DM Sans", serif;
    font-size: 20px;
    font-weight: bold;
    padding: 10px;
    width: 45%;
    background-color: lightcoral;
    cursor: pointer;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    border: 1px solid black;
    &:hover {
        background-color: #b3b3b3;
    }
`

const YesButton = styled.button`
    font-family: "DM Sans", serif;
    font-size: 20px;
    font-weight: bold;
    padding: 10px;
    width: 45%;
    background-color: lightgreen;
    cursor: pointer;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    border: 1px solid black;
    &:hover {
        background-color: #b3b3b3;
    }
`

const AreYouSurePopup = () => {

    const { setEditTodoInfo, editTodoInfo, setPopupID, deleteTodo} = useContext(TodoListContext) as TodoListContextType;

    return (
        <Container>
            <Question>Are you sure you want to delete this To-Do?</Question>
            <Project>{editTodoInfo.projectTitle}:</Project>
            <Title>{editTodoInfo.title}</Title>
            <div style={{display:'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                <NoButton onClick={() => setPopupID(-1)}>Cancel</NoButton>
                <YesButton onClick={() => {
                    deleteTodo(editTodoInfo.id, editTodoInfo.projectId);
                    setEditTodoInfo({
                        id: -1,
                        title: "",
                        date: "",
                        priority: "",
                        description: "",
                        projectId: -1,
                        projectTitle: ""
                    });
                    setPopupID(-1);
                }}>Confirm</YesButton>
            </div>
        </Container>
    );

}

export default AreYouSurePopup;