

import { MainErrorObjectBack } from "../../BackModel/ErrorBack";
import { IOneRoomReturn } from "../../BackModel/PlaningPoker/OneRoomReturn";
import { IRoomInfoReturn } from "../../BackModel/PlaningPoker/RoomInfoReturn";
import { IUserInRoomReturn } from "../../BackModel/PlaningPoker/UserInRoomReturn";


export type ListUserInRoomReturn = (error: MainErrorObjectBack, data: IUserInRoomReturn[]) => void;
export type GetRoomInfoReturn = (error: MainErrorObjectBack, data: IRoomInfoReturn) => void;



export interface IPlaningPokerController {
    //TODO тут userId хорошо бы убрать на бэк. см бэк контроллер
    GetUsersIsRoom: (roomname: string, userId: string, onSuccess: ListUserInRoomReturn) => void;
    GetRoomInfo: (roomname: string, userId: string, onSuccess: GetRoomInfoReturn) => void;
}



export class PlaningPokerController implements IPlaningPokerController {


    GetUsersIsRoom(roomname: string, userId: string, onSuccess: ListUserInRoomReturn) {
        G_AjaxHelper.GoAjaxRequest({
            Data: {
                'roomname': roomname,
                'userConnectionId': userId
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

    GetRoomInfo(roomname: string, userId: string, onSuccess: GetRoomInfoReturn) {
        G_AjaxHelper.GoAjaxRequest({
            Data: {
                'roomname': roomname,
                'userConnectionId': userId
            },
            Type: "GET",
            FuncSuccess: (xhr, status, jqXHR) => {
                let resp: MainErrorObjectBack = xhr as MainErrorObjectBack;
                if (resp.errors) {
                    //TODO ошибка
                    onSuccess(resp, null);

                }
                else {
                    let dataBack = xhr as IRoomInfoReturn;
                    onSuccess(null, dataBack);

                }
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/PlanitPoker/get-room-info',

        });
    }

}