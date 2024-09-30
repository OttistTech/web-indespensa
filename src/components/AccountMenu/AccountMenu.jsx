import styles from './AccountMenu.module.css'
import profilePicture from '../../assets/images/profile.png'
import { useNavigate } from 'react-router-dom'

export default function AccountMenu({ loggedUser, onLogout }) {
    const navigate = useNavigate()

    const handleLogout = () => {
        onLogout()
        navigate('/login')
    }

    return (
        <div className={styles.container}>
            <img 
                src={loggedUser.image ? loggedUser.image : profilePicture} 
                alt={loggedUser.name} 
                className={styles.profile_picture}
            />
            <h5
                className={styles.profile_name}
            >{loggedUser.name}</h5>
            <input 
                type="checkbox" 
                id="menu"
                className={styles.menu_checkbox}
            />
            <label 
                htmlFor="menu" 
                className={styles.menu_label}
            >
                <span className={styles.menu_appearance}></span>
            </label>
            <ul className={styles.menu_items}>
                <li className={styles.menu_item}>
                    <p
                        onClick={handleLogout}
                        className={styles.menu_item_text}
                    >Sair</p>
                </li>
                <li className={styles.menu_item}>
                    <a 
                        href="https://github.com/OttistTech/web-indespensa"
                        className={styles.menu_item_text}
                    >Landing Page</a>
                </li>
                <li className={styles.menu_item}>
                    <a 
                        href="https://github.com/OttistTech/web-indespensa"
                        className={styles.menu_item_text}
                    >Contato</a>
                </li>
            </ul>
        </div>
    )
}
