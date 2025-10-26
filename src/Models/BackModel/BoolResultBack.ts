

//разница в регистре ответа
export class BoolResultBackNew {
    Result: boolean;

    static GetTrue() {
        let res = new BoolResultBackNew();
        res.Result = true;
        return res;
    }

    static GetFalse() {
        let res = new BoolResultBackNew();
        res.Result = false;
        return res;
    }
}

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


