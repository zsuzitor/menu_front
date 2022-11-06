import { IOneTaskReviewCommentDataBack } from "../../BackModel/CodeReviewApp/IOneTaskReviewCommentDataBack";
import { MappedWithBack } from "../../BL/Interfaces/MappedWithBack";


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