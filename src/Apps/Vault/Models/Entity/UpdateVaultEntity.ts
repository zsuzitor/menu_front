
export class UpdateVaultEntity {
    Id: number;
    Name: string;
    IsPublic: boolean;
    Password: string;

    UsersForDelete: number[];
    UsersForAdd: string[];

    constructor() {
        this.UsersForAdd = [];
        this.UsersForDelete = [];
    }
}
