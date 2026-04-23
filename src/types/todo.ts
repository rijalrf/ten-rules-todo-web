export interface Todo {
    id: number;
    title: string;
    description: string;
    is_completed: boolean;
    created_at: string;
}

export interface TodoInput {
    title: string;
    description: string;
}

export interface ApiError {
    message: string;
    status?: number;
}
