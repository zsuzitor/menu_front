



export interface IUserInRoomReturn {
    id: string;
    roles: string[];
    name: string;
    vote?: string;//number|string
    has_vote:boolean;
}