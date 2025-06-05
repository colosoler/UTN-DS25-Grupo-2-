import { Searchbar } from '../Components/Searchbar.jsx'
import { Result } from './../Components/Result.jsx'
import './styles/SearchResultApp.css';

const results = [
  { user: 'user', 
    title: 'Titulo', 
    description:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat laborum sunt, error quo autem voluptatum quod saepe molestias voluptate porro dignissimos, ipsum, animi ex? Rerum id cupiditate dolor exercitationem magni?',
    upvotes: 15,
    downvotes:20
  },
  { user: 'user', 
    title: 'Titulo', 
    description:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat laborum sunt, error quo autem voluptatum quod saepe molestias voluptate porro dignissimos, ipsum, animi ex? Rerum id cupiditate dolor exercitationem magni?',
    upvotes: 15,
    downvotes:20
  },
  { user: 'user', 
    title: 'Titulo', 
    description:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat laborum sunt, error quo autem voluptatum quod saepe molestias voluptate porro dignissimos, ipsum, animi ex? Rerum id cupiditate dolor exercitationem magni?',
    upvotes: 15,
    downvotes:20
  }
]


export const SearchResultApp = () => {
  return (
    <>
        <Searchbar></Searchbar>
        <section id='results'>
          <div className="results-list">
            {results.map(result => (
              <Result key={result.user} result={result}></Result>
            ))}
          </div>
        </section>
    </>
  )
}
