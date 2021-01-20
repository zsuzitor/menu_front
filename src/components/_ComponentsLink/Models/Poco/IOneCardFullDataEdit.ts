

export interface IOneCardFullDataEdit { 
    Id: number;
    Title: string;
    Body: string;
    MainImage?: File;//не хранится тут, проставляется при редактировании
    NeedDeleteMainImage: boolean;
}

