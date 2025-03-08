type Todo = {
    id: number;
    title: string;
    description: string;
    due_date: number;
    priority: string;
}

type Project = {
    id: number;
    todos: Todo[];
    title: string;
}

type edits = {
    project: Project | null;
    todo: Todo | null;
  }

type editInfo = {
    projectTitle: string;
    projectId: number;
    projectTodos: Todo[];
    todoTitle: string;
    todoId: number;
    description: string;
    date: string;
    priority: string;
}

export type { Project, Todo, edits, editInfo }