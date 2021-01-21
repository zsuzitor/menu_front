import { CustomImageEdit } from "../../../Body/OneCardDetail/AdditionalImages";


export interface IOneCardFullDataEdit {
    Id: number;
    Title: string;
    Body: string;
    NeedDeleteMainImage: boolean;
    MainImageSave?: File;//не хранится тут, проставляется при редактировании
    AdditionalImagesSave?: File[];//не хранится тут, проставляется при редактировании
    // AdditionalImagesForRemove: number[];
    AdditionalImagesEdit: CustomImageEdit[];

}

export class OneCardFullDataEdit implements IOneCardFullDataEdit {
    Id: number;
    Title: string;
    Body: string;
    NeedDeleteMainImage: boolean;
    MainImageSave?: File;//не хранится тут, проставляется при редактировании
    AdditionalImagesSave?: File[];//не хранится тут, проставляется при редактировании
    // AdditionalImagesForRemove: number[];
    AdditionalImagesEdit: CustomImageEdit[];

    constructor() {
        this.AdditionalImagesSave = [];
        // this.AdditionalImagesForRemove = [];
        this.AdditionalImagesEdit = [];

    }
}

