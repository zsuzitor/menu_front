
import { IProjectSprintDataBack } from "../../BackModels/IProjectSprintDataBack";


export class ProjectSprint {
    Id: number;
    Name: string;
    ProjectId: number;

    constructor() {
    }




    FillByIProjectSprintDataBack(data: IProjectSprintDataBack): ProjectSprint {
        this.Id = data.Id;
        this.Name = data.Name;
        this.ProjectId = data.ProjectId;
        return this;
    }
}
