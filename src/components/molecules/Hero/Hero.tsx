"use client";
import { Button } from "@/components/atoms/Button/Button";
import styles from "./Hero.module.css";

export const Hero = () => {
  return (
    <div className={styles.heroSection}>
      <h1>Hi, I&apos;m Stephen ✌️</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem sequi
        tenetur facilis eligendi saepe corporis temporibus cum. Quos ab
        similique facilis sint explicabo. Excepturi, perspiciatis! Modi impedit
        iusto explicabo possimus.
      </p>
      <Button onClick={() => {}} href="/">
        Read my work
      </Button>
    </div>
  );
};
