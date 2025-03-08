import { createContext } from "react";
import { Project, Todo } from "./Types";

export type TodoListContextType = {
    projects : Project[];
    setProjects : React.Dispatch<React.SetStateAction<Project[]>>;
    currentProject : Project;
    setCurrentProject : React.Dispatch<React.SetStateAction<Project>>;
    addNewTodo : (name: string, description: string, date: number, priority: string) => void;
    addNewProject: (title: string, todos?: Todo[], previousID?: number) => false | undefined;
    popupID : number;
    setPopupID: React.Dispatch<React.SetStateAction<number>>;
    editInfo: {
        projectTitle: string;
        projectId: number;
        projectTodos: Todo[];
        todoTitle: string;
        todoId: number;
        description: string;
        date: string;
        priority: string;
    }
    setEditInfo: React.Dispatch<React.SetStateAction<{
        projectTitle: string;
        projectId: number;
        projectTodos: Todo[];
        todoTitle: string;
        todoId: number;
        description: string;
        date: string;
        priority: string;
    }>>,
    recentEdits: {
        project: null | Project;
        todo: null | Todo;
    },
    setRecentEdits: React.Dispatch<React.SetStateAction<{
        project: null | Project;
        todo: null | Todo;
    }>>,
    notify: (text: string) => void,
}

export const TodoListContext = createContext<TodoListContextType | null>(null);