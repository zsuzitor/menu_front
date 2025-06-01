import { MappedWithBack } from "../../../../Models/BL/Interfaces/MappedWithBack";
import { IOneWorkTaskCommentDataBack } from "../BackModels/IOneWorkTaskCommentDataBack";


export class OneWorkTaskComment implements MappedWithBack<IOneWorkTaskCommentDataBack>{
    Id: number;
    CreatorId: number;
    Text: string;
    CreateDate: string;

    FillByBackModel(newData: IOneWorkTaskCommentDataBack): OneWorkTaskComment {
        this.Id = newData.Id;
        this.CreatorId = newData.CreatorId;
        this.Text = newData.Text;
        this.CreateDate = newData.CreateDate;
        return this;
    }

    FillByOneTaskReviewComment(newData: OneWorkTaskComment): OneWorkTaskComment {
        this.Id = newData.Id;
        this.CreatorId = newData.CreatorId;
        this.Text = newData.Text;
        this.CreateDate = newData.CreateDate;
        return this;
    }


}