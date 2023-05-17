

//todo это сейчас не работает?
export interface IMainErrorHandler {
    NotAuth(): void;
}

export class MainErrorHandler implements IMainErrorHandler {
    NotAuth() {
        document.location.href = "/menu/auth/login/";
    }
}



