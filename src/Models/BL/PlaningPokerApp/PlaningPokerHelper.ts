//TODO временно, хелперы под выпил

import { Story, UserInRoom } from "../../Models/PlaningPoker/RoomInfo";


export class PlaningPokerHelper {
    GetUserIndexById(users: UserInRoom[], userId: string): number {
        if (!users || !userId) {
            return -1;
        }

        return users.findIndex(x => x.Id === userId);
    }

    GetUserById(users: UserInRoom[], userId: string): UserInRoom {
        let index = this.GetUserIndexById(users, userId);
        if (index < 0 || index >= users.length) {
            return null;
        }

        return users[index];
    }

    CurrentUserIsAdmin(users: UserInRoom[], userId: string): boolean {
        let user = this.GetUserById(users, userId);
        if (user && user.IsAdmin()) {
            return true;
        }

        return false;
    }



    CurrentUserCanVote(users: UserInRoom[], userId: string): boolean {
        let user = this.GetUserById(users, userId);
        if (user && user.CanVote()) {
            return true;
        }

        return false;
    }
}




export class StoriesHelper {
    GetStoryIndexById = (stories: Story[], storyId: string): number => {
        if (!storyId) {
            return -1;
        }

        let index = stories.findIndex(x => x.Id === storyId);
        if (index < 0 || index >= stories.length) {
            return -1;
        }

        return index;
    }

    GetStoryById = (stories: Story[], storyId: string): Story => {
        let index = this.GetStoryIndexById(stories, storyId);
        if (index < 0) {
            return;
        }

        return stories[index];
    }
}