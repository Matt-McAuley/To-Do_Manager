import styled from '@emotion/styled'
import { TodoListContext, TodoListContextType } from '../../TodoListContext';
import { useContext } from 'react';
import moment from "moment";

const Container = styled.form`
    width: 50%;
    height: 85%;
    position: absolute;
    background-color:white;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    font-family: "DM Sans", serif;
    padding: 20px;
`;

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

const InputArea = styled.div`
    display: flex;
    height: 90%;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
`

const Label = styled.label`
    font-family: "DM Sans", serif;
    font-size: 18px;
    padding-bottom: 5px;
`

const Title = styled.input`
    font-family: "DM Sans", serif;
    font-size: 15px;
    padding: 5px;
    width: 80%;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    border: 1px solid black;
`

const TitleGroup = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 100%;
`

const Description = styled.textarea`
    font-family: "DM Sans", serif;
    font-size: 15px;
    padding: 5px;
    resize: none;
    width: 100%;
    height: 100%;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    border: 1px solid black;
`

const DescriptionGroup = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 100%;
`

const PriorityInput = styled.input`
    font-size: 15px;
`

const PriorityButtons = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    border: 1px solid black;
    padding: 10px 20px 10px 20px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    width: 78%;
`

const PriorityButton = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 8px;
    width: 100%;
`

const PriorityGroup = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 100%;
`

const DateInput = styled.input`
    font-family: "DM Sans", serif;
    font-size: 15px;
    padding: 5px;
    width: 80%;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    border: 1px solid black;
`

const DateGroup = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 100%;
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

const TopBar = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 85%;
`

const BottomBar = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 85%;
    height: 35%;
`

const EditTodoPopup = () => {

    const { editTodoInfo, setEditTodoInfo, setPopupID, editTodo } = useContext(TodoListContext) as TodoListContextType;

    return (
        <Container onSubmit={(evt : React.FormEvent) => {
            evt.preventDefault;
            editTodo(editTodoInfo.id, editTodoInfo.title, editTodoInfo.description, moment(editTodoInfo.date).valueOf(), editTodoInfo.priority, editTodoInfo.projectId);
            setPopupID(-1);
            setEditTodoInfo({
                id : -1,
                title : "",
                description : "",
                date : "",
                priority : "",
                projectId : -1,
                projectTitle : ""
            })
        }}>
            <ExitButton onClick={() => {
                setPopupID(-1);
                setEditTodoInfo({
                    id : -1,
                    title : "",
                    description : "",
                    date : "",
                    priority : "",
                    projectId : -1,
                    projectTitle : ""
                });
            }}>X</ExitButton>
            <Header>Edit To-Do</Header>
            <InputArea>
                <TopBar>
                    <TitleGroup>
                        <Label>Title:</Label>
                        <Title onChange={(evt : React.ChangeEvent<HTMLInputElement>) => setEditTodoInfo({...editTodoInfo, title : (evt.target.value)})}
                               value={editTodoInfo.title} required/>
                    </TitleGroup>
                    <DateGroup>
                        <Label>Date:</Label>
                        <DateInput type='date' onChange={(evt : React.ChangeEvent<HTMLInputElement>) => setEditTodoInfo({...editTodoInfo, date : (evt.target.value)})}
                                   value={editTodoInfo.date} required/>
                    </DateGroup>
                    <PriorityGroup>
                        <Label>Priority:</Label>
                        <PriorityButtons>
                            <PriorityButton>
                                <Label>Low</Label>
                                <PriorityInput type="radio" value="low" checked={editTodoInfo.priority === "low"}
                                               onChange={(evt : React.ChangeEvent<HTMLInputElement>) => setEditTodoInfo({...editTodoInfo, priority : evt.target.value})} required/>
                            </PriorityButton>
                            <PriorityButton>
                                <Label>Medium</Label>
                                <PriorityInput type="radio" value="medium" checked={editTodoInfo.priority === "medium"}
                                               onChange={(evt : React.ChangeEvent<HTMLInputElement>) => setEditTodoInfo({...editTodoInfo, priority : evt.target.value})} required/>
                            </PriorityButton>
                            <PriorityButton>
                                <Label>High</Label>
                                <PriorityInput type="radio" value="high" checked={editTodoInfo.priority === "high"}
                                               onChange={(evt : React.ChangeEvent<HTMLInputElement>) => setEditTodoInfo({...editTodoInfo, priority : evt.target.value})} required/>
                            </PriorityButton>
                        </PriorityButtons>
                    </PriorityGroup>
                </TopBar>
                <BottomBar>
                    <DescriptionGroup>
                        <Label>Description:</Label>
                        <Description onChange={(evt : React.ChangeEvent<HTMLTextAreaElement>) => setEditTodoInfo({...editTodoInfo, description : (evt.target.value)})}
                                     value={editTodoInfo.description} required/>
                    </DescriptionGroup>
                </BottomBar>
                <SubmitButton type="submit">Submit</SubmitButton>
            </InputArea>
        </Container>
    );
}

export default EditTodoPopup;