import { IOneWordCardBack } from "../../BackModel/WordCardApp/OneWordCardBack";
import { MappedWithBack } from "../../BL/Interfaces/MappedWithBack";


export class OneWordCard implements  MappedWithBack<IOneWordCardBack>  {
    Id: number;
    ImagePath: string;
    Word: string;
    WordAnswer: string;
    Hided: boolean;
    Description: string;
    UserId: string;

    FillByBackModel(newData: IOneWordCardBack): void {
        this.Id = newData.id;
        this.ImagePath = newData.image_path;
        this.Word = newData.word;
        this.WordAnswer = newData.word_answer;
        this.Hided = newData.hided;
        this.Description = newData.description;
        this.UserId = newData.user_id;
        
    }
}