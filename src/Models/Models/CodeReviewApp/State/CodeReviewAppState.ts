import { IOneProjectInListDataBack } from "../../../BackModel/CodeReviewApp/IOneProjectInListDataBack";
import { IProjectUserDataBack } from "../../../BackModel/CodeReviewApp/IProjectUserDataBack";


export class CodeReviewAppState {
    CurrentProjectId: number;
    ProjectsList: IOneProjectInListDataBack[];
    CurrentProjectUsers: IProjectUserDataBack[];


    constructor() {
        this.CurrentProjectId = -1;
        this.ProjectsList = [];
        this.CurrentProjectUsers = [];
    }
}