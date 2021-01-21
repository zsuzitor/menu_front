

export interface IOneCardFullDataEdit {
    Id: number;
    Title: string;
    Body: string;
    NeedDeleteMainImage: boolean;
    MainImage?: File;//не хранится тут, проставляется при редактировании
    AdditionalImages?: File[];//не хранится тут, проставляется при редактировании


}

export class OneCardFullDataEdit implements IOneCardFullDataEdit {
    Id: number;
    Title: string;
    Body: string;
    NeedDeleteMainImage: boolean;
    MainImage?: File;//не хранится тут, проставляется при редактировании
    AdditionalImages?: File[];//не хранится тут, проставляется при редактировании

    constructor() {
        this.AdditionalImages = [];

    }
}

