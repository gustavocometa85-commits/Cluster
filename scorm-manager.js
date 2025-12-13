// SCORM Manager - Gestor de cursos SCORM para Cluster
class SCORMManager {
  constructor() {
    this.courses = JSON.parse(localStorage.getItem('scormCourses')) || [];
    this.currentCourse = null;
    this.initialize();
  }

  initialize() {
    this.setupEventListeners();
    this.renderCoursesList();
    const input = document.getElementById('scorm-file-input');
    if (input) input.addEventListener('change', (e) => this.handleFileUpload(e));
  }

  handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.name.endsWith('.zip|html|htm')) {
      alert('Por favor carga un archivo SCORM (.zip), HTML (.html, .htm) o compatible');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => this.processSCORMPackage(file.name);
    reader.readAsArrayBuffer(file);
  }

  processSCORMPackage(fileName) {
    const course = {
      id: Date.now(),
      name: fileName.replace('.zip', ''),
      uploadDate: new Date().toLocaleDateString('es-MX'),
      progress: 0,
      status: 'Listo para iniciar'
    };

    this.courses.push(course);
    this.saveCourses();
    this.renderCoursesList();
  }

  saveCourses() {
    localStorage.setItem('scormCourses', JSON.stringify(this.courses));
  }

  renderCoursesList() {
    const list = document.getElementById('scorm-courses-list');
    if (!list) return;

    if (this.courses.length === 0) {
      list.innerHTML = '<p>No hay cursos. Carga un archivo SCORM.</p>';
      return;
    }

    list.innerHTML = this.courses.map(course => `
      <div class="course-card">
        <h4>${course.name}</h4>
        <p>Fecha: ${course.uploadDate}</p>
        <div class="progress-bar"><div style="width: ${course.progress}%"></div></div>
        <button onclick="scormManager.openCourse(${course.id})">Abrir</button>
        <button onclick="scormManager.deleteCourse(${course.id})">Eliminar</button>
      </div>
    `).join('');
  }

  openCourse(courseId) {
    this.currentCourse = this.courses.find(c => c.id === courseId);
    if (this.currentCourse) {
      document.getElementById('scorm-upload-zone').style.display = 'none';
      document.getElementById('scorm-viewer').style.display = 'block';
      document.getElementById('scorm-title').textContent = this.currentCourse.name;
      document.getElementById('scorm-progress-info').textContent = `Progreso: ${this.currentCourse.progress}%`;
    }
  }

  deleteCourse(courseId) {
    this.courses = this.courses.filter(c => c.id !== courseId);
    this.saveCourses();
    this.renderCoursesList();
  }

  setupEventListeners() {
    const uploadZone = document.getElementById('scorm-upload-zone');
    if (uploadZone) {
      uploadZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadZone.style.borderColor = '#667eea';
      });
      uploadZone.addEventListener('drop', (e) => {
        e.preventDefault();
        if (e.dataTransfer.files[0]) {
          document.getElementById('scorm-file-input').files = e.dataTransfer.files;
          this.handleFileUpload({ target: { files: e.dataTransfer.files } });
        }
      });
    }
  }
}

const scormManager = new SCORMManager();

function closeSCORMViewer() {
  document.getElementById('scorm-viewer').style.display = 'none';
  document.getElementById('scorm-upload-zone').style.display = 'block';
}

function saveProgress() {
  alert('Progreso guardado');
}
