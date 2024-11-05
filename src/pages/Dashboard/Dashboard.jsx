import { useState } from 'react';
import ActionBar from '../../components/ActionBar/ActionBar';
import DashboardView from '../../components/DashboardView/DashboardView';
import styles from './Dashboard.module.css';
import AnalyticsBar from '../../components/AnalyticsBar/AnalyticsBar';

const getLastAccessedDashboard = () => {
  const item = localStorage.getItem('last_accessed_dashboard')
  if(item) {
    return JSON.parse(item)
  } else {
    return 'targetAudience'
  }
}

const setLastAccessedDashboard = (user) => {
  const stringfiedDashboardName = JSON.stringify(user)
  localStorage.setItem('last_accessed_dashboard', stringfiedDashboardName)
}

export default function Dashboard() {
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [currentDashboard, setCurrentDashboard] = useState(getLastAccessedDashboard())

  const availableDashboards = {
    'targetAudience': {
      title: 'Dashboard Público Alvo',
      description: 'Informações sobre o público alvo do Indespensa.',
      url: 'https://app.powerbi.com/reportEmbed?reportId=125e2547-a1f7-412f-abf9-36b20e1e557c&autoAuth=true&ctid=b148f14c-2397-402c-ab6a-1b4711177ac0'
    },
    'expoTech': {
      title: 'Dashboard Expo Tech',
      description: 'Informações sobre o desempenho do Indespensa na Expo Tech.',
      url: 'https://app.powerbi.com/reportEmbed?reportId=340cfa57-1256-4ba4-af5c-a6da47efcb82&autoAuth=true&ctid=b148f14c-2397-402c-ab6a-1b4711177ac0'
    }
  }

  const changeDashboard = (dashboardKey) => {
    setLastAccessedDashboard(dashboardKey)
    setCurrentDashboard(dashboardKey)
    setLastUpdate(new Date())
  }

  const updateDashboard = () => {
    setLastUpdate(new Date())
  }

  return (
    <div className={styles.page}>
      <AnalyticsBar/>
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