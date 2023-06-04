

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
}