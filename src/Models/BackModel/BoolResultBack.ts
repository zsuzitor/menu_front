


export class BoolResultBack {
    result: boolean;

    static GetTrue() {
        let res = new BoolResultBack();
        res.result = true;
        return res;
    }

    static GetFalse() {
        let res = new BoolResultBack();
        res.result = false;
        return res;
    }
}


export class StringResultBack {
    result: string;

}


