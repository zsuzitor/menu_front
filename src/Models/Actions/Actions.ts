import { Action } from 'redux';


export class AppAction<T> implements Action {
    type: string;
    payload: T;
}