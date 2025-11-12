import { useState, useEffect } from 'react';
import { Form, ListGroup } from 'react-bootstrap';

export const SearchOptions = ({ 
  options, 
  onChange, 
  name, 
  value = '', 
  placeholder,
  onInputChange 
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [filtered, setFiltered] = useState([]);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    if (value && value !== inputValue) {
      setInputValue(value);
    }
  }, [value]);

  const handleChangeOptions = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    if (onInputChange) {
      onInputChange(newValue);
    }

    if (newValue.trim() !== '') {
      const matches = options
        .filter(o => o.option.toLowerCase().includes(newValue.toLowerCase()))
        .slice(0, 10);
      setFiltered(matches);
      setShowList(true);
      onChange(e);
    } else {
      setFiltered([]);
      setShowList(false);
      onChange({ target: { name, value: { value: null, option: '' } } });
    }
  };

  const handleSelect = (elem) => {
    setInputValue(elem.option);
    onChange({ target: { name, value: elem } });
    setShowList(false);
  };

  const handleFocus = () => {
    if (inputValue.trim() === '') {
      setFiltered(options.slice(0, 10));
      setShowList(true);
    }
  };

  const clearInput = () => {
    setInputValue('');
    setFiltered([]);
    setShowList(false);
    onChange({ target: { name, value: { value: null, option: '' } } });
  };

  return (
    <div style={{ position: 'relative' }}>
      <Form.Control
        type="text"
        placeholder={placeholder}
        name={name}
        value={inputValue}
        onChange={handleChangeOptions}
        onFocus={handleFocus}
        onBlur={() => setTimeout(() => setShowList(false), 100)}
        autoComplete="off"
        style={{ paddingRight: '25px' }}
      />

      {inputValue && (
        <span
          onClick={clearInput}
          style={{
            position: 'absolute',
            right: '8px',
            top: '50%',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
            color: '#888',
            fontSize: '14px',
            userSelect: 'none',
          }}
        >
          ×
        </span>
      )}

      {showList && filtered.length > 0 && (
        <ListGroup
          style={{
            position: 'absolute',
            zIndex: 1000,
            width: '100%',
            maxHeight: '200px',
            overflowY: 'auto',
          }}
        >
          {filtered.map(elem => (
            <ListGroup.Item
              key={elem.value}
              onMouseDown={() => handleSelect(elem)}
              style={{ cursor: 'pointer' }}
            >
              {elem.option}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};
