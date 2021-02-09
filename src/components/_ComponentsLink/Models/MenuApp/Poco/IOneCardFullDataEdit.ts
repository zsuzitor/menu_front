import { CustomImageEdit } from "../../../../Body/MenuApp/OneCardDetail/AdditionalImages";


export interface IOneCardFullDataEdit {
    Id: number;
    Title: string;
    Body: string;
    NeedDeleteMainImage: boolean;
    
    // AdditionalImagesForRemove: number[];
    // AdditionalImagesEdit: CustomImageEdit[];
    MainImageSave?: File;//не хранится тут, проставляется при редактировании
    AdditionalImagesSave?: File[];//не хранится тут, проставляется при редактировании

}

export class OneCardFullDataEdit implements IOneCardFullDataEdit {
    Id: number;
    Title: string;
    Body: string;
    NeedDeleteMainImage: boolean;
    // AdditionalImagesForRemove: number[];
    // AdditionalImagesEdit: CustomImageEdit[];

    MainImageSave?: File;//не хранится тут, проставляется при редактировании
    AdditionalImagesSave?: File[];//не хранится тут, проставляется при редактировании

    constructor() {
        this.AdditionalImagesSave = [];
        // this.AdditionalImagesForRemove = [];
        // this.AdditionalImagesEdit = [];

    }
}

