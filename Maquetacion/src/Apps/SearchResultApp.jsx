import { Searchbar } from '../Components/Searchbar.jsx'
import { Result } from './../Components/Result.jsx';
import './styles/SearchResultApp.css';

const results = [
  { user: 'user1', 
    title: 'Titulo', 
    description:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat laborum sunt, error quo autem voluptatum quod saepe molestias voluptate porro dignissimos, ipsum, animi ex? Rerum id cupiditate dolor exercitationem magni?',
    upvotes: 15,
    downvotes:20
  },
  { user: 'user2', 
    title: 'Titulo23', 
    description:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat laborum sunt, error quo autem voluptatum quod saepe molestias voluptate porro dignissimos, ipsum, animi ex? Rerum id cupiditate dolor exercitationem magni?',
    upvotes: 15,
    downvotes:20
  },
  { user: 'user3', 
    title: 'Titulo3', 
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
              <Result key={result.user + result.title} result={result}></Result>
            ))}
          </div>
        </section>
    </>
  )
}
