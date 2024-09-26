import styles from './Button.module.css'

export default function Button({type, mode, text, onClick}) {
    const modes = {
        'primary': styles.primary,
        'secondary': styles.secondary,
        'tertiary': styles.tertiary
    }

    return (
        <button className={modes[mode]} onClick={onClick} type={type}>{text}</button>
    )
}
