'use client';
import { JSX, useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";

const random_num: number = Math.floor(Math.random() * 101);
export default function Medium(): JSX.Element {
    const [num, set_num] = useState<number>(random_num);
    const [counter, set_counter] = useState<number>(6);
    const [wins, set_wins] = useState<number>(0);
    const [loses, set_loses] = useState<number>(0);
    const [player_status, set_player_status] = useState<string>("");
    const inp = useRef<HTMLInputElement>(null);
    const exit_btn = useRef(null);

    function handle_click(): void {
        if(inp.current){
            const val: number = parseInt(inp.current.value);
            inp.current.value = "";

            if(val == num){
                set_wins(wins + 1);
                localStorage.setItem("med_wins", (wins + 1).toString());
                set_player_status("You Win.");
            }
            else if(val > 100 || val < 0){
                set_player_status("The Number is between 0 and 100 ( and also can be 100 or 0 )");
            }
            else if(val > num){
                set_player_status("The Number is Smaller Than That...");
                set_counter(counter - 1);
            }
            else if(val < num){
                set_player_status("The Number is Bigger Than That...");
                set_counter(counter - 1);
            }
            else {
                set_player_status("Enter Number Please.");
            }
            inp.current.focus();

            if(counter == 1 && val != num){
                set_loses(loses + 1);
                localStorage.setItem("med_loses", (loses + 1).toString());
                set_player_status("You Lose.");
            }
        }
    }
    function handle_again(): void {
        set_counter(6);
        set_player_status("");
        set_num(Math.floor(Math.random() * 101));
        inp.current?.focus();
    }
    function handle_key_down(event: React.KeyboardEvent<HTMLInputElement>): void {
        if(event.code == "Enter"){
            event.preventDefault();
            handle_click();
        }
    }

    useEffect(function (): void {
        const saved_wins: string = localStorage.getItem("med_wins") || "0";
        const saved_loses: string = localStorage.getItem("med_loses") || "0";
        setTimeout(function (): void {
            set_wins(parseInt(saved_wins));
            set_loses(parseInt(saved_loses));
        }, 0);

        window.addEventListener("keydown", function (event: KeyboardEvent): void {
            if(event.code == "Escape"){
                event.preventDefault();
                (exit_btn.current as HTMLElement | null)?.click();
            }
        });
        inp.current?.focus();
    }, []);
    return (
        <div className={styles.page}>
            <Link href={"../"} className={styles.exit_btn} ref={exit_btn}> Exit </Link>
            <Link href={"../easy"} className={styles.back_btn}> Back </Link>
            <Link href={"../hard"} className={styles.next_btn}> Next </Link>
            <aside className={styles.result_box}>
                <span className={styles.result_txt_win}> Wins: {wins} </span>
                <span className={styles.result_txt_lose}> Loses: {loses} </span>
            </aside>
            <main className={styles.main}>
                <h1 className={styles.main_title}>Medium Mode</h1>
                <div className={styles.game_box}>
                    <div className={player_status != "You Win." && player_status != "You Lose." ? styles.info_box : styles.none}>
                        <h2>Rules</h2>
                        <p className={styles.rules_p}>
                            You Should Guess The Number in 
                            <br />
                            <span className={styles.bold}> range (0 - 100) </span>
                            <br />
                            You Have <span className={`${styles.bold} ${styles.italic}`}> 6 Times Only.</span>
                        </p>
                        <span className={styles.bold}> Left: {counter} </span>
                    </div>
                    <div className={player_status != "You Win." && player_status != "You Lose." ? styles.inp_box : styles.none}>
                        <input type="text" className={styles.inp} onKeyDown={handle_key_down} ref={inp}/>
                        <button onClick={handle_click} className={styles.submit_btn}> Submit </button>
                    </div>
                    <div 
                    className={player_status == "You Win." || player_status == "You Lose." ? `${styles.status_box} ${styles.rem_5} ${styles.pointer}` 
                        : player_status.length != 0 ? styles.status_box 
                        : styles.none} 
                    onClick={player_status == "You Win." || player_status == "You Lose." ? handle_again : (): void => {}}>
                        <span className={player_status.length != 0 ? styles.bold : styles.none}>{player_status}</span>
                        <br />
                        <span className={player_status == "You Lose." ? styles.bold : styles.none}>It&apos;s {num}</span>
                    </div>
                </div>
            </main>
            <footer className={styles.footer}>
                <p className={styles.copyright_para}>&copy; 2026 - {new Date().getFullYear()} Marwan Codex</p>
            </footer>
        </div>
    );
}