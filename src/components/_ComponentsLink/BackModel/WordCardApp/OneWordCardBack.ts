


export interface IWordCardWordList {
    id_list: number;
    id_word: number;
}


export interface IOneWordCardBack {
    id: number;
    image_path: string;
    word: string;
    word_answer: string;
    hided: boolean;
    description: string;
    user_id: string;
    lists: IWordCardWordList[];
}