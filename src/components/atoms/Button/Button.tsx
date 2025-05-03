import { FC, ReactNode } from "react";
import styles from "./Button.module.css";

export enum ButtonVariant {
  PRIMARY = "primary",
  ICON = "icon",
}

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: ButtonVariant;
}

export const Button: FC<ButtonProps> = ({
  children,
  href,
  onClick,
  variant = ButtonVariant.PRIMARY,
}) => {
  // For accessibility, I want to make sure that I render a link if it's a link.
  // Plus, this helps me avoid `redirectTo` functions.
  if (href) {
    return (
      <a className={`${styles.btn} ${styles[variant]}`} href={href}>
        {children}
      </a>
    );
  }

  return (
    <button className={`${styles.btn} ${styles[variant]}`} onClick={onClick}>
      {children}
    </button>
  );
};
