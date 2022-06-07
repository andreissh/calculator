export const printVars = (output, calc) => {
    const keys = Object.keys(calc).filter((key) => !/^_/.test(key));
    const varKeysSorted = keys.filter((key) => typeof calc[key] !== "function").sort();
    for (let key of varKeysSorted) {
        output.current.value += `${key}:${calc.printValue(key)}\n`;
    }
};
