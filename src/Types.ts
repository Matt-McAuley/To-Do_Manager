type Todo = {
    // id: number;
    title: string;
    description: string;
    due_date: Date;
    priority: string;
}

type Project = {
    // id: number;
    todos: Todo[];
    title: string;
}

type edits = {
    project: Project | null;
    todo: Todo | null;
  }

type editInfo = {
    projectTitle: string;
    projectTodos: Todo[];
    todoTitle: string;
    description: string;
    date: string;
    priority: string;
}

export type { Project, Todo, edits, editInfo }