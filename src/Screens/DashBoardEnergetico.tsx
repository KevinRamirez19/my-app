import { useState } from 'react';
import { motion } from 'framer-motion';

type Tab = {
  label: string;
  url?: string;
  icon: string;
};

type KPI = {
  label: string;
  value: string;
};

const tabs: Tab[] = [
  { label: 'Inicio', icon: '🏠' },
  { label: 'Panel de Control', url: 'https://app.powerbi.com/view?r=eyJrIjoiNTc4ZGFhZDktNzcwMC00NWYyLTk5ZGYtMTRlYzlmNDBmM2YyIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9', icon: '🧭' },
  { label: 'Resumen', url: 'https://app.powerbi.com/view?r=eyJrIjoiNzRkYzIxYmItYWY1Yi00OTYwLWE2NjgtY2E2YTY1ZDY0NzgxIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9', icon: '📊' },
  { label: 'Mapa', url: 'https://app.powerbi.com/view?r=eyJrIjoiZmJhYTBmMWQtOWUwMi00YjY3LWE5NWItODQ0MThkZWY4OGM5IiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9', icon: '🗺️' },
  { label: 'Análisis Temporal', url: 'https://app.powerbi.com/view?r=eyJrIjoiZGJjMGUzN2YtZTBjMy00NDcwLTljZmYtMGE4MDhjYjg5OTlkIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9', icon: '⏰' },
  { label: 'Condiciones Climáticas', url: 'https://app.powerbi.com/view?r=eyJrIjoiMjY1ZDhiZDEtM2Q0ZS00ZGZkLTg5M2EtYjAzYzdjNDYwMjU0IiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9', icon: '🌤️' },
  { label: 'Paneles', url: 'https://app.powerbi.com/view?r=eyJrIjoiYWVkMjQzNjQtMzBlNS00NzhhLWI4NWQtMjdlMzhjMTc0NjlkIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9', icon: '🔋' }
];

const kpis: KPI[] = [
  { label: 'Energía Generada (kWh)', value: '7,50 mill' },
  { label: 'Energía Consumida (kWh)', value: '8,49 mill' },
  { label: 'Eficiencia (%)', value: '89.23%' },
];

export default function SolarDashboard() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', color: 'black', width: '191%' }}>
      {/* Sidebar */}
      <aside style={{ width: '220px', backgroundColor: '#0d9488', color: 'white', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '1.5rem', fontWeight: '700', fontSize: '1.5rem', borderBottom: '1px solid #14b8a6' }}>
          ☀️ Solar Dashboard
        </div>
        <nav style={{ flexGrow: 1 }}>
          {tabs.map((tab, index) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(index)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '1rem',
                width: '100%',
                background: activeTab === index ? '#14b8a6' : 'transparent',
                border: 'none',
                color: 'inherit',
                cursor: 'pointer',
                fontWeight: activeTab === index ? '700' : '500',
                fontSize: '1rem',
                transition: 'background-color 0.3s'
              }}
            >
              <span>{tab.icon}</span> {tab.label}
            </button>
          ))}
        </nav>
        <footer style={{ padding: '1rem', fontSize: '0.8rem', borderTop: '1px solid #14b8a6', textAlign: 'center' }}>
          &copy; 2025 Energía Solar
        </footer>
      </aside>

      {/* Main content */}
      <main style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#f9fafb', width: '100%' }}>
        {activeTab === 0 ? (
          <section style={{
            padding: '1.5rem',
            backgroundColor: '#ffffff',
            flexGrow: 1,
            overflowY: 'auto',
            maxWidth: '2000px', // límite de ancho
            border: '1px solid #e5e7eb', // borde sutil (opcional)
            borderRadius: '10px', // bordes redondeados
            boxShadow: '0 2px 6px rgba(0,0,0,0.05)' // sombra ligera
          }}>

            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{ fontSize: '2.2rem', fontWeight: '700', color: '#0d9488', marginBottom: '1.5rem' }}
            >
              🌞 Sistema Inteligente para la Optimización de Energía Solar
            </motion.h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                style={{
                  flex: 1,
                  minWidth: '250px',
                  maxWidth: '800px',
                  backgroundColor: '#e0f2fe',
                  padding: '0.75rem',
                  borderRadius: '6px',
                  fontSize: '0.95rem',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}

              >
                <strong style={{ fontSize: '1rem' }}>🎯 Objetivo:</strong>
                <p>
                  Desarrollar un sistema inteligente de análisis basado en Big Data, mediante un dashboard para optimizar el uso de energías renovables, particularmente energía solar, en contextos urbanos, con el fin de mejorar la eficiencia energética y contribuir al desarrollo sostenible de las ciudades.
                </p>
              </motion.div>


              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0 }}
                style={{
                  flex: 2,
                  minWidth: '250px',
                  maxWidth: '800px',
                  backgroundColor: '#fef9c3',
                  padding: '0.75rem',
                  borderRadius: '6px',
                  fontSize: '0.95rem',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}
              >
                <strong style={{ fontSize: '1rem' }}>📘 Justificación:</strong>
                <p>
                  El desarrollo de un sistema inteligente apoyado en el análisis de datos masivos (Big Data) permite mejorar significativamente la gestión de la energía solar en zonas urbanas. A través del análisis del consumo energético, la producción solar, las condiciones climáticas y la demanda por zonas horarias o sectores específicos, se pueden identificar patrones útiles para optimizar el uso de la energía.
                </p>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              style={{
                flex: 1,
                minWidth: '250px',
                maxWidth: '800px',
                backgroundColor: '#d1fae5',
                padding: '0.75rem',
                borderRadius: '6px',
                fontSize: '0.95rem',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}
            >
              <strong style={{ fontSize: '1.5rem' }}>📈 Resultados:</strong>
              <p>
                La energía generada alcanzó 7.50 millones de kWh, con un consumo de 8.49 millones de kWh. La eficiencia promedio fue del 89.23%, demostrando un uso eficiente y sostenible de la energía solar en las zonas urbanas analizadas.
              </p>
            </motion.div>

          </section>
        ) : (
          <>
            <section style={{ display: 'flex', gap: '1rem', padding: '1rem', backgroundColor: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              {kpis.map((kpi) => (
                <div
                  key={kpi.label}
                  style={{
                    flex: 1,
                    padding: '1rem',
                    backgroundColor: '#d1fae5',
                    borderRadius: '8px',
                    textAlign: 'center',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                  }}
                >
                  <div style={{ fontSize: '0.9rem', color: '#065f46' }}>{kpi.label}</div>
                  <div style={{ fontSize: '1.8rem', fontWeight: '700', color: '#047857' }}>{kpi.value}</div>
                </div>
              ))}
            </section>
            <section style={{ flexGrow: 1, padding: '1rem' }}>
              {tabs[activeTab].url && (
                <iframe
                  src={tabs[activeTab].url}
                  title={tabs[activeTab].label}
                  style={{ width: '100%', height: '100%', border: 'none', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
                />
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}
