'use client';
import { JSX, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { game_range, game_attempts } from "../page";
import { parent_variants, item_variants, MotionLink } from "../../variants";
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
    const sub_btn = useRef(null);

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
        <motion.div className={styles.page} variants={parent_variants} initial="hidden" animate="visible">
            <MotionLink 
                href={"../"} 
                className={styles.exit_btn} 
                ref={exit_btn}
                variants={item_variants}
            >Exit</MotionLink>
            <MotionLink 
                href={"../free-mode"} 
                className={styles.back_btn}
                variants={item_variants}
            >Back</MotionLink>
            <motion.aside className={styles.result_box} variants={item_variants}>
                <motion.span className={styles.result_txt_win} variants={item_variants}> Wins: {wins} </motion.span>
                <motion.span className={styles.result_txt_lose} variants={item_variants}> Loses: {loses} </motion.span>
            </motion.aside>
            <motion.main className={styles.main} variants={item_variants}>
                <motion.h1 
                    className={
                        player_status != "Win." && player_status != "Lose." 
                        ? styles.main_title 
                        : styles.none
                    }
                    variants={item_variants}
                >Free Game Mode</motion.h1>
                <motion.div className={styles.game_box} variants={item_variants}>
                    <motion.div className={player_status != "Win." && player_status != "Lose." ? styles.info_box : styles.none} variants={item_variants}>
                        <motion.h2 variants={item_variants}>Rules</motion.h2>
                        <motion.p className={styles.rules_p} variants={item_variants}>
                            You Should Guess The Number in
                            <p className={styles.bold}> range (0 - {game_range - 1}) </p>
                            You Have <span className={`${styles.bold} ${styles.italic}`}> {game_attempts} Attempts Only.</span>
                        </motion.p>
                        <motion.span className={styles.bold} variants={item_variants}> Left: {counter} </motion.span>
                    </motion.div>
                    <motion.div className={player_status != "Win." && player_status != "Lose." ? styles.inp_box : styles.none} variants={item_variants}>
                        <motion.input 
                            type="text" 
                            className={styles.inp} 
                            onKeyDown={handle_key_down} 
                            enterKeyHint="done" 
                            inputMode="numeric"
                            pattern="[0-9]*"
                            ref={inp}
                            variants={item_variants}
                        />
                        <motion.button onClick={handle_click} className={styles.submit_btn} ref={sub_btn} variants={item_variants}>Submit</motion.button>
                    </motion.div>
                    <motion.div 
                        className={player_status == "Win." || player_status == "Lose." ? `${styles.status_box} ${styles.rem_5} ${styles.pointer}` 
                            : player_status.length != 0 ? styles.status_box 
                            : styles.none} 
                        onClick={player_status == "Win." || player_status == "Lose." ? handle_again : (): void => {}}
                        variants={item_variants}
                    >
                        <motion.p 
                            key={
                                player_status.length != 0 
                                ? "show" 
                                : "hide"
                            } 
                            className={
                                player_status.length != 0 
                                ? styles.status_txt 
                                : styles.none
                            }
                            variants={item_variants}
                        >{player_status}</motion.p>
                        <motion.p className={player_status == "Lose." ? styles.bold : styles.none} variants={item_variants}>It&apos;s {num}</motion.p>
                    </motion.div>
                </motion.div>
            </motion.main>
            <motion.footer className={styles.footer} variants={item_variants}>
                <motion.p className={styles.copyright_para} variants={item_variants}>&copy; 2026 - {new Date().getFullYear()} Marwan Void</motion.p>
            </motion.footer>
        </motion.div>
    );
}