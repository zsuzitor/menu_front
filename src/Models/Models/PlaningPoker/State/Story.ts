import { IStoryReturn } from "../../../BackModel/PlaningPoker/StoryReturn";
import { MappedWithBack } from "../../../BL/Interfaces/MappedWithBack";

export class Story implements MappedWithBack<IStoryReturn>{
    Id: string;
    // InitWithServer: boolean;
    Name: string;
    Description: string;
    Completed: boolean;
    ThisSession: boolean;

    Vote?: number;
    Date?: string;


    constructor() {
        this.Id = "";
        // this.InitWithServer = false;
        this.Name = "";
        this.Description = "";
        this.Vote = null;
        this.Date = null;
        this.Completed = false;
        this.ThisSession = true;
    }


    FillByBackModel(newData: IStoryReturn): void {
        this.Id = newData.id;
        this.Name = newData.name;
        this.Description = newData.description;
        this.Vote = newData.vote;
        this.Date = newData.date;
        this.Completed = newData.completed;
        this.ThisSession = newData.current_session;
    }
}