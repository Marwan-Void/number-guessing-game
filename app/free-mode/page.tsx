'use client';
import { ChangeEvent, JSX, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import styles from "./page.module.css";
import Link from "next/link";

export let game_range: number = 6;
export let game_attempts: number = 1;
export default function FreeMode(): JSX.Element {
    const [max_range, set_max_range] = useState<number>(5);
    const [max_attempts, set_max_attempts] = useState<number>(1);
    const exit_btn = useRef(null);

    useEffect(function (): void {
        window.addEventListener("keydown", function (event: KeyboardEvent): void {
            if(event.code == "Escape"){
                event.preventDefault();
                (exit_btn.current as HTMLElement | null)?.click();
            }
        });
    }, []);
    return (
        <div className={styles.page}>
            <Link href={"../"} className={styles.exit_btn} ref={exit_btn}> Exit </Link>
            <Link href={"../one-time"} className={styles.back_btn}> Back </Link>
            <motion.main 
                className={styles.main}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <h1 className={styles.main_title}>Free Mode</h1>
                <p 
                    className={styles.max_range_para}
                >
                    You Can Guess The Number Between 0 and {max_range}.
                </p>
                <div className={`${styles.select_attempts} ${styles.select_range_box}`}>
                    <label 
                        htmlFor="attempts_inp" 
                        className={styles.attempts_label_description}
                    >
                        Enter Max Attempts: 
                    </label>
                    <input 
                        type="range" 
                        id="attempts_inp"
                        defaultValue={game_attempts}
                        min="1" 
                        max="20"
                        onChange={
                            function (e: ChangeEvent<HTMLInputElement, HTMLInputElement>): void {
                                set_max_attempts(parseInt(e.target.value));
                            }
                        }
                        className={`${styles.range_inp} ${styles.attempts_inp}`}
                    />
                    <label className={styles.attempts_label}>{max_attempts}</label>
                </div>
                <div className={`${styles.select_range} ${styles.select_range_box}`}>
                    <label 
                        htmlFor="range_inp" 
                        className={styles.range_label_description}
                    >
                        Enter Max Range: 
                    </label>
                    <input 
                        type="range" 
                        id="range_inp"
                        defaultValue={game_range - 1}
                        min="5" 
                        max="1000"
                        onChange={
                            function (e: ChangeEvent<HTMLInputElement, HTMLInputElement>): void {
                                set_max_range(parseInt(e.target.value));
                            }
                        }
                        className={`${styles.range_inp} ${styles.range_inp}`}
                    />
                    <label className={styles.range_label}>{max_range}</label>
                </div>
                <Link 
                    href={"../free-game-mode"} 
                    className={styles.start_btn}
                    onClick={function (): void {
                        game_range = max_range + 1;
                        game_attempts = max_attempts;
                    }}
                >
                    Start Game
                </Link>
            </motion.main>
            <footer className={styles.footer}>
                <p className={styles.copyright_para}>&copy; 2026 - {new Date().getFullYear()} Marwan Void</p>
            </footer>
        </div>
    );
}