
import { IProjectSprintDataBack } from "../../BackModels/IProjectSprintDataBack";


export class ProjectSprint {
    Id: number;
    Name: string;

    constructor() {
    }

    


    FillByIProjectSprintDataBack(data: IProjectSprintDataBack): ProjectSprint {
        this.Id = data.Id;
        this.Name = data.Name;

        return this;
    }
}
