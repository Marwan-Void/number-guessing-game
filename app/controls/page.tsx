'use client';
import { JSX } from "react";
import { motion } from "framer-motion";
import styles from "./page.module.css";
import { parent_variants, item_variants, MotionLink } from "../exports";

export default function Controls(): JSX.Element {
  return (
    <div className={styles.page}>
      <MotionLink 
        href={"../"} 
        className={styles.home}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >Home</MotionLink>
      <motion.main 
        className={styles.main}
        variants={parent_variants}
        initial="hidden"
        animate="visible"
      >
        <div className={styles.controls_div}>
          <motion.h1 className={styles.controls_title} variants={item_variants}>Controls:</motion.h1>
          <motion.div className={styles.main_para} variants={item_variants}>
              <motion.p className={styles.key_info_para} variants={item_variants}>
                <motion.span className={styles.btn_txt} variants={item_variants}>ESC</motion.span>
                <motion.span className={styles.info_txt} variants={item_variants}> =&gt; Exit Button</motion.span>
              </motion.p>
              <motion.p className={styles.key_info_para} variants={item_variants}>
                  <motion.span className={styles.btn_txt} variants={item_variants}>Enter</motion.span>
                  <motion.span className={styles.info_txt} variants={item_variants}> =&gt; Submit Button</motion.span>
              </motion.p>
              <motion.p className={styles.key_info_para} variants={item_variants}>
                  <motion.span className={styles.btn_txt} variants={item_variants}>Ctrl + R</motion.span>
                  <motion.span className={styles.info_txt} variants={item_variants}> =&gt; Refresh Page (If There Is Any Error)</motion.span>
              </motion.p>
          </motion.div>
        </div>
        <motion.div className={styles.controls_div} variants={item_variants}>
          <motion.h1 className={styles.controls_title} variants={item_variants}>Document:</motion.h1>
          <motion.div className={styles.main_para} variants={item_variants}>
              <motion.p className={styles.doc_para} variants={item_variants}>
                <motion.h6 className={`${styles.bold} ${styles.doc_heading}`} variants={item_variants}>Warning:</motion.h6>
                <motion.p className={styles.doc_info} variants={item_variants}>
                  This Website Saves The Data in Your Browser&apos;s Local Storage, So If You Clear Your Browser Data or Use Incognito Mode or Entered The Website in Another Browser or Device You Will Not Find Your Data (You Can Find it in Your Browser if You Don&apos;t Delete Your Browser Data)
                </motion.p>
              </motion.p>
          </motion.div>
        </motion.div>
      </motion.main>
      <motion.footer 
        className={styles.footer}
        variants={parent_variants}
        initial="hidden"
        animate="visible"
      >
        <motion.p 
          className={styles.copyright_para} variants={item_variants}
        >&copy; 2026 - {new Date().getFullYear()} Marwan Void</motion.p>
      </motion.footer>
    </div>
  );
}
