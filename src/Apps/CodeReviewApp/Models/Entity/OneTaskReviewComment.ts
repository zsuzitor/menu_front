import { MappedWithBack } from "../../../../Models/BL/Interfaces/MappedWithBack";
import { IOneTaskReviewCommentDataBack } from "../BackModels/IOneTaskReviewCommentDataBack";


export class OneTaskReviewComment implements MappedWithBack<IOneTaskReviewCommentDataBack>{
    Id: number;
    CreatorId: number;
    Text: string;
    CreateDate: string;

    FillByBackModel(newData: IOneTaskReviewCommentDataBack): OneTaskReviewComment {
        this.Id = newData.Id;
        this.CreatorId = newData.CreatorId;
        this.Text = newData.Text;
        this.CreateDate = newData.CreateDate;
        return this;
    }

    FillByOneTaskReviewComment(newData: OneTaskReviewComment): OneTaskReviewComment {
        this.Id = newData.Id;
        this.CreatorId = newData.CreatorId;
        this.Text = newData.Text;
        this.CreateDate = newData.CreateDate;
        return this;
    }


}