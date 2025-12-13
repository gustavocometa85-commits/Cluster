// Datos dummy simulando scorm_progress
const scormData = [
  {
    user_name: "Ana Pérez",
    user_email: "ana@example.com",
    course_id: "curso1",
    course_title: "Curso SCORM 1",
    status_completion: "completed",
    attempts: 2,
    score: 92,
    total_time_minutes: 45,
    last_access: "2025-12-10 15:32"
  },
  {
    user_name: "Luis Gómez",
    user_email: "luis@example.com",
    course_id: "curso1",
    course_title: "Curso SCORM 1",
    status_completion: "incomplete",
    attempts: 1,
    score: null,
    total_time_minutes: 12,
    last_access: "2025-12-09 11:05"
  },
  {
    user_name: "María López",
    user_email: "maria@example.com",
    course_id: "curso2",
    course_title: "Curso SCORM 2",
    status_completion: "completed",
    attempts: 3,
    score: 88,
    total_time_minutes: 60,
    last_access: "2025-12-11 09:20"
  },
  {
    user_name: "Carlos Rodriguez",
    user_email: "carlos@example.com",
    course_id: "curso1",
    course_title: "Curso SCORM 1",
    status_completion: "incomplete",
    attempts: 2,
    score: 75,
    total_time_minutes: 30,
    last_access: "2025-12-08 14:15"
  },
  {
    user_name: "Sandra Martinez",
    user_email: "sandra@example.com",
    course_id: "curso2",
    course_title: "Curso SCORM 2",
    status_completion: "notattempted",
    attempts: 0,
    score: null,
    total_time_minutes: 0,
    last_access: "N/A"
  }
];

function filtrarDatos() {
  const curso = document.getElementById("filtro-curso").value;
  const estado = document.getElementById("filtro-estado").value;

  return scormData.filter(d => {
    const okCurso = curso === "todos" || d.course_id === curso;
    const okEstado = estado === "todos" || d.status_completion === estado;
    return okCurso && okEstado;
  });
}

function actualizarKPIs(datos) {
  const total = datos.length;
  const completados = datos.filter(d => d.status_completion === "completed").length;
  const conScore = datos.filter(d => typeof d.score === "number");

  const tasa = total > 0 ? Math.round((completados / total) * 100) : 0;
  const promedioScore = conScore.length > 0
    ? Math.round(conScore.reduce((acc, d) => acc + d.score, 0) / conScore.length)
    : 0;
  const promedioTiempo = total > 0
    ? Math.round(datos.reduce((acc, d) => acc + d.total_time_minutes, 0) / total)
    : 0;

  document.getElementById("kpi-completion").textContent = tasa + " %";
  document.getElementById("kpi-score").textContent = promedioScore;
  document.getElementById("kpi-time").textContent = promedioTiempo;
  document.getElementById("kpi-users").textContent = total;
}

function actualizarTabla(datos) {
  const tbody = document.querySelector("#tabla-reportes tbody");
  tbody.innerHTML = "";

  datos.forEach(d => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${d.user_name}</td>
      <td>${d.course_title}</td>
      <td>${d.status_completion}</td>
      <td>${d.attempts}</td>
      <td>${d.score ?? "-"}</td>
      <td>${d.total_time_minutes}</td>
      <td>${d.last_access}</td>
    `;
    tbody.appendChild(tr);
  });
}

// Gráficos Chart.js
let chartCursos, chartHoras;

function actualizarChartCursos(datos) {
  const cursosMap = {};
  datos.forEach(d => {
    if (!cursosMap[d.course_title]) {
      cursosMap[d.course_title] = { total: 0, completados: 0 };
    }
    cursosMap[d.course_title].total++;
    if (d.status_completion === "completed") {
      cursosMap[d.course_title].completados++;
    }
  });

  const labels = Object.keys(cursosMap);
  const values = labels.map(title => {
    const { total, completados } = cursosMap[title];
    return total > 0 ? Math.round((completados / total) * 100) : 0;
  });

  const ctx = document.getElementById("chartCursos").getContext("2d");
  if (chartCursos) chartCursos.destroy();

  chartCursos = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: "% completado",
        data: values,
        backgroundColor: "#3b82f6"
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true, max: 100 }
      }
    }
  });
}

function actualizarChartHoras(datos) {
  // Dummy simple: sumar todas las horas y dividir en 3 meses
  const totalMin = datos.reduce((acc, d) => acc + d.total_time_minutes, 0);
  const porMes = totalMin / 3;
  const labels = ["Oct", "Nov", "Dic"];
  const values = [porMes * 0.8, porMes, porMes * 1.1];

  const ctx = document.getElementById("chartHoras").getContext("2d");
  if (chartHoras) chartHoras.destroy();

  chartHoras = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: "Minutos de capacitación",
        data: values,
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}

function refrescarReportes() {
  const datos = filtrarDatos();
  actualizarKPIs(datos);
  actualizarTabla(datos);
  actualizarChartCursos(datos);
  actualizarChartHoras(datos);
}

document.addEventListener("DOMContentLoaded", () => {
  const filtroCurso = document.getElementById("filtro-curso");
  const filtroEstado = document.getElementById("filtro-estado");

  if (filtroCurso && filtroEstado) {
    filtroCurso.addEventListener("change", refrescarReportes);
    filtroEstado.addEventListener("change", refrescarReportes);
    refrescarReportes();
  }
});
