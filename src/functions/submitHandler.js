import { printFns } from "./printFns";
import { printValue } from "./printValue";
import { printVars } from "./printVars";
import { setFn } from "./setFn";
import { setValue } from "./setValue";
import { setVar } from "./setVar";

export const handleSubmit = (e, command, input, output, calc) => {
    e.preventDefault();
    const op = command.current.value;
    const data = [op, input, output, calc];
    output.current.value = "";

    if (op.match(/^var [$a-zA-Z][$\w]*$/)) {
        setVar(data);
    } else if (op.match(/^let [$a-zA-Z][$\w]*=([$_a-zA-Z][$\w]*|[0-9]+(\.[0-9]+)?)$/)) {
        setValue(data);
    } else if (
        op.match(
            /^fn [$a-zA-Z][$\w]*=([$_a-zA-Z][$\w]*|[0-9]+(\.[0-9]+)?)([+\-*/]([$_a-zA-Z][$\w]*|[0-9]+(\.[0-9]+)?))?$/
        )
    ) {
        setFn(data);
    } else if (op.match(/^print [$a-zA-Z][$\w]*$/)) {
        printValue(data);
    } else if (op === "printvars") {
        printVars(output, calc);
    } else if (op === "printfns") {
        printFns(output, calc);
    } else output.current.value = "Некорректно введены данные!";
};
