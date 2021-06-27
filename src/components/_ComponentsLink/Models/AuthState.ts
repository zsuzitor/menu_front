export interface IAuthUserState {
    Name: string;
    Image: string;
    Id: number;
    Email: string;
}


export interface IAuthState {
    AuthSuccess: boolean;
    User?: IAuthUserState;
}