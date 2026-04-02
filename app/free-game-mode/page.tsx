'use client';
import { JSX, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { game_range, game_attempts } from "../free-mode/page";
import styles from "./page.module.css";
import Link from "next/link";

const random_num: number = Math.floor(Math.random() * game_range);
export default function FreeGame(): JSX.Element {
    const [num, set_num] = useState<number>(random_num);
    const [counter, set_counter] = useState<number>(game_attempts);
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
                    localStorage.setItem("free_game_wins", (wins + 1).toString());
                    set_player_status("Win.");
                }
                else if(val > (game_range - 1) || val < 0){
                    set_player_status(`Between 0 and ${game_range - 1} ( and also can be ${game_range - 1} or 0 )`);
                }
                else if(val > num){
                    set_player_status("Lower...");
                    set_counter(counter - 1);
                }
                else if(val < num){
                    set_player_status("Higher...");
                    set_counter(counter - 1);
                }
                else {
                    set_player_status("Enter Number Please.");
                }
                inp.current.focus();
    
                if(counter == 1 && val != num){
                    set_loses(loses + 1);
                    localStorage.setItem("free_game_loses", (loses + 1).toString());
                    set_player_status("Lose.");
                }
            }
        }
        function handle_again(): void {
            set_counter(game_attempts);
            set_player_status("");
            set_num(Math.floor(Math.random() * game_range));
            setTimeout(function (): void {
                inp.current?.focus();
            }, 500);
        }
    function handle_key_down(event: React.KeyboardEvent<HTMLInputElement>): void {
        if(event.code == "Enter"){
            event.preventDefault();
            handle_click();
        }
    }

    useEffect(function (): void {
        const saved_wins: string = localStorage.getItem("free_game_wins") || "0";
        const saved_loses: string = localStorage.getItem("free_game_loses") || "0";
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
    }, []);
    return (
        <div className={styles.page}>
            <Link href={"../"} className={styles.exit_btn} ref={exit_btn}>Exit</Link>
            <Link href={"../free-mode"} className={styles.back_btn}>Back</Link>
            <aside className={styles.result_box}>
                <span className={styles.result_txt_win}> Wins: {wins} </span>
                <span className={styles.result_txt_lose}> Loses: {loses} </span>
            </aside>
            <motion.main 
                className={styles.main}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <h1 className={player_status != "Win." && player_status != "Lose." ? styles.main_title : styles.none}>Free Game Mode</h1>
                <div className={styles.game_box}>
                    <div className={player_status != "Win." && player_status != "Lose." ? styles.info_box : styles.none}>
                        <h2>Rules</h2>
                        <p className={styles.rules_p}>
                            You Should Guess The Number in 
                            <br />
                            <span className={styles.bold}> range (0 - {game_range - 1}) </span>
                            <br />
                            You Have <span className={`${styles.bold} ${styles.italic}`}> {game_attempts} Attempts Only.</span>
                        </p>
                        <span className={styles.bold}> Left: {counter} </span>
                    </div>
                    <div className={player_status != "Win." && player_status != "Lose." ? styles.inp_box : styles.none}>
                        <input 
                            type="text" 
                            className={styles.inp} 
                            onKeyDown={handle_key_down} 
                            enterKeyHint="done" 
                            inputMode="numeric"
                            pattern="[0-9]*"
                            ref={inp}
                        />
                        <button onClick={handle_click} className={styles.submit_btn}> Submit </button>
                    </div>
                    <div 
                        className={player_status == "Win." || player_status == "Lose." ? `${styles.status_box} ${styles.rem_5} ${styles.pointer}` 
                            : player_status.length != 0 ? styles.status_box 
                            : styles.none} 
                        onClick={player_status == "Win." || player_status == "Lose." ? handle_again : (): void => {}}
                    >
                        <span className={player_status.length != 0 ? styles.status_txt : styles.none}>{player_status}</span>
                        <br />
                        <span className={player_status == "Lose." ? styles.bold : styles.none}>It&apos;s {num}</span>
                    </div>
                </div>
            </motion.main>
            <footer className={styles.footer}>
                <p className={styles.copyright_para}>&copy; 2026 - {new Date().getFullYear()} Marwan Void</p>
            </footer>
        </div>
    );
}