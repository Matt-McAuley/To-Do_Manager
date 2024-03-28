import { createContext } from "react";
import { Project } from "./Classes";

export type TodoListContextType = {
    allTodos : Project;
    projects : Project[];
    setProjects : React.Dispatch<React.SetStateAction<Project[]>>;
    currentProject : Project;
    setCurrentProject : React.Dispatch<React.SetStateAction<Project>>;
    addNewTodo : (name: string, description: string, date: Date, priority: string) => void;
    addNewProject : (name: string) => void;
    todoPopupDisplayed : boolean;
    setTodoPopupDisplayed : React.Dispatch<React.SetStateAction<boolean>>;
    projectPopupDisplayed : boolean;
    setProjectPopupDisplayed : React.Dispatch<React.SetStateAction<boolean>>;
}

export const TodoListContext = createContext<TodoListContextType | null>(null);