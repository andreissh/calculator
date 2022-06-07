export const setValue = ([op, input, output, calc]) => {
    const type = op.slice(0, 3);
    const arr = op.slice(4).split("=");
    const [id, value] = arr;
    calc._input = `${type} ${id} = ${value}`;
    if (Object.keys(calc).includes(id) && typeof calc[id] === "function") {
        output.current.value = "Функция с таким названием уже объявлена!";
    } else {
        let response = calc.addValue(id, value);
        if (response !== false) {
            input.current.value += calc._input + "\n";
        } else output.current.value = "Переменная не объявлена!";
    }
};
