import { Button } from '@mui/material'
import styled from '@emotion/styled'
import { useState } from 'react';
import { Project, Todo } from '../Classes';
import ProjectSelect from '../components/ProjectSelect'

const Container = styled.div`
  grid-column: 1 \ 2;
  grid-row: 1 / 3;
  background-color: red;
  display:flex;
  flex-direction:column;
  justify-content:start;
  align-items:center;
`;

type Props = {
  allTodos: Todo[];
  exampleProject: Project;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const Sidebar = (props: Props) => {
  const {allTodos, exampleProject, setTodos} = {...props};
  
  const [projects, setProjects] = useState([exampleProject])
  const [currentProject, setCurrentProject] = useState(projects[0])

  const addNewTodo = ((name:string, description:string, date:Date, priority:number) => {
    const newTodo = new Todo(name, description, date, priority);
    allTodos.push(newTodo);
    currentProject.addTodo(newTodo);
    setTodos([...currentProject.todos]);
  })

  const addNewProject = ((name:string) => {
    const newProject = new Project(name);
    setProjects([...projects, newProject]);
  })

  return (
    <Container>
      <Button variant='outlined'
        onClick={() => {
          setTodos(allTodos)
          allTodos.sort(function(a: Todo, b: Todo) {
            return (a.dueDate).getTime() - (b.dueDate).getTime();
        });
        }}
      >All Todos
      </Button>
      <Button variant="outlined" 
        onClick={() => {addNewTodo("hi","hi",new Date("1/1/23"),2)}}
      >Add Todo
      </Button>
      <ProjectSelect projects={projects} setCurrentProject={setCurrentProject} setTodos={setTodos}/>
      <Button variant='outlined'
        onClick={() => {addNewProject("hi")}}
      >Add Project
      </Button>
    </Container>
  );
}

export default Sidebar