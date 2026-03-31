'use client';
import { JSX, useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";

export default function FreeGame(): JSX.Element {
    return (
        <div className={styles.page}>
            <Link href={"../"}>Back</Link>
        </div>
    );
}