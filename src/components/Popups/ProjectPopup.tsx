import styled from '@emotion/styled'
import { TodoListContext, TodoListContextType } from '../../TodoListContext';
import { useContext } from 'react';

const Container = styled.form`
    width: 40%;
    height: 35%;
    position: absolute;
    background-color:white;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    font-family: "DM Sans", serif;
    padding: 20px;
`;

const InputArea = styled.div`
    display: flex;
    height: 90%;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
`

const Label = styled.label`
    font-family: "DM Sans", serif;
    font-size: 25px;
    padding-bottom: 5px;
`

const Title = styled.input`
    font-family: "DM Sans", serif;
    font-size: 25px;
    padding: 5px;
    width: 100%;
    height: 100%;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    border: 1px solid black;
`

const TitleGroup = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 60%;
    height: 20%;
`

const ExitButton = styled.button`
    font-size: 20px;
    padding: 10px;
    font-weight: bold;
    color: white;
    background-color: #ca5757;
    cursor: pointer;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    border: none;
    &:hover {
        background-color: #9a4242;
    }
    float: right;
`

const Header = styled.div`
    width: 100%;
    text-align: center;
    font-size: 50px;
    font-weight: bold;
`

const SubmitButton = styled.button`
    font-family: "DM Sans", serif;
    font-size: 25px;
    font-weight: bold;
    padding: 15px;
    width: 85%;
    background-color: lightgray;
    cursor: pointer;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    border: 1px solid black;
    &:hover {
        background-color: #b3b3b3;
    }
`

const ProjectPopup = () => {

    const { editInfo, setEditInfo, setPopupID, addNewProject} = useContext(TodoListContext) as TodoListContextType;

    return (
        <Container onSubmit={(evt : React.FormEvent) => {
            evt.preventDefault();
            addNewProject(editInfo.projectTitle, editInfo.projectTodos, editInfo.projectId);
            setEditInfo({...editInfo, projectTitle : "", projectId: -1, projectTodos: [],});
            setPopupID(-1);
            }}>
            <ExitButton onClick={() => {
                setPopupID(-1);
                setEditInfo({...editInfo, projectTitle : "", projectId: -1, projectTodos: [],});
            }}>X</ExitButton>
            <Header>Add New Project</Header>
            <InputArea>
                <TitleGroup>
                    <Label>Title:</Label>
                    <Title id="outlined-basic"
                       onChange={(evt : React.ChangeEvent<HTMLInputElement>) => setEditInfo({...editInfo, projectTitle: evt.target.value})} value={editInfo.projectTitle} required/>
                </TitleGroup>
                <SubmitButton type="submit">Submit</SubmitButton>
            </InputArea>
        </Container>
    );

}

export default ProjectPopup;