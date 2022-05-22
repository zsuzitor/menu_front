import { CustomImageBack } from "../CustomImageBack";


export interface IOneCardFullDataBack {
    id: number;
    title: string;
    body: string;
    main_image_path: string;
    followed: boolean;
    additional_images: CustomImageBack[];
}