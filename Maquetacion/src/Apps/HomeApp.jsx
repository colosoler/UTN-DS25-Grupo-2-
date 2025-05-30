import { Carrera } from '../Components/Carrera.jsx';
import { Searchbar } from '../Components/Searchbar.jsx';
import './styles/HomeApp.css';

const carreras = [
  { id: 1, 
    name: 'Ingeniería en Sistemas', 
    image:'https://www.google.com/search?sca_esv=3daf0913dc600547&rlz=1C1GCEU_esAR1161AR1161&sxsrf=AE3TifPIjVujl5wD8ts6EvxnASzqKABb1A:1748469733793&q=ingenieria+en+sistemas+icono&udm=2&fbs=AIIjpHx4nJjfGojPVHhEACUHPiMQht6_BFq6vBIoFFRK7qchKL_ojr3cM9VEz3-sGXDgSIVKY0s5WrJRJaM2g4iCN_WZWgD9NdXmHSHVKNntviVhJf_Of57WHiY3Hi-IBSD5JeOLl5K3ATQBZmLFjun0cm2Ga3B3V0tmrVrgtg5JemoSx8oZEifK_kcew5u9yltg7m9q60gRxIrHNS9ixS--MQCm6yI46Q&sa=X&ved=2ahUKEwj8oYirlceNAxU3npUCHcZJMo8QtKgLegQIEhAB&biw=1366&bih=607&dpr=1#vhid=njajZcanJQDf9M&vssid=mosaic'
  },
  { id: 2, 
    name: 'Ingeniería en Sistemas', 
    image:'https://www.google.com/search?sca_esv=3daf0913dc600547&rlz=1C1GCEU_esAR1161AR1161&sxsrf=AE3TifPIjVujl5wD8ts6EvxnASzqKABb1A:1748469733793&q=ingenieria+en+sistemas+icono&udm=2&fbs=AIIjpHx4nJjfGojPVHhEACUHPiMQht6_BFq6vBIoFFRK7qchKL_ojr3cM9VEz3-sGXDgSIVKY0s5WrJRJaM2g4iCN_WZWgD9NdXmHSHVKNntviVhJf_Of57WHiY3Hi-IBSD5JeOLl5K3ATQBZmLFjun0cm2Ga3B3V0tmrVrgtg5JemoSx8oZEifK_kcew5u9yltg7m9q60gRxIrHNS9ixS--MQCm6yI46Q&sa=X&ved=2ahUKEwj8oYirlceNAxU3npUCHcZJMo8QtKgLegQIEhAB&biw=1366&bih=607&dpr=1#vhid=njajZcanJQDf9M&vssid=mosaic'
  },
  { id: 3, 
    name: 'Ingeniería en Sistemas', 
    image:'https://www.google.com/search?sca_esv=3daf0913dc600547&rlz=1C1GCEU_esAR1161AR1161&sxsrf=AE3TifPIjVujl5wD8ts6EvxnASzqKABb1A:1748469733793&q=ingenieria+en+sistemas+icono&udm=2&fbs=AIIjpHx4nJjfGojPVHhEACUHPiMQht6_BFq6vBIoFFRK7qchKL_ojr3cM9VEz3-sGXDgSIVKY0s5WrJRJaM2g4iCN_WZWgD9NdXmHSHVKNntviVhJf_Of57WHiY3Hi-IBSD5JeOLl5K3ATQBZmLFjun0cm2Ga3B3V0tmrVrgtg5JemoSx8oZEifK_kcew5u9yltg7m9q60gRxIrHNS9ixS--MQCm6yI46Q&sa=X&ved=2ahUKEwj8oYirlceNAxU3npUCHcZJMo8QtKgLegQIEhAB&biw=1366&bih=607&dpr=1#vhid=njajZcanJQDf9M&vssid=mosaic'
  },
  { id: 4, 
    name: 'Ingeniería en Sistemas', 
    image:'https://www.google.com/search?sca_esv=3daf0913dc600547&rlz=1C1GCEU_esAR1161AR1161&sxsrf=AE3TifPIjVujl5wD8ts6EvxnASzqKABb1A:1748469733793&q=ingenieria+en+sistemas+icono&udm=2&fbs=AIIjpHx4nJjfGojPVHhEACUHPiMQht6_BFq6vBIoFFRK7qchKL_ojr3cM9VEz3-sGXDgSIVKY0s5WrJRJaM2g4iCN_WZWgD9NdXmHSHVKNntviVhJf_Of57WHiY3Hi-IBSD5JeOLl5K3ATQBZmLFjun0cm2Ga3B3V0tmrVrgtg5JemoSx8oZEifK_kcew5u9yltg7m9q60gRxIrHNS9ixS--MQCm6yI46Q&sa=X&ved=2ahUKEwj8oYirlceNAxU3npUCHcZJMo8QtKgLegQIEhAB&biw=1366&bih=607&dpr=1#vhid=njajZcanJQDf9M&vssid=mosaic'
  },
  { id: 5, 
    name: 'Ingeniería en Sistemas', 
    image:'https://www.google.com/search?sca_esv=3daf0913dc600547&rlz=1C1GCEU_esAR1161AR1161&sxsrf=AE3TifPIjVujl5wD8ts6EvxnASzqKABb1A:1748469733793&q=ingenieria+en+sistemas+icono&udm=2&fbs=AIIjpHx4nJjfGojPVHhEACUHPiMQht6_BFq6vBIoFFRK7qchKL_ojr3cM9VEz3-sGXDgSIVKY0s5WrJRJaM2g4iCN_WZWgD9NdXmHSHVKNntviVhJf_Of57WHiY3Hi-IBSD5JeOLl5K3ATQBZmLFjun0cm2Ga3B3V0tmrVrgtg5JemoSx8oZEifK_kcew5u9yltg7m9q60gRxIrHNS9ixS--MQCm6yI46Q&sa=X&ved=2ahUKEwj8oYirlceNAxU3npUCHcZJMo8QtKgLegQIEhAB&biw=1366&bih=607&dpr=1#vhid=njajZcanJQDf9M&vssid=mosaic'
  },
  { id: 6, 
    name: 'Ingeniería en Sistemas', 
    image:'https://www.google.com/search?sca_esv=3daf0913dc600547&rlz=1C1GCEU_esAR1161AR1161&sxsrf=AE3TifPIjVujl5wD8ts6EvxnASzqKABb1A:1748469733793&q=ingenieria+en+sistemas+icono&udm=2&fbs=AIIjpHx4nJjfGojPVHhEACUHPiMQht6_BFq6vBIoFFRK7qchKL_ojr3cM9VEz3-sGXDgSIVKY0s5WrJRJaM2g4iCN_WZWgD9NdXmHSHVKNntviVhJf_Of57WHiY3Hi-IBSD5JeOLl5K3ATQBZmLFjun0cm2Ga3B3V0tmrVrgtg5JemoSx8oZEifK_kcew5u9yltg7m9q60gRxIrHNS9ixS--MQCm6yI46Q&sa=X&ved=2ahUKEwj8oYirlceNAxU3npUCHcZJMo8QtKgLegQIEhAB&biw=1366&bih=607&dpr=1#vhid=njajZcanJQDf9M&vssid=mosaic'
  },
];

export const HomeApp = () => {
  return (
    <>
    <Searchbar></Searchbar>
    <section id='carreras'>
      <h1>Seleccioná tu carrera</h1>
      <div className="carreras-list">
        {carreras.map(carrera => (
          <Carrera key={carrera.id} carrera={carrera}></Carrera>
        ))}
      </div>
    </section>
    </>
  )
}