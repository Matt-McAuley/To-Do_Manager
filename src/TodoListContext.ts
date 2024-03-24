import { createContext } from "react";
import { Todo, Project } from "./Classes";

export type TodoListContextType = {
    allTodos : Todo[];
    todos : Todo[];
    setTodos : React.Dispatch<React.SetStateAction<Todo[]>>;
    projects : Project[];
    setProjects : React.Dispatch<React.SetStateAction<Project[]>>;
    currentProject : Project;
    setCurrentProject : React.Dispatch<React.SetStateAction<Project>>;
    addNewTodo : (name: string, description: string, date: Date, priority: number) => void;
    addNewProject : (name: string) => void;
}

export const TodoListContext = createContext<TodoListContextType | null>(null);