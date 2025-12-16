
export interface ITaskFilter {
    ProjectId: number;
    Name: string;
    CreatorId: number;
    ExecutorId: number;
    StatusId: number;
    PresetId: number;
    PageNumber: number;
    PageSize: number;
    SprintId: number;
    LabelIds: number[];
}
