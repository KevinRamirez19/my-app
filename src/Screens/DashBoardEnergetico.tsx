import React, { useState, useEffect } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { motion } from 'framer-motion';

// Registrar componentes de ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

// Tipos
type Pais = 'Colombia' | 'Canada';

type DatosConsumo = {
  year: number;
  consumo: number; // consumo energético (ejemplo)
};

type DashboardData = {
  consumoAnual: DatosConsumo[];
  renovablesPorcentaje: number; // para Pie
  barrasComparacion: number[]; // ejemplo: consumo por sector
};

// Datos ficticios para ejemplo
const datosFicticios: Record<Pais, DashboardData> = {
  Colombia: {
    consumoAnual: [
      { year: 2018, consumo: 150 },
      { year: 2019, consumo: 160 },
      { year: 2020, consumo: 140 },
      { year: 2021, consumo: 170 },
      { year: 2022, consumo: 180 },
    ],
    renovablesPorcentaje: 40,
    barrasComparacion: [60, 40, 30, 20, 10],
  },
  Canada: {
    consumoAnual: [
      { year: 2018, consumo: 200 },
      { year: 2019, consumo: 210 },
      { year: 2020, consumo: 190 },
      { year: 2021, consumo: 230 },
      { year: 2022, consumo: 250 },
    ],
    renovablesPorcentaje: 55,
    barrasComparacion: [90, 60, 40, 30, 25],
  },
};

// Animaciones para framer-motion
const containerAnim = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemAnim = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// Spinner simple
const Spinner = () => (
  <div
    aria-label="Cargando datos"
    role="status"
    style={{
      border: '4px solid #ccc',
      borderTop: '4px solid #1976d2',
      borderRadius: '50%',
      width: 40,
      height: 40,
      animation: 'spin 1s linear infinite',
      margin: '40px auto',
    }}
  />
);

// Añadimos keyframes para spinner en global CSS (puedes agregar en tu CSS)
// @keyframes spin {
//   0% { transform: rotate(0deg); }
//   100% { transform: rotate(360deg); }
// }

const DashboardEnergetico: React.FC = () => {
  // Estados
  const [modoOscuro, setModoOscuro] = useState(false);
  const [modoAltoContraste, setModoAltoContraste] = useState(false);
  const [anioFiltro, setAnioFiltro] = useState(2022);
  const [cargando, setCargando] = useState(true);

  // Simula carga datos
  useEffect(() => {
    const timer = setTimeout(() => setCargando(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Preparamos los datos para las gráficas según el año filtro
  const prepararDatosLinea = (pais: Pais) => {
    const data = datosFicticios[pais].consumoAnual.filter((d) => d.year <= anioFiltro);
    return {
      labels: data.map((d) => d.year.toString()),
      datasets: [
        {
          label: `Consumo energético ${pais}`,
          data: data.map((d) => d.consumo),
          borderColor: pais === 'Colombia' ? '#1976d2' : '#388e3c',
          backgroundColor: 'transparent',
          fill: false,
          tension: 0.2,
        },
      ],
    };
  };

  const prepararDatosBarras = (pais: Pais) => ({
    labels: ['Sector Industrial', 'Residencial', 'Comercial', 'Transporte', 'Agricultura'],
    datasets: [
      {
        label: `Consumo por sector - ${pais}`,
        data: datosFicticios[pais].barrasComparacion,
        backgroundColor: pais === 'Colombia' ? '#1976d2' : '#388e3c',
      },
    ],
  });

  const prepararDatosPie = (pais: Pais) => ({
    labels: ['Renovable', 'No renovable'],
    datasets: [
      {
        label: '% Renovables',
        data: [datosFicticios[pais].renovablesPorcentaje, 100 - datosFicticios[pais].renovablesPorcentaje],
        backgroundColor: ['#43a047', '#e53935'],
      },
    ],
  });

  // Exportar gráfica a PNG
  const exportChartAsImage = (id: string) => {
    const chart = document.getElementById(id) as HTMLCanvasElement | null;
    if (chart) {
      const url = chart.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = `${id}.png`;
      a.click();
    }
  };

  // Temas de colores
  const temaBase = modoOscuro
    ? {
        background: '#121212',
        color: '#fff',
      }
    : {
        background: '#f5f5f5',
        color: '#000',
      };

  const temaAltoContrasteColores = {
    background: '#000',
    color: '#FFD500',
  };

  // Estilo principal considerando modo alto contraste
  const estiloPrincipal = modoAltoContraste ? temaAltoContrasteColores : temaBase;

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: estiloPrincipal.background,
        color: estiloPrincipal.color,
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
        padding: '20px',
        transition: 'all 0.3s ease',
      }}
    >
      <header style={{ marginBottom: 20, textAlign: 'center' }}>
        <h1 tabIndex={0} aria-label="Dashboard comparativo energético Colombia y Canadá">
          📊 Comparativa Energética: Renovable y ELectrica
        </h1>

        <div style={{ marginTop: 10, display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
          <button
            aria-pressed={modoOscuro}
            onClick={() => setModoOscuro(!modoOscuro)}
            style={{
              padding: '8px 12px',
              cursor: 'pointer',
              borderRadius: 4,
              border: 'none',
              backgroundColor: modoOscuro ? '#1976d2' : '#ccc',
              color: modoOscuro ? '#fff' : '#000',
              fontWeight: 'bold',
              minWidth: 110,
            }}
          >
            Modo Oscuro
          </button>

          <button
            aria-pressed={modoAltoContraste}
            onClick={() => setModoAltoContraste(!modoAltoContraste)}
            style={{
              padding: '8px 12px',
              cursor: 'pointer',
              borderRadius: 4,
              border: 'none',
              backgroundColor: modoAltoContraste ? '#FFD500' : '#ccc',
              color: modoAltoContraste ? '#000' : '#000',
              fontWeight: 'bold',
              minWidth: 140,
            }}
          >
            Modo Alto Contraste
          </button>

          <label htmlFor="selectAnio" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            Año máximo:
            <select
              id="selectAnio"
              aria-label="Filtro por año máximo"
              value={anioFiltro}
              onChange={(e) => setAnioFiltro(Number(e.target.value))}
              style={{ padding: 6, borderRadius: 4 }}
            >
              {[2018, 2019, 2020, 2021, 2022].map((anio) => (
                <option key={anio} value={anio}>
                  {anio}
                </option>
              ))}
            </select>
          </label>
        </div>
      </header>

      {cargando ? (
        <Spinner />
      ) : (
        <motion.main
          initial="hidden"
          animate="visible"
          variants={containerAnim}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))',
            gap: 20,
            maxWidth: 1200,
            margin: '0 auto',
          }}
        >
          {/* Repetimos para Colombia y Canadá */}
          {(['Colombia', 'Canada'] as Pais[]).map((pais) => (
            <section
              key={pais}
              aria-labelledby={`titulo-${pais}`}
              style={{
                backgroundColor: modoAltoContraste
                  ? '#000'
                  : modoOscuro
                  ? '#263238'
                  : '#fff',
                borderRadius: 8,
                padding: 16,
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              }}
            >
              <h2 id={`titulo-${pais}`} tabIndex={0} style={{ textAlign: 'center', marginBottom: 12 }}>
                {pais === 'Canada' ? '🇨🇦 Canadá' : '🇨🇴 Colombia'}
              </h2>

              {/* Gráfica de barras */}
              <motion.div
                variants={itemAnim}
                role="img"
                aria-label={`Gráfica de barras para consumo por sector en ${pais}`}
                style={{ marginBottom: 20 }}
              >
                <Bar
                  id={`barras-${pais}`}
                  data={prepararDatosBarras(pais)}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { display: true, position: 'bottom' },
                      tooltip: { enabled: true },
                    },
                  }}
                />
                <button
                  onClick={() => exportChartAsImage(`barras-${pais}`)}
                  aria-label={`Exportar gráfica de barras de ${pais} como imagen PNG`}
                  style={{
                    marginTop: 8,
                    padding: '6px 10px',
                    cursor: 'pointer',
                    borderRadius: 4,
                    border: 'none',
                    backgroundColor: '#1976d2',
                    color: '#fff',
                  }}
                >
                  Exportar PNG
                </button>
              </motion.div>

              {/* Gráfica de pastel */}
              <motion.div
                variants={itemAnim}
                role="img"
                aria-label={`Gráfica de pastel de distribución renovable en ${pais}`}
                style={{ marginBottom: 20 }}
              >
                <Pie
                  id={`pie-${pais}`}
                  data={prepararDatosPie(pais)}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { display: true, position: 'bottom' },
                      tooltip: { enabled: true },
                    },
                  }}
                />
                <button
                  onClick={() => exportChartAsImage(`pie-${pais}`)}
                  aria-label={`Exportar gráfica de pastel de ${pais} como imagen PNG`}
                  style={{
                    marginTop: 8,
                    padding: '6px 10px',
                    cursor: 'pointer',
                    borderRadius: 4,
                    border: 'none',
                    backgroundColor: '#1976d2',
                    color: '#fff',
                  }}
                >
                  Exportar PNG
                </button>
              </motion.div>

              {/* Gráfica de línea */}
              <motion.div
                variants={itemAnim}
                role="img"
                aria-label={`Gráfica de línea de evolución del consumo en ${pais} hasta ${anioFiltro}`}
              >
                <Line
                  id={`linea-${pais}`}
                  data={prepararDatosLinea(pais)}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { display: true, position: 'bottom' },
                      tooltip: { enabled: true },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                      },
                    },
                  }}
                />
                <button
                  onClick={() => exportChartAsImage(`linea-${pais}`)}
                  aria-label={`Exportar gráfica de línea de ${pais} como imagen PNG`}
                  style={{
                    marginTop: 8,
                    padding: '6px 10px',
                    cursor: 'pointer',
                    borderRadius: 4,
                    border: 'none',
                    backgroundColor: '#1976d2',
                    color: '#fff',
                  }}
                >
                  Exportar PNG
                </button>
              </motion.div>
            </section>
          ))}
        </motion.main>
      )}

      <footer
        role="contentinfo"
        style={{
          textAlign: 'center',
          padding: 20,
          backgroundColor: modoAltoContraste
            ? '#000'
            : modoOscuro
            ? '#263238'
            : '#1976d2',
          color: modoAltoContraste ? '#FFD500' : modoOscuro ? '#ffc107' : '#fff',
          borderRadius: 8,
          maxWidth: 900,
          margin: '40px auto 20px',
          fontSize: 14,
          userSelect: 'none',
        }}
      >
        <p tabIndex={0}>&copy; {new Date().getFullYear()} Comparativo Energético. Todos los derechos reservados.</p>
      </footer>

      {/* Spinner keyframes in style tag for self-contained example */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          button:focus {
            outline: 3px solid #ffd500;
            outline-offset: 2px;
          }
        `}
      </style>
    </div>
  );
};

export default DashboardEnergetico;
