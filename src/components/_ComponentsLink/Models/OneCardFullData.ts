import { CustomImageBack } from "../BackModel/CustomImageBack";
import { IOneCardFullDataBack } from "../BackModel/OneCardFullDataBack";
import { CustomImage } from "./CustomImage";

export interface IOneCardFullData {  //:IOneCardInListData??
    Id: number;
    Title: string;
    Body: string;
    Image?: string;
    Followed: boolean;
    AdditionalImages: CustomImage[];

    FillByBackModel(newData: IOneCardFullDataBack): void;
}


export class OneCardFullData implements IOneCardFullData {
    Id: number;
    Title: string;
    Body: string;
    Image?: string;
    Followed: boolean;
    AdditionalImages: CustomImage[];

    FillByBackModel(newData: IOneCardFullDataBack): void {
        this.Id = newData.id;
        this.Title = newData.title;
        this.Body = newData.body;
        this.Image = newData.main_image_path;
        this.Followed = newData.followed;
        this.AdditionalImages = //перенести даннные с бэк модели в фронт
    }


}
