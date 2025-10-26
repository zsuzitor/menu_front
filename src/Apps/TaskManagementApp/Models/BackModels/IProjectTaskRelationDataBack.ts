export interface IProjectTaskRelationDataBack {
    Id: number;
    SubWorkTaskId: number;
    MainWorkTaskId: number;
    // SubTask = 1, Link = 2,
    RelationType: number;

}