import { Searchbar } from '../Components/Searchbar.jsx'
import { Result } from './../Components/Result.jsx';
import './styles/SearchResultApp.css';

export const SearchResultApp = ({results}) => {
  return (
    <>
        <Searchbar></Searchbar>
        <section id='results'>
          <div className="results-list">
            {results.map(result => (
              <Result key={result.id} result={result}></Result>
            ))}
          </div>
        </section>
    </>
  )
}
