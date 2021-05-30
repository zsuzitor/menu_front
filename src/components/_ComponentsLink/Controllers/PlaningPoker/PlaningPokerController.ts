

import { MainErrorObjectBack } from "../../BackModel/ErrorBack";
import { IUserInRoomReturn } from "../../BackModel/PlaningPoker/UserInRoomReturn";


export type ListUserInRoomReturn = (error: MainErrorObjectBack, data: IUserInRoomReturn[]) => void;



export interface IPlaningPokerController {
    GetUsersIsRoom: (roomname: string, onSuccess: ListUserInRoomReturn) => void;

}



export class PlaningPokerController implements IPlaningPokerController {


    GetUsersIsRoom(roomname: string, onSuccess: ListUserInRoomReturn) {
        G_AjaxHelper.GoAjaxRequest({
            Data: {
                'roomname': roomname
            },
            Type: "GET",
            FuncSuccess: (xhr, status, jqXHR) => {
                let resp: MainErrorObjectBack = xhr as MainErrorObjectBack;
                if (resp.errors) {
                    //TODO ошибка
                    onSuccess(resp, null);

                }
                else {
                    let dataBack = xhr as IUserInRoomReturn[];
                    onSuccess(null, dataBack);

                }
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/PlanitPoker/get-users-in-room',

        });
    }

}