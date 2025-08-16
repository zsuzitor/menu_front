import { OneTask } from "../../Apps/TaskManagementApp/Models/Entity/State/OneTask";
import { AppState } from "../Entity/State/AppState";


export class Helper {

    //получить часы из даты, из Sat Aug 16 2025 22:12:47 GMT+0300 (Москва, стандартное время) вернет 22 часа
    GetHours(date: Date) {
        return date.getHours();
    }

    //получить минуты из даты, из Sat Aug 16 2025 22:12:47 GMT+0300 (Москва, стандартное время) вернет 12 минут
    GetMinutes(date: Date) {
        return date.getMinutes();
    }

    DateToGetHM(date: Date) {
        return `${this.GetHours(date)}:${this.GetMinutes(date)}`;
    }

    GetDateWithoutTime = (date: Date): Date => {
        const newDate = new Date(date);
        newDate.setHours(0, 0, 0, 0);
        return newDate;
    };

    MinutesToHours(minutes: number) {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;

        let result = '';

        if (hours > 0) {
            result += `${hours}:h`;
        }

        if (remainingMinutes > 0) {
            if (result)
                result += ' ';
            result += `${remainingMinutes}:m`;
        }

        return result || '0';
    }

    DateToYMD(date: Date) {
        if (!date) {
            return null;
        }

        var d = date.getDate();
        var m = date.getMonth() + 1; //Month from 0 to 11
        var y = date.getFullYear();
        return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
    }

    FormatDateToInput(date: Date): string {

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    FormatDateToDM(date: Date): string {

        // const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${day}-${month}`;
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



    GetIndexById1(arr: any[], f: (x: any) => number): number {
        return arr.findIndex(f);
    }

    GetIndexById<t extends { Id: tId }, tId>(arr: t[], id: tId): number {
        if (!id) {
            return -1;
        }

        let index = arr.findIndex(x => x.Id === id);
        if (index < 0 || index >= arr.length) {
            return -1;
        }

        return index;
    }

    GetElemById<t extends { Id: tId }, tId>(arr: t[], id: tId): t {
        let index = this.GetIndexById(arr, id);
        if (index < 0) {
            return;
        }

        return arr[index];
    }
}