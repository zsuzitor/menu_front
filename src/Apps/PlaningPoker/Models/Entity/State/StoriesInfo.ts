import { Story } from "./Story";

export class StoriesInfo {
    Stories: Story[];

    CurrentStoryId: string;
    // CurrentStoryNameChange: string;
    // CurrentStoryDescriptionChange: string;


    constructor() {
        this.Stories = [];
        this.CurrentStoryId = "";
        // this.CurrentStoryNameChange = "";
        // this.CurrentStoryDescriptionChange = "";
    }
}