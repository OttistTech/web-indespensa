import styles from './DashboardView.module.css'

export default function DashboardView({url}) {
  return (
    <section className={styles.container}>
      <iframe 
        title="inter" 
        width="100%" 
        height="100%" 
        src={url} 
        frameborder="0" 
        allowFullScreen="true">
        </iframe>
    </section>
  )
}
