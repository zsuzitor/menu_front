import { IEndVoteInfoReturn } from "../../../BackModel/PlaningPoker/EndVoteInfoReturn";
import { MappedWithBack } from "../../../BL/Interfaces/MappedWithBack";
import { EndVoteInfo } from "../EndVoteInfo";

export class VoteInfo implements MappedWithBack<IEndVoteInfoReturn>{
    MaxVote: number;
    MinVote: number;
    AverageVote: number;
    AllAreVoted: boolean;
    constructor() {
        this.MaxVote = 0;
        this.MinVote = 0;
        this.AverageVote = 0;
        this.AllAreVoted = false;
    }

    FillByBackModel(newData: IEndVoteInfoReturn): void {
        this.MaxVote = newData.max_vote;
        this.MinVote = newData.min_vote;
        this.AverageVote = newData.average_vote;
        this.AllAreVoted = false;
    }

    FillByEndVoteInfo(newData: EndVoteInfo): void {
        this.MaxVote = newData.MaxVote;
        this.MinVote = newData.MinVote;
        this.AverageVote = newData.AverageVote;
        this.AllAreVoted = false;
    }

    
}