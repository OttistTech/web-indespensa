import { useState } from "react";
import ActionBar from "../../components/ActionBar/ActionBar";
import DashboardView from "../../components/DashboardView/DashboardView";
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [currentDashboard, setCurrentDashboard] = useState("targetAudience")

  const availableDashboards = {
    "targetAudience": {
      title: 'Dashboard Público Alvo',
      description: 'Informações sobre o público alvo do Indespensa.',
      url: 'URL 1'
    },
    "expoTech": {
      title: 'Dashboard Expo Tech',
      description: 'Informações sobre o desempenho do Indespensa na Expo Tech.',
      url: 'URL 2'
    }
  }

  const changeDashboard = (dashboardKey) => {
    setCurrentDashboard(dashboardKey)
    setLastUpdate(new Date())
  }

  const updateDashboard = () => {
    setLastUpdate(new Date())
  }

  return (
    <div className={styles.page}>
      <ActionBar
        dashboards={availableDashboards}
        currentDashboard={{...availableDashboards[currentDashboard], lastUpdate}}
        onSelectDashboard={changeDashboard}
        onUpdate={updateDashboard}
      />
      <DashboardView
        url={availableDashboards[currentDashboard].url}
      />
    </div>
  )
}
