import { OneTask } from "../../Apps/TaskManagementApp/Models/Entity/State/OneTask";
import { AppState } from "../Entity/State/AppState";


export class Helper {

    DateToYMD(date: Date) {
        if (!date) {
            return null;
        }

        var d = date.getDate();
        var m = date.getMonth() + 1; //Month from 0 to 11
        var y = date.getFullYear();
        return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
    }

    addZeroIfNumShort(num: number) {
        let numStr = (num + '');
        if (numStr.length > 1) {
            return num;
        }

        return '0' + numStr;
    }

    async CopyText(text: string) {
        if (!navigator.clipboard) {
            // if (true) {
            this.fallbackCopyTextToClipboard(text);
            return;
        }

        await navigator.clipboard.writeText(text);
        // navigator.clipboard.writeText(text).then(function () {
        //     console.log('Async: Copying to clipboard was successful!');
        // }, function (err) {
        //     console.error('Async: Could not copy text: ', err);
        // });
    }

    private fallbackCopyTextToClipboard(text: string): boolean {
        var textArea = document.createElement("textarea");
        textArea.value = text;

        // Avoid scrolling to bottom
        textArea.style.top = "-100";
        textArea.style.left = "-100";
        textArea.style.position = "absolute";
        textArea.style.opacity = '0';

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        let retult = false;
        try {
            var successful = document.execCommand('copy');
            retult = true;
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
        }

        document.body.removeChild(textArea);
        return retult;
    }


    GetTaskFromState(state: AppState, taskId: number): OneTask[] {
        //todo куда то вынести
        let res: OneTask[] = [];
        if (taskId < 1) {
            return res;
        }
        let taskfromProject = state.TaskManagementApp.CurrentProjectTasks.find(x => x.Id === taskId);
        if (taskfromProject) {
            res.push(taskfromProject);
        }

        if (state.TaskManagementApp.CurrentTask?.Id == taskId) {
            res.push(state.TaskManagementApp.CurrentTask);
        }

        return res;
    }


    GetIndexById<t extends { Id: tId },tId>(arr: t[], id: tId): number {
        if (!id) {
            return -1;
        }

        let index = arr.findIndex(x => x.Id === id);
        if (index < 0 || index >= arr.length) {
            return -1;
        }

        return index;
    }

    GetElemById<t extends { Id: tId },tId>(arr: t[], id: tId): t{
        let index = this.GetIndexById(arr, id);
        if (index < 0) {
            return;
        }

        return arr[index];
    }
}