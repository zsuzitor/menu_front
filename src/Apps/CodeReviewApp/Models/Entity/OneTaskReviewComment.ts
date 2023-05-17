import { MappedWithBack } from "../../../../Models/BL/Interfaces/MappedWithBack";
import { IOneTaskReviewCommentDataBack } from "../BackModels/IOneTaskReviewCommentDataBack";


export class OneTaskReviewComment implements MappedWithBack<IOneTaskReviewCommentDataBack>{
    Id: number;
    CreatorId: number;
    Text: string;
    CreateDate: string;

    FillByBackModel(newData: IOneTaskReviewCommentDataBack): void {
        this.Id = newData.Id;
        this.CreatorId = newData.CreatorId;
        this.Text = newData.Text;
        this.CreateDate = newData.CreateDate;
    }



}