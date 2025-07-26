import { FaGithub } from "react-icons/fa";
import styles from "./styles.module.scss";
import { FiX } from "react-icons/fi";

export function SignInButton() {
  const isUserLoggedIn = true;
  

  return (
    <button type="button" className={styles.signInButton}>
      {isUserLoggedIn ? (
        <>
          <FaGithub color="#04d361" />
          John Doe
          <FiX color="#737380" className={styles.closeIcon} />
        </>
      ) : (
        <>
          <FaGithub color="#eba417" />
          Sign in with Github
        </>
      )}
    </button>
  );
}