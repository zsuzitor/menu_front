


export interface IWordsCardsController {
    GetAllForUser: (model: any, onSuccess: OnlyError) => void;
    Create: (model: any, onSuccess: OnlyError) => void;
    CreateList: (model: any, onSuccess: OnlyError) => void;
    Delete: (model: any, onSuccess: OnlyError) => void;
    Update: (model: any, onSuccess: OnlyError) => void;
    Hide: (model: any, onSuccess: OnlyError) => void;
    CreateFromFile: (model: any, onSuccess: OnlyError) => void;
    DownloadAllWordsFile: (model: any, onSuccess: OnlyError) => void;
}