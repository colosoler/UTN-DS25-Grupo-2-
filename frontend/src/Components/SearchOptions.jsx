import { useEffect, useState } from 'react';
import { Form, ListGroup } from 'react-bootstrap';

export const SearchOptions = ({ options, onChange, name, value='', placeholder }) => {
    const [inputValue, setInputValue] = useState(value);
    const [filtered, setFiltered] = useState([]);
    const [showList, setShowList] = useState(false);

    const handleChangeOptions = (e) => {
        // Obtengo el valor del input
        const newValue = e.target.value;
        setInputValue(newValue);

        // Filtro las opciones que coinciden con el valor del input 
        if (newValue.trim() !== '') {
            const matches = options.filter(o =>
                o.option.toLowerCase().includes(newValue.toLowerCase())
            );
            // Si hay matches, los muestro
            setFiltered(matches);
            setShowList(true);
        } else {
            // Si el input está vacío, limpio el filtro y oculto la lista
            setFiltered([]);
            setShowList(false);
        }

        onChange(e); // Envío al padre
    };

    // Manejo la selección de una opción
    const handleSelect = (elem) => {
        setInputValue(elem.option);
        onChange({ target: { name, value: elem } });
        setShowList(false);
    };

    return (
        <div style={{ position: 'relative' }}>
            <Form.Control
                type="text"
                placeholder={placeholder}
                name={name}
                value={inputValue}
                onChange={handleChangeOptions}
                onFocus={() => {
                    if (filtered.length > 0) setShowList(true);
                }}
                onBlur={() => setTimeout(() => setShowList(false), 100)}
                autoComplete="off"
            />
            {showList && filtered.length > 0 && (
                <ListGroup
                    // Estilos para que la lista aparezca por encima del formulario
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
