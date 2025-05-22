import { useState } from 'react';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('resumen');

  const styles = {
    dashboardContainer: {
      display: 'flex',
      height: '100vh',
      fontFamily: 'Segoe UI, sans-serif',
      backgroundColor: '#f4f6f9',
      color: '#333',
    },
    sidebar: {
      width: '250px',
      backgroundColor: '#1e293b',
      color: '#fff',
      padding: '20px',
      boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
    },
    navList: {
      listStyle: 'none',
      padding: 0,
      marginTop: '30px',
    },
    navItem: (active: boolean) => ({
      padding: '12px 10px',
      cursor: 'pointer',
      borderRadius: '6px',
      marginBottom: '10px',
      transition: 'background 0.3s',
      backgroundColor: active ? '#3b82f6' : 'transparent',
      color: active ? '#fff' : '#cbd5e1',
      fontWeight: active ? '600' : 'normal',
      userSelect: 'none' as const,
    }),
    mainContent: {
      flex: 1,
      padding: '30px',
      overflowY: 'auto' as const,
    },
    header: {
      marginBottom: '20px',
      borderBottom: '2px solid #e2e8f0',
      paddingBottom: '10px',
    },
    section: {
      marginBottom: '40px',
    },
    sectionTitle: {
      fontSize: '1.25rem',
      marginBottom: '15px',
      fontWeight: 'bold',
      color: '#1e293b',
    },
    chartContainer: {
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
      minHeight: '300px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center' as const,
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse' as const,
      backgroundColor: '#fff',
      borderRadius: '10px',
      boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    },
    th: {
      borderBottom: '2px solid #1e293b',
      textAlign: 'left' as const,
      padding: '12px 15px',
      backgroundColor: '#e2e8f0',
      color: '#1e293b',
      fontWeight: '600',
    },
    td: {
      borderBottom: '1px solid #ddd',
      padding: '12px 15px',
      color: '#555',
    },
    trHover: {
      backgroundColor: '#f1f5f9',
    },
  };

  // Datos de ejemplo para comparación entre países
  const tableData = [
    { id: 1, pais: 'Colombia', consumo_kwh: 123450, mes: 'Enero 2025' },
    { id: 2, pais: 'México', consumo_kwh: 98765, mes: 'Enero 2025' },
    { id: 3, pais: 'Argentina', consumo_kwh: 156780, mes: 'Enero 2025' },
    { id: 4, pais: 'Chile', consumo_kwh: 43210, mes: 'Enero 2025' },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'resumen':
        return (
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Resumen Comparativo entre Países</h2>
            <div style={styles.chartContainer}>
              <p>Gráficos resumen comparativo aquí (ej. consumo total por país)</p>
            </div>
          </section>
        );
      case 'consumo':
        return (
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Consumo de Energía por País</h2>
            <div style={styles.chartContainer}>
              <p>Gráficos de consumo sectorial por país aquí</p>
            </div>
          </section>
        );
      case 'solar':
        return (
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Energías Renovables por País</h2>
            <div style={styles.chartContainer}>
              <p>Gráficos de energía solar y otras renovables aquí</p>
            </div>
          </section>
        );
      case 'comparativos':
        return (
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Indicadores Comparativos</h2>
            <div style={styles.chartContainer}>
              <p>Gráficos de indicadores energéticos comparados entre países</p>
            </div>
          </section>
        );
      case 'alertas':
        return (
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Alertas y Tendencias Globales</h2>
            <div style={styles.chartContainer}>
              <p>Gráficos de alertas y tendencias energéticas globales</p>
            </div>
          </section>
        );
      case 'reportes':
        return (
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Reportes Descargables</h2>
            <div style={styles.chartContainer}>
              <p>Reportes comparativos y análisis descargables aquí</p>
            </div>
          </section>
        );
      case 'datos':
        return (
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Datos Detallados por País</h2>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>País</th>
                  <th style={styles.th}>Consumo (kWh)</th>
                  <th style={styles.th}>Mes</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map(({ id, pais, consumo_kwh, mes }) => (
                  <tr
                    key={id}
                    style={{ cursor: 'default' }}
                    onMouseEnter={e =>
                      (e.currentTarget.style.backgroundColor = styles.trHover.backgroundColor)
                    }
                    onMouseLeave={e =>
                      (e.currentTarget.style.backgroundColor = 'transparent')
                    }
                  >
                    <td style={styles.td}>{pais}</td>
                    <td style={styles.td}>{consumo_kwh.toLocaleString()}</td>
                    <td style={styles.td}>{mes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div style={styles.dashboardContainer}>
      <aside style={styles.sidebar}>
        <h2>Dashboard Energético</h2>
        <ul style={styles.navList}>
          <li
            style={styles.navItem(activeSection === 'resumen')}
            onClick={() => setActiveSection('resumen')}
          >
            Resumen Comparativo
          </li>
          <li
            style={styles.navItem(activeSection === 'consumo')}
            onClick={() => setActiveSection('consumo')}
          >
            Consumo por País
          </li>
          <li
            style={styles.navItem(activeSection === 'solar')}
            onClick={() => setActiveSection('solar')}
          >
            Energías Renovables
          </li>
          <li
            style={styles.navItem(activeSection === 'comparativos')}
            onClick={() => setActiveSection('comparativos')}
          >
            Indicadores Comparativos
          </li>
          <li
            style={styles.navItem(activeSection === 'alertas')}
            onClick={() => setActiveSection('alertas')}
          >
            Alertas Globales
          </li>
          <li
            style={styles.navItem(activeSection === 'reportes')}
            onClick={() => setActiveSection('reportes')}
          >
            Reportes
          </li>
          <li
            style={styles.navItem(activeSection === 'datos')}
            onClick={() => setActiveSection('datos')}
          >
            Datos en Tabla
          </li>
        </ul>
      </aside>

      <main style={styles.mainContent}>
        <header style={styles.header}>
          <h1>Dashboard Comparativo de Energía por País</h1>
        </header>

        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;
