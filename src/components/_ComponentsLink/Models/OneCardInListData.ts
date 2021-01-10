import { IOneCardInListDataBack } from "../BackModel/OneCardInListDataBack";

export interface IOneCardInListData {
    Id: number;
    Title: string;
    Body: string;
    Image: string;
    Followed: boolean;

    FillByBackModel(newData: IOneCardInListDataBack): void;
}

export class OneCardInListData implements IOneCardInListData {
    Id: number;
    Title: string;
    Body: string;
    Image: string;
    Followed: boolean;

    constructor(backModel?: IOneCardInListDataBack) {
        if (backModel) {
            this.FillByBackModel(backModel);
        }

    }


    FillByBackModel(backModel: IOneCardInListDataBack) {
        this.Id = backModel.id;
        this.Title = backModel.title;
        this.Body = backModel.body;
        this.Image = backModel.image;
        this.Followed = backModel.followed;
    }

}