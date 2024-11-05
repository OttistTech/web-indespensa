import styles from './ListItem.module.css'

export default function ListItem({label, data}) {
  return (
    <li  className={styles.item}>
        <h5 className={styles.label}>{label}</h5>
        <p  className={styles.data}>{data}</p>
    </li>
  )
}
