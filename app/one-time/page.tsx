'use client';
import { JSX, useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";

const random_num: number = Math.floor(Math.random() * 11);
export default function One_Time(): JSX.Element {
    const [num, set_num] = useState<number>(random_num);
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
                localStorage.setItem("one_time_wins", (wins + 1).toString());
                set_player_status("You Win.");
            }
            else if(val !== num){
                set_loses(loses + 1);
                localStorage.setItem("one_time_loses", (loses + 1).toString());
                set_player_status("You Lose.");
            }
            else if(val > 10 || val < 0){
                set_player_status("The Number is between 0 and 10 ( and also can be 10 or 0 )");
            }
            else {
                set_player_status("Please Enter A Number.");
            }
            inp.current.focus();
        }
    }
    function handle_again(): void {
        set_player_status("");
        set_num(Math.floor(Math.random() * 11));
        inp.current?.focus();
    }
    function handle_key_down(event: React.KeyboardEvent<HTMLInputElement>): void {
        if(event.code == "Enter"){
            event.preventDefault();
            handle_click();
        }
    }

    useEffect(function (): void {
        const saved_wins: string = localStorage.getItem("one_time_wins") || "0";
        const saved_loses: string = localStorage.getItem("one_time_loses") || "0";
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
            <Link href={"../impossible"} className={styles.back_btn}> Back </Link>
            <div className={styles.result_box}>
                <span className={styles.result_txt_win}> Wins: {wins} </span>
                <span className={styles.result_txt_lose}> Loses: {loses} </span>
            </div>
            <div className={styles.main}>
                <h1 className={styles.main_title}>1 Time Mode</h1>
                <div className={styles.game_box}>
                    <div className={player_status != "You Win." && player_status != "You Lose." ? styles.info_box : styles.none}>
                        <h2>Rules</h2>
                        <p className={styles.rules_p}>
                            You Should Guess The Number in 
                            <br />
                            <span className={styles.bold}> range (0 - 10) </span>
                            <br />
                            You Have <span className={`${styles.bold} ${styles.italic}`}> 1 Times Only.</span>
                        </p>
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
                        <span className={player_status.length != 0 ? styles.status_txt : styles.none}>{player_status}</span>
                        <br />
                        <span className={player_status == "You Lose." ? styles.bold : styles.none}>It&apos;s {num}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}