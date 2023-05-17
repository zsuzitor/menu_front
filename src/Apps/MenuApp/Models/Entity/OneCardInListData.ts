import { MappedWithBack } from "../../../../Models/BL/Interfaces/MappedWithBack";
import { IOneCardInListDataBack } from "../BackModels/OneCardInListDataBack";
import { IOneCardFullData } from "./OneCardFullData";

export interface IOneCardInListData extends MappedWithBack<IOneCardInListDataBack> {
    Id: number;
    Title: string;
    Body: string;
    Image: string;
    Followed: boolean;

    FillByBackModel(newData: IOneCardInListDataBack): void;
    FillByFullModel(newData: IOneCardFullData): void;
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
    
    FillByFullModel(newData: IOneCardFullData): void {
        this.Id = newData.Id;
        this.Title = newData.Title;
        this.Body = newData.Body;
        this.Image = newData.Image;
        this.Followed = newData.Followed;
    }


    FillByBackModel(backModel: IOneCardInListDataBack) {
        this.Id = backModel.id;
        this.Title = backModel.title;
        this.Body = backModel.body;
        this.Image = backModel.image;
        this.Followed = backModel.followed;
    }

}