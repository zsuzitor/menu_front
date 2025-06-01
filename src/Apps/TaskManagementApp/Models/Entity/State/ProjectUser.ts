import { MappedWithBack } from "../../../../../Models/BL/Interfaces/MappedWithBack";
import { IProjectUserDataBack } from "../../BackModels/IProjectUserDataBack";


export class ProjectUser implements MappedWithBack<IProjectUserDataBack>{
    Id: number;
    Name: string;
    Email: string;
    IsAdmin: boolean;
    MainAppUserId?: number;
    Deactivated: boolean;

    FillByBackModel(newData: IProjectUserDataBack): void {
        this.Id = newData.Id;
        this.Name = newData.Name;
        this.Email = newData.Email;
        this.IsAdmin = newData.IsAdmin;
        this.MainAppUserId = newData.MainAppUserId;
        this.Deactivated = newData.Deactivated;
    }



}