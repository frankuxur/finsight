const DashboardHeader = ({ showStats, setShowStats }) => {
  return (
    <header className="dashboard__main-header">
      <button className={`dashboard__main-button ${showStats ? 'active' : ''}`} onClick={() => setShowStats(true)}>
        <i className="ri-bar-chart-line icon"></i>
        <span>Stats</span>
      </button>
      <button className={`dashboard__main-button ${showStats ? '' : 'active'}`} onClick={() => setShowStats(false)}>
        <i className="ri-add-line icon"></i>
        <span>Add Transaction</span>
      </button>
    </header>
  )
}

export default DashboardHeader