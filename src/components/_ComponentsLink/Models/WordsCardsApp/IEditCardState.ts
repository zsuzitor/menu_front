export interface IEditCardState{
    Id: number;
    ImagePath: string;
    Word: string;
    WordAnswer: string;
    Description: string;
    NeedDeleteMainImage: boolean;
    
    // AdditionalImagesForRemove: number[];
    // AdditionalImagesEdit: CustomImageEdit[];
    MainImageSave?: File;//не хранится тут, проставляется при редактировании
}