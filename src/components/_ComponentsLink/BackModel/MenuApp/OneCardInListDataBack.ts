import { IOneCardFullDataBack } from "./OneCardFullDataBack";

export interface IOneCardInListDataBack {
    id: number;
    title: string;
    body: string;
    image: string;
    followed: boolean;

    FillByFullMode(data: IOneCardFullDataBack): void;
}


export class OneCardInListDataBack implements IOneCardInListDataBack {
    id: number;
    title: string;
    body: string;
    image: string;
    followed: boolean;

    FillByFullMode(data: IOneCardFullDataBack): void {
        this.id = data.id;
        this.title = data.title;
        this.body = data.body;
        this.image = data.main_image_path;
        this.followed = data.followed;


    }
}