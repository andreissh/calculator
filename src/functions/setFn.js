export const setFn = (op, input, output, calc) => {
    const type = op.slice(0, 2);
    const entries = op.slice(3).split("=");
    const id = entries[0];
    const value = /[+\-*/]/.test(entries[1]) ? entries[1].replace(/([$\w]+)([+\-*/])([$\w]+)/, "$1 $2 $3") : entries[1];
    calc._input = `${type} ${id} = ${value}`;
    if (Object.keys(calc).includes(id)) output.current.value = "Такое название функции уже используется!";
    else {
        const response = calc.addFunction(id, value);
        if (response !== false) {
            input.current.value += calc._input + "\n";
        } else output.current.value = "Переменная не объявлена!";
    }
};
