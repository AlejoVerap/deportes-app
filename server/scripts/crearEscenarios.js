const mongoose = require('mongoose');
const Escenario = require('../models/escenario.model');

const escenarios = [
  {
    nombre: 'Cancha de Fútbol 11',
    tipo: 'fútbol',
    ubicacion: 'Complejo Deportivo Norte',
    descripcion: 'Cancha profesional de césped sintético',
    imagenes: ['https://images.unsplash.com/photo-1506744038136-46273834b3fb'],
    condicionesUso: 'Uso con calzado adecuado',
    precio: 120000,
    disponibilidad: [],
  },
  {
    nombre: 'Cancha de Fútbol 5',
    tipo: 'fútbol',
    ubicacion: 'Barrio El Prado',
    descripcion: 'Cancha sintética para 10 personas',
    imagenes: ['https://images.unsplash.com/photo-1517649763962-0c623066013b'],
    condicionesUso: 'No se permite comida',
    precio: 60000,
    disponibilidad: [],
  },
  {
    nombre: 'Cancha de Baloncesto',
    tipo: 'baloncesto',
    ubicacion: 'Polideportivo Central',
    descripcion: 'Cancha techada con gradería',
    imagenes: ['https://images.unsplash.com/photo-1464983953574-0892a716854b'],
    condicionesUso: 'Uso con tenis deportivos',
    precio: 50000,
    disponibilidad: [],
  },
  {
    nombre: 'Cancha de Tenis',
    tipo: 'tenis',
    ubicacion: 'Club Campestre',
    descripcion: 'Cancha de arcilla',
    imagenes: ['https://images.unsplash.com/photo-1503342217505-b0a15ec3261c'],
    condicionesUso: 'Solo raquetas autorizadas',
    precio: 70000,
    disponibilidad: [],
  },
  {
    nombre: 'Piscina Olímpica',
    tipo: 'natación',
    ubicacion: 'Complejo Acuático',
    descripcion: 'Piscina de 50 metros',
    imagenes: ['https://images.unsplash.com/photo-1509228468518-180dd4864904'],
    condicionesUso: 'Uso de gorro obligatorio',
    precio: 90000,
    disponibilidad: [],
  },
  {
    nombre: 'Gimnasio Municipal',
    tipo: 'gimnasio',
    ubicacion: 'Centro',
    descripcion: 'Gimnasio con máquinas modernas',
    imagenes: ['https://images.unsplash.com/photo-1519864600265-abb23847ef2c'],
    condicionesUso: 'Llevar toalla',
    precio: 40000,
    disponibilidad: [],
  },
  {
    nombre: 'Cancha de Voleibol',
    tipo: 'voleibol',
    ubicacion: 'Parque Sur',
    descripcion: 'Cancha de arena',
    imagenes: ['https://images.unsplash.com/photo-1517649763962-0c623066013b'],
    condicionesUso: 'Uso sin calzado',
    precio: 35000,
    disponibilidad: [],
  },
  {
    nombre: 'Pista de Atletismo',
    tipo: 'atletismo',
    ubicacion: 'Estadio Municipal',
    descripcion: 'Pista de tartán',
    imagenes: ['https://images.unsplash.com/photo-1464983953574-0892a716854b'],
    condicionesUso: 'Solo tenis de pista',
    precio: 30000,
    disponibilidad: [],
  },
  {
    nombre: 'Cancha de Squash',
    tipo: 'squash',
    ubicacion: 'Club Deportivo',
    descripcion: 'Cancha cerrada',
    imagenes: ['https://images.unsplash.com/photo-1503342217505-b0a15ec3261c'],
    condicionesUso: 'Raquetas propias',
    precio: 45000,
    disponibilidad: [],
  }
];

mongoose.connect('mongodb://127.0.0.1:27017/deportes-app', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    await Escenario.deleteMany({});
    await Escenario.insertMany(escenarios);
    console.log('Escenarios creados correctamente');
    process.exit();
  })
  .catch(err => {
    console.error('Error al crear escenarios:', err);
    process.exit(1);
  });
