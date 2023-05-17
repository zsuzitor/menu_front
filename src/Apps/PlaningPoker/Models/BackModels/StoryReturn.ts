



export interface IStoryReturn {
    id: string;
    name: string;
    description: string;
    vote?: number;
    date?: string;
    completed: boolean;
    current_session: boolean;
}