import { IOneCardFullDataBack } from "../BackModel/OneCardFullDataBack";

export interface IOneCardFullData {  //:IOneCardInListData??
    Id: number;
    Title: string;
    Body: string;
    Image?: string;
    Followed: boolean;

    FillByBackModel(newData: IOneCardFullDataBack): void;
}


export class OneCardFullData implements IOneCardFullData{
    Id: number;
    Title: string;
    Body: string;
    Image?: string;
    Followed: boolean;

    FillByBackModel(newData: IOneCardFullDataBack): void {
       this.Id = newData.id;
       this.Title = newData.title;
       this.Body = newData.body;
       this.Image = newData.main_image_path;
       this.Followed = newData.followed;
    }


}
