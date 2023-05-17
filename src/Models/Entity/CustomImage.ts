import { CustomImageBack } from "../BackModel/CustomImageBack";
import { MappedWithBack } from "../BL/Interfaces/MappedWithBack";


export interface ICustomImage extends MappedWithBack<CustomImageBack>  {
    Id: number;
    Path: string;
    ArticleId?: number;

    FillByBackModel(newData: CustomImageBack): void;
}


export class CustomImage implements ICustomImage {
    Id: number;
    Path: string;
    ArticleId?: number;

    FillByBackModel(newData: CustomImageBack): void {
        this.Id = newData.id;
        this.Path = newData.path;
        this.ArticleId = newData.article_id;
    }
}