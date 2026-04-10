'use client';
import { motion } from "framer-motion";
import Link from "next/link";

export const MotionLink = motion(Link);
export const parent_variants: {
  hidden: {
    opacity: number,
  },
  visible: {
    opacity: number,
    transition: {
      staggerChildren: number,
    },
  },
} = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, 
    },
  },
};
export const item_variants: {
  hidden: {
    opacity: number,
    y: number,
  },
  visible: {
    opacity: number,
    y: number,
    transition: {
      duration: number,
    }
  },
} = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  },
};