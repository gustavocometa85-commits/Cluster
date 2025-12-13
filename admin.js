// Función para mostrar pestañas del administrador
function showAdminTab(tabName, buttonElement) {
  // Ocultar todos los tabs
  const tabs = document.querySelectorAll('[id^="admin-"]');
  tabs.forEach(tab => {
    tab.style.display = 'none';
  });
  
  // Mostrar tab seleccionado
  const selectedTab = document.getElementById('admin-' + tabName);
  if (selectedTab) {
    selectedTab.style.display = 'block';
  }
  
  // Actualizar estilos de botones
  const buttons = document.querySelectorAll('[onclick*="showAdminTab"]');
  buttons.forEach(btn => {
    btn.style.color = '#666';
    btn.style.borderBottom = '3px solid transparent';
  });
  
  // Destacar botón seleccionado
  if (buttonElement) {
    buttonElement.style.color = '#FF6B6B';
    buttonElement.style.borderBottom = '3px solid #FF6B6B';
  }
}

// Funciones de ejemplo para gestión de usuarios
function editarUsuario(usuarioId) {
  alert('✍️ Editar usuario: ' + usuarioId);
}

function eliminarUsuario(usuarioId) {
  alert('🗑️ Eliminar usuario: ' + usuarioId);
}

// Funciones para gestión de cursos
function editarCurso(cursoId) {
  alert('📚 Editar curso: ' + cursoId);
}

function desactivarCurso(cursoId) {
  alert('🚭 Desactivar curso: ' + cursoId);
}

// Función para agregar nuevo usuario
function agregarUsuario() {
  const nombre = prompt('Nombre del usuario:');
  const email = prompt('Email del usuario:');
  const rol = prompt('Rol (Alumno/Instructor/Administrador):');
  
  if (nombre && email && rol) {
    alert('Usuario agregado: ' + nombre + ' (' + email + ') - Rol: ' + rol);
  }
}

// Función para agregar nuevo curso
function agregarCurso() {
  const titulo = prompt('Título del curso:');
  const duracion = prompt('Duración (en horas):');
  
  if (titulo && duracion) {
    alert('Curso agregado: ' + titulo + ' (' + duracion + ' horas)');
  }
}

// Exportar datos del admin
function exportarDatosAdmin() {
  alert('💾 Generando reporte administrativo...');
  // Aquí iría la lógica de exportación
}

// Estadística mock - en producción vendería del backend
const adminStats = {
  usuariosRegistrados: 45,
  cursosDisponibles: 8,
  horasCompletadas: 156,
  tasaCumplimiento: 92
};

console.log('Admin Dashboard cargado', adminStats);
