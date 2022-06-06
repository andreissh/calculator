const handleSubmit = ([e, command, input, output, text]) => {
    e.preventDefault();
    const op = command.current.value;
    output.current.value = "";

    if (op.match(/^var [$a-zA-Z][$\w]*$/)) {
        const type = op.slice(0, 3);
        const id = op.slice(4);
        text._input = `${type} ${id}`;
        if (!Object.keys(text).includes(id)) {
            text.addVar(id);
            input.current.value += text._input + "\n";
        } else output.current.value = "Такая переменная уже объявлена!";
    } else if (op.match(/^let [$a-zA-Z][$\w]*=([$_a-zA-Z][$\w]*|[0-9]+(\.[0-9]+)?)$/)) {
        const type = op.slice(0, 3);
        const arr = op.slice(4).split("=");
        const [id, value] = arr;
        text._input = `${type} ${id} = ${value}`;
        if (Object.keys(text).includes(id) && typeof text[id] === "function") {
            output.current.value = "Функция с таким названием уже объявлена!";
        } else {
            let response = text.addValue(id, value);
            if (response !== false) {
                input.current.value += text._input + "\n";
            } else output.current.value = "Переменная не объявлена!";
        }
    } else if (
        op.match(
            /^fn [$a-zA-Z][$\w]*=([$_a-zA-Z][$\w]*|[0-9]+(\.[0-9]+)?)([+\-*/]([$_a-zA-Z][$\w]*|[0-9]+(\.[0-9]+)?))?$/
        )
    ) {
        const type = op.slice(0, 2);
        let arr = op.slice(3).split("=");
        const id = arr[0];
        const value = /[+\-*/]/.test(arr[1]) ? arr[1].replace(/([$\w]+)([+\-*/])([$\w]+)/, "$1 $2 $3") : arr[1];
        text._input = `${type} ${id} = ${value}`;
        if (Object.keys(text).includes(id)) output.current.value = "Такое название функции уже используется!";
        else {
            let response = text.addFunction(id, value);
            if (response !== false) {
                input.current.value += text._input + "\n";
            } else output.current.value = "Переменная не объявлена!";
        }
    } else if (op.match(/^print [$a-zA-Z][$\w]*$/)) {
        const type = op.slice(0, 5);
        const id = op.slice(6);
        text._input = `${type} ${id}`;
        if (Object.keys(text).includes(id)) {
            input.current.value += text._input + "\n";
            output.current.value = typeof text[id] === "function" ? text.printFunction(id) : text.printValue(id);
        } else output.current.value = "Идентификатор с таким названием не объявлен!";
    } else if (op === "printvars") {
        const keys = Object.keys(text).filter((key) => !/^_/.test(key));
        const varKeysSorted = keys.filter((key) => typeof text[key] !== "function").sort();
        for (let key of varKeysSorted) {
            output.current.value += `${key}:${text.printValue(key)}\n`;
        }
    } else if (op === "printfns") {
        const keys = Object.keys(text).filter((key) => !/^_/.test(key));
        const fnKeysSorted = keys.filter((key) => typeof text[key] === "function").sort();
        for (let key of fnKeysSorted) {
            output.current.value += `${key}:${text.printFunction(key)}\n`;
        }
    } else output.current.value = "Некорректно введены данные!";
    console.log(text);
};

export default handleSubmit;
