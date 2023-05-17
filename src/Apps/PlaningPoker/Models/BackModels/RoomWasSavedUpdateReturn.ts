



export interface IRoomWasSavedUpdateReturn {
    success: boolean;
    stories_mapping: IStoryMappingReturn[];
}

export interface IStoryMappingReturn {
    old_id: string;
    new_id: number;
}