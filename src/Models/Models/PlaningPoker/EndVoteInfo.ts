import { IEndVoteInfoReturn, IEndVoteUserInfoReturn } from "../../BackModel/PlaningPoker/EndVoteInfoReturn";
import { MappedWithBack } from "../../BL/Interfaces/MappedWithBack";


export class EndVoteUserInfo implements MappedWithBack<IEndVoteUserInfoReturn>{

    Id: string;
    Vote: string;//number|string

    FillByBackModel(newData: IEndVoteUserInfoReturn): void {
        this.Id = newData.id;
        this.Vote = newData.vote;
    }
}


export class EndVoteInfo implements MappedWithBack<IEndVoteInfoReturn>{
    UsersInfo: EndVoteUserInfo[];
    AverageVote: number;//double
    MinVote: number;
    MaxVote: number;

    constructor() {
        this.UsersInfo = [];
        this.AverageVote = 0;
        this.MinVote = 0;
        this.MaxVote = 0;
    }

    FillByBackModel(newData: IEndVoteInfoReturn): void {
        if (newData == null) {
            return;
        }
        this.AverageVote = newData.average_vote;
        this.MinVote = newData.min_vote;
        this.MaxVote = newData.max_vote;
        this.UsersInfo = newData.users_info.map(x => {
            let y = new EndVoteUserInfo();
            y.FillByBackModel(x);
            return y;
        });

    }

}

