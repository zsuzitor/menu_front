
import { IWordListBack } from "../../BackModel/WordCardApp/WordListBack";
import { MappedWithBack } from "../../BL/Interfaces/MappedWithBack";


export class OneWordList implements  MappedWithBack<IWordListBack>  {
    Id: number;
    Title: string;

    FillByBackModel(newData: IWordListBack): void {
        this.Id = newData.id;
        this.Title = newData.title;
        
    }
}