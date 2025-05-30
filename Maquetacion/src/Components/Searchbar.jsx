import './styles/Searchbar.css';

export const Searchbar = () => {
  return (

    <div className="searchbar-container">
      <label className="search-label"></label>
      <div className="search-wrapper">
        <input
          type="text"
          placeholder="Ingresa un tema o una materia"
          className="search-input"
        />
        <button className="clear-btn" title="Borrar">×</button>
        <button className="menu-btn" title="Menú">≡</button>
      </div>
    </div>
  );
}




