export const setVar = (op, input, output, calc) => {
    const type = op.slice(0, 3);
    const id = op.slice(4);
    calc._input = `${type} ${id}`;
    if (!Object.keys(calc).includes(id)) {
        calc.addVar(id);
        input.current.value += calc._input + "\n";
    } else output.current.value = "Такая переменная уже объявлена!";
};
