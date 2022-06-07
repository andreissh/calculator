export const printValue = ([op, input, output, calc]) => {
    const type = op.slice(0, 5);
    const id = op.slice(6);
    calc._input = `${type} ${id}`;
    if (Object.keys(calc).includes(id)) {
        input.current.value += calc._input + "\n";
        output.current.value = typeof calc[id] === "function" ? calc.printFunction(id) : calc.printValue(id);
    } else output.current.value = "Идентификатор с таким названием не объявлен!";
};
