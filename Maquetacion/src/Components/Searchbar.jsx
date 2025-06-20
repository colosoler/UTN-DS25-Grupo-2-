import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Searchbar = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      navigate('/search');
    }
  };

  const handleClear = () => {
    setSearchValue('');
  };

  const handleMenuClick = () => {
    console.log('Menu clicked');
  };

  return (
    <div className="container-fluid py-3">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="input-group input-group-lg">
            <input
              type="text"
              className="form-control"
              placeholder="Ingresa un tema o una materia"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleKeyDown}/>
            <button
              className="btn"
              type="button"
              onClick={handleClear}
              title="Borrar"
              style={{
                border: '1px solid #ced4da',
                borderLeft: 'none',
                borderRight: 'none',
                backgroundColor: '#fff',
                color: '#6c757d',
              }}>×</button>
            <button
              className="btn"
              type="button"
              onClick={handleMenuClick}
              title="Menú"
              style={{
                border: '1px solid #ced4da',
                borderLeft: 'none',
                backgroundColor: '#fff',
                color: '#6c757d',
              }}>≡</button>
          </div>
        </div>
      </div>
    </div>
  );
};