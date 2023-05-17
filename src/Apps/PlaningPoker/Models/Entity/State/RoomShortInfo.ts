import { MappedWithBack } from "../../../../../Models/BL/Interfaces/MappedWithBack";
import { IRoomShortInfoReturn } from "../../BackModels/IRoomShortInfoReturn";

export class RoomShortInfo implements MappedWithBack<IRoomShortInfoReturn>{
    Name: string;
    ImagePath: string;

    constructor() {
        this.Name = "";
        this.ImagePath = "";
    }
    FillByBackModel(newData: IRoomShortInfoReturn): void {
        this.Name = newData.roomname;
        this.ImagePath = newData.image_path;

    }
}

