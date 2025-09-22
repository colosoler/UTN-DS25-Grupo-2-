import Information from '../Components/Information'
import { Material } from '../Components/Material';
import {Buttons} from '../Components/Buttons';
import './styles/MaterialPage.css';

export const MaterialPage = ({result}) => {
  const link = `${window.location.origin}/material/${result.id}`;

  return (
    <>
    <section className="container">
      <h1 className='title'>{result.title}</h1>
      <Material />
      <Information result={result} />
      <div className='material-icons'>
        <Buttons result={result} shareUrl={link}/>
      </div>
    </section>
    </>
  );
}