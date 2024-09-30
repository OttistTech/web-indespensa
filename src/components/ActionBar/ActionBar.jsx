import styles from './ActionBar.module.css'
import Button from '../Button/Button'
import { formatDate } from '../../shared/helpers/date-formatter'

export default function ActionBar({dashboards, currentDashboard, onUpdate, onSelectDashboard}) {
  return (
    <header className={styles.container}>
        <select
            className={styles.select}
            defaultValue={Object.keys(dashboards).find(key => dashboards[key].title === currentDashboard.title)}
            onChange={(e) => onSelectDashboard(e.target.value)}
        >
            {Object.keys(dashboards).map(key => 
                <option key={key} value={key}>{dashboards[key].title}</option>
            )}
        </select>
        <p className={styles.description}>
            {currentDashboard.description}
        </p>
        <p className={styles.description}>
            <span className={styles.label}>Última atualização:</span>
            {formatDate(currentDashboard.lastUpdate)}
        </p>
        <Button
            type="button"
            mode="primary"
            text="Atualizar"
            onClick={() => onUpdate()}
        />
    </header>
  )
}
