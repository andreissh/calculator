export default class Calc {
    constructor(input) {
        this._input = input;
        this._operations = {
            "+": (arg1, arg2) => arg1 + arg2,
            "-": (arg1, arg2) => arg1 - arg2,
            "*": (arg1, arg2) => arg1 * arg2,
            "/": (arg1, arg2) => arg1 / arg2,
        };
    }

    addVar(id) {
        this[id] = undefined;
    }

    addValue(id, value) {
        if (!Number.isNaN(+value)) this[id] = value;
        else {
            if (Object.keys(this).includes(value)) {
                typeof this[value] === "function" ? (this[id] = this[value]()) : (this[id] = this[value]);
            } else return false;
        }
    }

    addFunction(id, value) {
        let operators = new RegExp(/[+\-*/]/);
        if (!operators.test(value)) {
            if (!Number.isNaN(+value)) {
                this[id] = () => (+value).toFixed(2);
            } else {
                if (Object.keys(this).includes(value)) {
                    typeof this[value] === "function"
                        ? (this[id] = () => this[value]())
                        : (this[id] = () => (+this[value]).toFixed(2));
                } else return false;
            }
        } else {
            let op = value.split(" ");
            this[id] = () =>
                this.calcFuncValue(
                    Object.keys(this).includes(op[0]) ? this[op[0]] : op[0],
                    op[1],
                    Object.keys(this).includes(op[2]) ? this[op[2]] : op[2]
                );
        }
    }

    printValue(id) {
        return (+this[id]).toFixed(2);
    }

    printFunction(id) {
        return this[id]();
    }

    calcFuncValue(arg1, op, arg2) {
        if (typeof arg1 === "function") arg1 = arg1();
        if (typeof arg2 === "function") arg2 = arg2();
        return this._operations[op](+arg1, +arg2).toFixed(2);
    }
}
