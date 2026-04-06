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
          <div className={styles.main_para}>
              <p className={styles.key_info_para}>
                  <span className={styles.btn_txt}>ESC</span><span className={styles.info_txt}> =&gt; Exit Button</span>
              </p>
              <p className={styles.key_info_para}>
                  <span className={styles.btn_txt}>Enter</span><span className={styles.info_txt}> =&gt; Submit Button</span>
              </p>
              <p className={styles.key_info_para}>
                  <span className={styles.btn_txt}>Ctrl + R</span><span className={styles.info_txt}> =&gt; Refresh Page (If There Is Any Error)</span>
              </p>
          </div>
        </div>
        <div className={styles.controls_div}>
          <h1 className={styles.controls_title}>Document:</h1>
          <div className={styles.main_para}>
              <p className={styles.doc_para}>
                <span className={styles.bold}>Warning:</span>
                <br />
                This Website Saves The Data in Your Browser&apos;s Local Storage, So If You Clear Your Browser Data or Use Incognito Mode or Entered The Website in Another Browser or Device You Will Not Find Your Data (You Can Find it in Your Browser if You Don&apos;t Delete Your Browser Data)
              </p>
          </div>
        </div>
      </main>
      <footer className={styles.footer}>
        <p className={styles.copyright_para}>&copy; 2026 - {new Date().getFullYear()} Marwan Void</p>
      </footer>
    </div>
  );
}
