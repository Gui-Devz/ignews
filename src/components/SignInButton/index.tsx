import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";

import styles from "./styles.module.scss";

export function SignInButton() {
  const isUserLoggedIn = false;
  return isUserLoggedIn ? (
    <button className={styles.signInButton} type="button">
      <FaGithub color="#84d361" />
      Gui-Devz
      <FiX color="#73738B" className={styles.closeIcon} />
    </button>
  ) : (
    <button className={styles.signInButton} type="button">
      <FaGithub color="#eba417" />
      Sign in with Github
    </button>
  );
}
