import React, { useRef } from "react";
import Calc from "../classes/Calc";
import { handleSubmit } from "../functions/submitHandler";
import styles from "../styles/Main.module.scss";

const Main = () => {
    const command = useRef();
    const input = useRef();
    const output = useRef();

    const calc = new Calc(command);

    const data = [command, input, output, calc];

    return (
        <div className={styles.innerContent}>
            <h1>Calculator</h1>
            <div className={styles.calcWrapper}>
                <form
                    className={styles.commandBlock}
                    onSubmit={(e) => {
                        handleSubmit(e, ...data);
                        command.current.value = "";
                    }}
                >
                    <div className={styles.commandInputWrapper}>
                        <label className={styles.commandLabel} htmlFor="command">
                            Command:
                        </label>
                        <input id="#command" className={styles.commandInput} ref={command}></input>
                    </div>
                    <button className={styles.btn}>Submit</button>
                </form>
                <div className={styles.inputOutputBlock}>
                    <div className={styles.inputBlock}>
                        <label className={styles.inputLabel} htmlFor="input">
                            Input:
                        </label>
                        <textarea id="#input" className={styles.inputArea} ref={input}></textarea>
                    </div>
                    <div className={styles.outputBlock}>
                        <label className={styles.outputLabel} htmlFor="output">
                            Output:
                        </label>
                        <textarea id="#output" className={styles.outputArea} ref={output}></textarea>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;
