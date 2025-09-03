const carreras = [
  {
    name: 'Ingeniería Mecánica',
    icon: 'bi-gear-fill',
    materias: [
      {
        anio: 1,
        materiaId: 1
      }
    ]
  },
  {
    name: 'Ingeniería en Sistemas de Información',
    icon: 'bi-laptop',
    materias: [
      {
        anio: 1,
        materiaId: 1
      }
    ]
  },
  {
    name: 'Ingeniería Química',
    icon: 'bi-flask',
    materias: [
      {
        anio: 1,
        materiaId: 1
      }
    ]
  },
  {
    name: 'Ingeniería Civil',
    icon: 'bi-building',
    materias: [
      {
        anio: 1,
        materiaId: 1
      }
    ]
  },
  {
    name: 'Ingeniería Industrial',
    icon: 'bi-tools',
    materias: [
      {
        anio: 1,
        materiaId: 1
      }
    ]
  },
  {
    name: 'Ingeniería Eléctrica',
    icon: 'bi-lightning-charge-fill',
    materias: [
      {
        anio: 1,
        materiaId: 1
      }
    ]
  }
];

function cargar() {
  carreras.forEach( async (carrera)=> {
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(carrera)
    }
    const response = await fetch('http://localhost:3000/carreras',options)
    const data = await response.json()
    console.log(data)
  })
} 