
import { IOneCardFullDataBack } from "../../BackModel/MenuApp/OneCardFullDataBack";
import { MappedWithBack } from "../../BL/Interfaces/MappedWithBack";
import { CustomImage } from "../CustomImage";

export interface IOneCardFullData extends MappedWithBack<IOneCardFullDataBack> {
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
        this.AdditionalImages = newData.additional_images.map(x => {//какая то проверка мб? что бы массив был в любом случае не null
            let res = new CustomImage();
            res.FillByBackModel(x);
            return res;
        });
    }


}
