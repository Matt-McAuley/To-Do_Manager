type Todo = {
    id: number;
    title: string;
    description: string;
    due_date: number;
    priority: string;
    projectTitle: string;
}

type Project = {
    id: number;
    todos: Todo[];
    title: string;
}

type editTodoInfo = {
    id: number;
    title: string;
    description: string;
    date: string;
    priority: string;
}

type editProjectInfo = {
    id: number;
    title: string;
}

export type { Project, Todo, editTodoInfo, editProjectInfo }