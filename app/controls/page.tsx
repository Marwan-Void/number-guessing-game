'use client';
import { JSX } from "react";
import styles from "./page.module.css";
import Link from "next/link";

export default function Controls(): JSX.Element {
  return (
    <div className={styles.page}>
      <Link href={"../"} className={styles.home}>Home</Link>
      <main className={styles.main}>
        <div className={styles.controls_div}>
          <h1 className={styles.controls_title}>Controls:</h1>
          <p className={styles.main_para}>
              <p className={styles.key_info_para}>
                  <span className={styles.btn_txt}>ESC</span><span className={styles.info_txt}> =&gt; Exit Button</span>
              </p>
              <p className={styles.key_info_para}>
                  <span className={styles.btn_txt}>Enter</span><span className={styles.info_txt}> =&gt; Submit Button</span>
              </p>
              <p className={styles.key_info_para}>
                  <span className={styles.btn_txt}>Ctrl + R</span><span className={styles.info_txt}> =&gt; Refresh Page (If There Is Any Error)</span>
              </p>
          </p>
        </div>
      </main>
      <footer className={styles.footer}>
        <p className={styles.copyright_para}>&copy; 2026 - {new Date().getFullYear()} Marwan Void</p>
      </footer>
    </div>
  );
}
