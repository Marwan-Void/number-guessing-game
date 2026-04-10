'use client';
import { JSX, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import styles from "./page.module.css";
import { parent_variants, item_variants } from "./variants";
import Link from "next/link";

export enum Range {
  Easy_OneTime = 11,
  Medium_Imp = 101,
  Hard_Extreme = 1001,
}
export enum Attempts {
  Easy_Imp = 4,
  Medium = 8,
  Hard = 12,
  Extreme = 10,
  OneTime = 1
}

class Level {
  wins: (string | number);
  loses: (string | number);
  type_of_obj: string;
  constructor(wins: (string | number) = "0", loses: (string | number) = "0", kind: string = "Level"){
    this.wins = wins;
    this.loses = loses;
    this.type_of_obj = kind;
  }
}

function sum(...sum_num: string[]): string {
  let result: number = 0;
  for(let i: number = 0; i < sum_num.length; i++){
    result += parseInt(sum_num[i]);
  }
  return (result.toString());
}

export default function Home(): JSX.Element {
  const [clicked, set_clicked] = useState<boolean>(false);
  const [aside_visibility, set_aside_visibility] = useState<boolean>(false);
  const [easy, set_easy] = useState<Level>(new Level());
  const [med, set_med] = useState<Level>(new Level());
  const [hard, set_hard] = useState<Level>(new Level());
  const [ext, set_ext] = useState<Level>(new Level());
  const [imp, set_imp] = useState<Level>(new Level());
  const [one_time, set_one_time] = useState<Level>(new Level());
  const [free_mode, set_free_mode] = useState<Level>(new Level());
  const total: Level = new Level(
    sum(
      easy.wins as string,
      med.wins as string,
      hard.wins as string,
      ext.wins as string,
      imp.wins as string,
      one_time.wins as string,
      free_mode.wins as string,
    ),
    sum(
      easy.loses as string,
      med.loses as string,
      hard.loses as string,
      ext.loses as string,
      imp.loses as string,
      one_time.loses as string,
      free_mode.loses as string,
    ),
    "Total Obj"
  ); 
  const easy_btn = useRef(null);
  const med_btn = useRef(null);
  const hard_btn = useRef(null);
  const ext_btn = useRef(null);
  const imp_btn = useRef(null);
  const one_time_btn = useRef(null);
  const free_mode_btn = useRef(null);

  function handle_hide_aside(): void {
    set_aside_visibility(false);
  }
  function handle_appear_aside(): void {
    set_aside_visibility(true);
    if(!clicked){
      set_clicked(true);
    }
  }

  useEffect(function (): void {
    const saved_easy: Level = new Level(
      localStorage.getItem("easy_wins") || "0",
      localStorage.getItem("easy_loses") || "0",
      "Storage Obj"
    );
    const saved_med: Level = new Level(
      localStorage.getItem("med_wins") || "0",
      localStorage.getItem("med_loses") || "0",
      "Storage Obj"
    );
    const saved_hard: Level = new Level(
      localStorage.getItem("hard_wins") || "0",
      localStorage.getItem("hard_loses") || "0",
      "Storage Obj"
    );
    const saved_ext: Level = new Level(
      localStorage.getItem("ext_wins") || "0",
      localStorage.getItem("ext_loses") || "0",
      "Storage Obj"
    );
    const saved_imp: Level = new Level(
      localStorage.getItem("imp_wins") || "0",
      localStorage.getItem("imp_loses") || "0",
      "Storage Obj"
    );
    const saved_one_time: Level = new Level(
      localStorage.getItem("one_time_wins") || "0",
      localStorage.getItem("one_time_loses") || "0",
      "Storage Obj"
    );
    const saved_free_mode: Level = new Level(
      localStorage.getItem("free_game_wins") || "0",
      localStorage.getItem("free_game_loses") || "0",
      "Storage Obj"
    );
    setTimeout(function (): void {
      set_easy(saved_easy);
      set_med(saved_med);
      set_hard(saved_hard);
      set_ext(saved_ext);
      set_imp(saved_imp);
      set_one_time(saved_one_time);
      set_free_mode(saved_free_mode);
    }, 0);
  }, []);
  return (
    <div className={styles.page}>
      <Link href={"./controls"} className={styles.controls}>Controls</Link>
      <button type="button" aria-label="Open History Section" className={styles.appear_btn} onClick={handle_appear_aside}></button>
      <aside 
        className={
          `
            ${styles.history_div} 
            ${!aside_visibility && clicked 
              ? `${styles.hidden} ${styles.hidden_ani}` 
              : !aside_visibility && !clicked 
              ? styles.hidden 
              : styles.appear
            }
          `
        }
      >
        <div className={styles.history_txt_div}>
          <h2 className={styles.history_txt} onClick={handle_hide_aside}>History</h2>
        </div>
        <div className={styles.levels_history}>
          <div className={`${styles.easy} ${styles.level_box}`}>
            <span className={`${styles.score}`}>Wins: {easy.wins}</span>
            <span className={`${styles.score}`}>Loses: {easy.loses}</span>
          </div>
          <div className={`${styles.medium} ${styles.level_box}`}>
            <span className={`${styles.score}`}>Wins: {med.wins}</span>
            <span className={`${styles.score}`}>Loses: {med.loses}</span>
          </div>
          <div className={`${styles.hard} ${styles.level_box}`}>
            <span className={`${styles.score}`}>Wins: {hard.wins}</span>
            <span className={`${styles.score}`}>Loses: {hard.loses}</span>
          </div>
          <div className={`${styles.extreme} ${styles.level_box}`}>
            <span className={`${styles.score}`}>Wins: {ext.wins}</span>
            <span className={`${styles.score}`}>Loses: {ext.loses}</span>
          </div>
          <div className={`${styles.imp} ${styles.level_box}`}>
            <span className={`${styles.score}`}>Wins: {imp.wins}</span>
            <span className={`${styles.score}`}>Loses: {imp.loses}</span>
          </div>
          <div className={`${styles.one_time} ${styles.level_box}`}>
            <span className={`${styles.score}`}>Wins: {one_time.wins}</span>
            <span className={`${styles.score}`}>Loses: {one_time.loses}</span>
          </div>
          <div className={`${styles.free_mode} ${styles.level_box}`}>
            <span className={`${styles.score}`}>Wins: {free_mode.wins}</span>
            <span className={`${styles.score}`}>Loses: {free_mode.loses}</span>
          </div>
          <div className={`${styles.total} ${styles.level_box}`}>
            <span className={`${styles.score}`}>Total Wins: {total.wins}</span>
            <span className={`${styles.score}`}>Total Loses: {total.loses}</span>
          </div>
        </div>
      </aside>
      <main className={styles.main}>
        <h1 className={styles.main_title}>Number Guessing Game</h1>
        <div className={styles.choices_box}>
          <h2 className={styles.choose_title}>Choose Your Level</h2>
          <div className={styles.choices}>
            <Link href={"./easy"} className={`${styles.choice_btn} ${styles.easy}`} ref={easy_btn}> Easy </Link>
            <Link href={"./medium"} className={`${styles.choice_btn} ${styles.medium}`} ref={med_btn}> Medium </Link>
            <Link href={"./hard"} className={`${styles.choice_btn} ${styles.hard}`} ref={hard_btn}> Hard </Link>
            <Link href={"./extreme"} className={`${styles.choice_btn} ${styles.extreme}`} ref={ext_btn}> Extreme </Link>
            <Link href={"./impossible"} className={`${styles.choice_btn} ${styles.imp}`} ref={imp_btn}> Impossible </Link>
            <Link href={"./one-time"} className={`${styles.choice_btn} ${styles.one_time}`} ref={one_time_btn}> 1 Time </Link>
            <Link href={"./free-mode"} className={`${styles.choice_btn} ${styles.free_mode}`} ref={free_mode_btn}> Free Mode </Link>
          </div>
        </div>
      </main>
      <motion.footer className={styles.footer} variants={parent_variants} initial="hidden" animate="visible">
        <motion.p className={styles.copyright_para} variants={item_variants}>&copy; 2026 - {new Date().getFullYear()} Marwan Void</motion.p>
      </motion.footer>
    </div>
  );
}
