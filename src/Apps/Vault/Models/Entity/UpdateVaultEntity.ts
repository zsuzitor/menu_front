
export class UpdateVaultEntity {
    Id: number;
    Name: string;
    IsPublic: boolean;

    UsersForDelete: number[];
    UsersForAdd: string[];

    constructor() {
        this.UsersForAdd = [];
        this.UsersForDelete = [];
    }
}
