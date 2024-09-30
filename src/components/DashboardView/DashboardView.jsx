import styles from './DashboardView.module.css'

export default function DashboardView({url}) {
  return (
    <section className={styles.container}>{url}</section>
  )
}
