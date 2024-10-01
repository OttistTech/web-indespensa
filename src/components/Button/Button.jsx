import styles from './Button.module.css'

export default function Button({type, mode, text, enabled=true, onClick}) {
    const modes = {
        'primary': styles.primary,
        'secondary': styles.secondary,
        'tertiary': styles.tertiary
    }

    return (
        <button className={modes[mode]} onClick={onClick} type={type} disabled={!enabled}>{text}</button>
    )
}
