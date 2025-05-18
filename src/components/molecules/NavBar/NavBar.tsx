import { FC } from "react";
import styles from "./NavBar.module.css";
import { ThemeButton } from "./ThemeButton";
import { Link as LinkType } from "@/types/Link";
import Link from "next/link";
import { Theme } from "@/types/Theme";

interface NavBarProps {
  activePath?: string;
  theme?: Theme;
}

export const NavBar: FC<NavBarProps> = async ({ theme }) => {
  const links: LinkType[] = [
    {
      label: "blog",
      path: "/blog",
    },
    {
      label: "notes",
      path: "/notes",
    },
    {
      label: "about",
      path: "/about",
    },
  ];

  return (
    <nav className={styles.navBarContainer}>
      <div className={`${styles.navBar} navbar`}>
        <div className={styles.navLogo}>
          <Link href="/" className={styles.navHeader}>
            stephen kernan
          </Link>
        </div>
        <div className={styles.navOptions}>
          <ul className={styles.navLinks}>
            {links.map((link: LinkType) => (
              <li style={{ listStyleType: "none" }} key={link.path}>
                <a href={link.path}>{link.label}</a>
              </li>
            ))}
          </ul>
          <ThemeButton startingTheme={theme as Theme} />
        </div>
      </div>
    </nav>
  );
};
