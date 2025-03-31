const express = require('express');
const morgan = require('morgan');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(morgan('dev'));

let cursos = [
    { id: 1, nombre: 'Curso de Node.js' },
    { id: 2, nombre: 'Curso de React' },
    { id: 3, nombre: 'Curso de Base de Datos' }
];

let participantes = [
    { id: 1, nombre: 'Juan Pérez', cursoId: 1, estado: 'activo' },
    { id: 2, nombre: 'María López', cursoId: 1, estado: 'retirado' },
    { id: 3, nombre: 'Carlos Gómez', cursoId: 2, estado: 'activo' },
    { id: 4, nombre: 'Ana Torres', cursoId: 3, estado: 'desertor' }
];


app.get('/curso', (req, res) => {
    res.json(cursos);
});

app.get('/curso/:id', (req, res) => {
    const curso = cursos.find(c => c.id === parseInt(req.params.id));
    curso ? res.json(curso) : res.status(404).json({ message: 'Curso no encontrado' });
});

app.get('/curso/:id/participantes', (req, res) => {
    const cursoId = parseInt(req.params.id);
    const participantesCurso = participantes.filter(p => p.cursoId === cursoId);
    res.json(participantesCurso);
});

app.get('/curso/:id/participantes/:idPart', (req, res) => {
    const participante = participantes.find(p => p.id === parseInt(req.params.idPart));
    participante ? res.json(participante) : res.status(404).json({ message: 'Participante no encontrado' });
});

app.get('/curso/:id/participantes/estado/:estado', (req, res) => {
    const { id, estado } = req.params;
    const participantesFiltrados = participantes.filter(p => p.cursoId === parseInt(id) && p.estado === estado);
    res.json(participantesFiltrados);
});

app.post('/curso', (req, res) => {
    const nuevoCurso = { id: cursos.length + 1, ...req.body };
    cursos.push(nuevoCurso);
    res.status(201).json(nuevoCurso);
});

app.post('/curso/:id/participantes', (req, res) => {
    const nuevoParticipante = { id: participantes.length + 1, cursoId: parseInt(req.params.id), ...req.body };
    participantes.push(nuevoParticipante);
    res.status(201).json(nuevoParticipante);
});


app.put('/curso/:id/participantes/estado/:estado', (req, res) => {
    const { id, estado } = req.params;
    participantes = participantes.map(p => p.cursoId === parseInt(id) ? { ...p, estado } : p);
    res.json({ message: 'Estado actualizado' });
});

app.delete('/curso/:id/participante/:idPart', (req, res) => {
    const { idPart } = req.params;
    participantes = participantes.filter(p => p.id !== parseInt(idPart));
    res.json({ message: 'Participante eliminado' });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
