import AccountMenu from "../AccountMenu/AccountMenu";
import logo from "../../assets/images/logo.png"
import styles from "./Header.module.css";

export default function Header({ loggedUser, onLogout }) {
  return (
    <header className={styles.header}>
        <div className={styles.title_container}>
            <img 
                src={logo} 
                alt="Indespensa" 
                className={styles.logo}
            />
            <h1 className={styles.title}>Informações Restritas</h1>
        </div>
        {loggedUser && (
            <AccountMenu
                loggedUser={loggedUser}
                onLogout={onLogout}
            />
        )}
    </header>
  )
}
