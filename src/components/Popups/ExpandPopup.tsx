import styled from '@emotion/styled'
import { TodoListContext, TodoListContextType } from '../../TodoListContext';
import { useContext } from 'react';
import EditIcon from "../../assets/note-edit.svg";
import moment from "moment/moment";
import DeleteIcon from "../../assets/delete.svg";

const Container = styled.form`
    width: 50%;
    height: 70%;
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

const Description = styled.div`
    border: 1px solid black;
    font-size: 20px;
    overflow: auto;
    padding: 10px;
    height: 85%;
    overflow-wrap: break-word;
`

const Title = styled.label`
    font-size: 40px;
    font-weight: bold;
    padding: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
`

const Date = styled.label`
    font-size: 40px;
    font-weight: bold;
    padding: 10px;
    margin-right: 30px;
`

const Icons = styled.div`
    width: 21%;
`

const Image = styled.img`
    width: 40px;
    cursor: pointer;
    padding-left: 15px;
    padding-right: 15px;
    &:hover {
        background-color: #54ACDA;
    }
    &:active {
        border: 1px solid black;
    }
`

const ExpandPopup = () => {

    const { setEditTodoInfo, editTodoInfo, setPopupID } = useContext(TodoListContext) as TodoListContextType;

    return (
        <Container>
            <ExitButton onClick={() => {
                setPopupID(-1);
                setEditTodoInfo({
                    id: -1,
                    title: "",
                    date: "",
                    priority: "",
                    description: "",
                    projectId: -1,
                    projectTitle: ""
                })
                }}>X</ExitButton>
            <div style={{padding: '10px', paddingBottom: '20px', height: '95%', display: 'flex', flexDirection: "column", justifyContent: 'space-between'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Title>{editTodoInfo.title}</Title>
                    <Date>{editTodoInfo.date}</Date>
                    <Icons>
                        <Image src={EditIcon} onClick={(e) => {
                            e.stopPropagation();
                            setEditTodoInfo({
                                id: editTodoInfo.id,
                                title : editTodoInfo.title,
                                description : editTodoInfo.description,
                                date : moment(editTodoInfo.date).format('YYYY-MM-DD'),
                                priority : editTodoInfo.priority,
                                projectId: editTodoInfo.projectId,
                                projectTitle: editTodoInfo.projectTitle
                            });
                            setPopupID(1);
                        }}/>
                        <Image src={DeleteIcon} onClick={() => {
                            setPopupID(5);
                        }}/>
                    </Icons>
                </div>
                <Description>{editTodoInfo.description}</Description>
            </div>
        </Container> 
    );

}

export default ExpandPopup;