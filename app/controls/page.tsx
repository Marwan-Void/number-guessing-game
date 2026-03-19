'use client';
import { JSX } from "react";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home(): JSX.Element {
  return (
    <div className={styles.page}>
      <Link href={"../"} className={styles.home}>Home</Link>
      <main className={styles.main}>
        <h1 className={styles.controls_title}>Controls:</h1>
        <p className={styles.main_para}>
            <p className={styles.key_info_para}>
                <span className={styles.btn_txt}>ESC</span> =&gt; Exit Button
            </p>
            <p className={styles.key_info_para}>
                <span className={styles.btn_txt}>Enter</span> =&gt; Submit Button
            </p>
        </p>
      </main>
    </div>
  );
}
