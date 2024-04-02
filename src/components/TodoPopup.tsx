import styled from '@emotion/styled'
import { TextField, RadioGroup, FormLabel, FormControlLabel, Radio } from '@mui/material'
import { TodoListContext, TodoListContextType } from '../TodoListContext';
import { useContext } from 'react';

const Container = styled.form`
  width: 70%;
  height 70%;
  position: absolute;
  background-color:white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const TodoPopup = () => {

    const { editInfo, setEditInfo, todoPopup, setTodoPopup, addNewTodo } = useContext(TodoListContext) as TodoListContextType;

    return todoPopup ? (
        <Container onSubmit={(evt) => {
            evt.preventDefault;
            addNewTodo(editInfo.todoTitle, editInfo.description, new Date(editInfo.date), editInfo.priority);
            setEditInfo({
                ...editInfo,
                todoTitle : "",
                description : "",
                date : "",
                priority : ""
            })
            setTodoPopup(false);
            }}>
            <TextField id="outlined-basic" label="Title" variant="outlined" placeholder='Title' 
            onChange={(evt) => setEditInfo({...editInfo, todoTitle : (evt.target.value)})} value={editInfo.todoTitle} required/>
            <TextField id="outlined-basic" label="Description" variant="outlined" placeholder='Description' 
            onChange={(evt) => setEditInfo({...editInfo, description : (evt.target.value)})} value={editInfo.description} required/>
            <FormLabel id="demo-radio-buttons-group-label">Priority</FormLabel>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                value={editInfo.priority}
                onChange={(evt) => setEditInfo({...editInfo, priority : evt.target.value})}
            >
                <FormControlLabel value="low" control={<Radio />} label="low" required/>
                <FormControlLabel value="medium" control={<Radio />} label="medium" />
                <FormControlLabel value="high" control={<Radio />} label="high" />
            </RadioGroup>
            <input type="Date" onChange={(evt) => setEditInfo({...editInfo, date : evt.target.value})} 
            value={editInfo.date} required/>
            <button type="submit">Submit</button>
        </Container> 
    ) : null;

}

export default TodoPopup;