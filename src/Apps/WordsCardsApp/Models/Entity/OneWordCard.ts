import { MappedWithBack } from "../../../../Models/BL/Interfaces/MappedWithBack";
import { IOneWordCardBack } from "../BackModels/OneWordCardBack";
import { WordCardWordList } from "./WordCardWordList";


export class OneWordCard implements MappedWithBack<IOneWordCardBack>  {
    Id: number;
    ImagePath: string;
    Word: string;
    WordAnswer: string;
    Hided: boolean;
    Description: string;
    UserId: string;
    Lists: WordCardWordList[];

    FillByBackModel(newData: IOneWordCardBack): void {
        this.Id = newData.id;
        this.ImagePath = newData.image_path;
        this.Word = newData.word;
        this.WordAnswer = newData.word_answer;
        this.Hided = newData.hided;
        this.Description = newData.description;
        this.UserId = newData.user_id;
        this.Lists = newData.lists.map(x => {
            let lst = new WordCardWordList();
            lst.FillByBackModel(x);
            return lst;
        });
    }
}