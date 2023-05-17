import { MappedWithBack } from "../../../../Models/BL/Interfaces/MappedWithBack";
import { IWordCardWordList } from "../BackModels/OneWordCardBack";


export class WordCardWordList implements MappedWithBack<IWordCardWordList>  {
    IdList: number;
    IdWord: number;

    FillByBackModel(newData: IWordCardWordList): void {
        this.IdList = newData.id_list;
        this.IdWord = newData.id_word;
    }
}