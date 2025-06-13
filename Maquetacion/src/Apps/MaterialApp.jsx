import Information from '../Components/Information'
import { Material } from '../Components/Material';
import {Vote} from '../Components/Vote';
import './styles/MaterialApp.css';

export const MaterialApp = ({result}) => {
  return (
    <>
    <section className="container">
      <h1 className='title'>{result.title}</h1>
      <Material />
      <Information result={result} />
      <div className='material-icons'>
        <Vote result={result}/>
      </div>

      <></>
    </section>
    </>
  );
}
