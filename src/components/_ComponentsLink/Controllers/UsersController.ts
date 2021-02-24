import { MainErrorObjectBack } from "../BackModel/ErrorBack";
import { UserShortBack } from "../BackModel/UserShort";


export type GetUserShort = (error: MainErrorObjectBack,data:UserShortBack) => void;

export interface IUsersController {
    GetShortestUSerInfo: ( onSuccess: GetUserShort) => void;

}


export class UsersController implements IUsersController{
    GetShortestUSerInfo( onSuccess: GetUserShort){
         G_AjaxHelper.GoAjaxRequest({
            Data: {},
            Type: "GET",
            NotRedirectWhenNotAuth: true,
            FuncSuccess: (xhr, status, jqXHR) => {
                let resp: MainErrorObjectBack = xhr as MainErrorObjectBack;
                if (resp.errors) {
                    //TODO ошибка
                    onSuccess(resp,null);
        
                }
                else {
                    let dataBack = xhr as UserShortBack;
                    
                    if (!dataBack.id) {
                        //TODO какая то ошибка
                        alert('что то сломалось-1');
                        return;
                    }
                    onSuccess(null,dataBack);
                    
                }
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/users/get-shortest-user-info',
        
        });
    }
}



