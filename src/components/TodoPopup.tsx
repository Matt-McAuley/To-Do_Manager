import styled from '@emotion/styled'
import { TextField, RadioGroup, FormLabel, FormControlLabel, Radio } from '@mui/material'

const Container = styled.div`
  width: 70%;
  height 70%;
  position: absolute;
  background-color: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const TodoPopup = () => {

    
    const createNewTodo = () => {
        
    }

    return (
        <Container>
            <TextField id="outlined-basic" label="Title" variant="outlined" placeholder='Title'/>
            <TextField id="outlined-basic" label="Description" variant="outlined" placeholder='Description'/>
            <FormLabel id="demo-radio-buttons-group-label">Priority</FormLabel>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
            >
                <FormControlLabel value="low" control={<Radio />} label="low" />
                <FormControlLabel value="medium" control={<Radio />} label="medium" />
                <FormControlLabel value="high" control={<Radio />} label="high" />
            </RadioGroup>
            <input type="Date"/>
            <button onClick={createNewTodo}>Submit</button>
        </Container>
    );

}

export default TodoPopup;