export interface Task {
    id: number;
    title: string;
    description: string;
    priority: Priority;
    status: Status;
    createdAt: string;
    updatedAt: string;
}

export enum Priority {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH'
}

export enum Status {
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED'
}

export interface TaskForm{
    title:string;
    description:string;
    priority:Priority;
    status:Status;
}

export interface TaskFilters{
    search:string;
    status:Status | null;
    priority:Priority | null;
}

