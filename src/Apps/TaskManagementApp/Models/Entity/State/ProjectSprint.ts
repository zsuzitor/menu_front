
import { IProjectSprintDataBack } from "../../BackModels/IProjectSprintDataBack";


export class ProjectSprint {
    Id: number;
    Name: string;
    ProjectId: number;
    StartDate: Date;
    EndDate: Date;

    constructor() {
    }




    FillByIProjectSprintDataBack(data: IProjectSprintDataBack): ProjectSprint {
        this.Id = data.Id;
        this.Name = data.Name;
        this.ProjectId = data.ProjectId;
        this.StartDate = new Date(data.StartDate);
        this.EndDate = new Date(data.EndDate);
        return this;
    }
}
