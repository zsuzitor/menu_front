import { IRoomShortInfoReturn } from "../../../BackModel/PlaningPoker/IRoomShortInfoReturn";
import { MappedWithBack } from "../../../BL/Interfaces/MappedWithBack";

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

