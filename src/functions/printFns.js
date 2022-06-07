export const printFns = (output, calc) => {
    const keys = Object.keys(calc).filter((key) => !/^_/.test(key));
    const fnKeysSorted = keys.filter((key) => typeof calc[key] === "function").sort();
    for (let key of fnKeysSorted) {
        output.current.value += `${key}:${calc.printFunction(key)}\n`;
    }
};
