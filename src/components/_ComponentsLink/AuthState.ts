export interface IAuthUserState {
    Name: string;
    Image: string;
}


export interface IAuthState {
    AuthSuccess: boolean;
    User?: IAuthUserState;
}