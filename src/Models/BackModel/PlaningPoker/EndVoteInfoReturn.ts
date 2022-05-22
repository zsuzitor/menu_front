


export interface IEndVoteUserInfoReturn {
    id: string;
    vote: string;//number|string
}


export interface IEndVoteInfoReturn {
    users_info: IEndVoteUserInfoReturn[];
    average_vote: number;//double
    min_vote: number;
    max_vote: number;
}