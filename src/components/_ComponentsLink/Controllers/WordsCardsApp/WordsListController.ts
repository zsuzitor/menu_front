


export interface IWordsListController {
    GetAllForUser: (model: any, onSuccess: OnlyError) => void;
    Create: (model: any, onSuccess: OnlyError) => void;
    RemoveFromList: (model: any, onSuccess: OnlyError) => void;
    AddToList: (model: any, onSuccess: OnlyError) => void;
    Delete: (model: any, onSuccess: OnlyError) => void;
    Update: (model: any, onSuccess: OnlyError) => void;

}