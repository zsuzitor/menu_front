import { MappedWithBack } from "../../../../Models/BL/Interfaces/MappedWithBack";
import { IWordListBack } from "../BackModels/WordListBack";



export class OneWordList implements  MappedWithBack<IWordListBack>  {
    Id: number;
    Title: string;

    FillByBackModel(newData: IWordListBack): void {
        this.Id = newData.id;
        this.Title = newData.title;
        
    }
}