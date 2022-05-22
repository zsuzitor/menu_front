import { IWordCardWordList } from "../../BackModel/WordCardApp/OneWordCardBack";
import { MappedWithBack } from "../../BL/Interfaces/MappedWithBack";


export class WordCardWordList implements MappedWithBack<IWordCardWordList>  {
    IdList: number;
    IdWord: number;

    FillByBackModel(newData: IWordCardWordList): void {
        this.IdList = newData.id_list;
        this.IdWord = newData.id_word;
    }
}