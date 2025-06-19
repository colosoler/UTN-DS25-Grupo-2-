import { useState } from 'react';
import { Form, ListGroup, Row, Col, Image } from 'react-bootstrap';

export const SearchOptions = ({options, name, placeholder}) => {
    const [option, setOption] = useState('');
    const [filtered, setFiltered] = useState(options);
    const [showList, setShowList] = useState(false);
    const handleOptionChange = (event) => {
        const input = event.target.value;
        setOption(input);
        const filtered = options.filter(m => m.toLowerCase().includes(input.toLowerCase()));
        setFiltered(filtered);
    }
    return (
        <>  
            <Form.Control
                type="text"
                placeholder={placeholder}
                name={name}
                value={option}
                onChange={handleOptionChange}
                onFocus={() => setShowList(true)}
                onBlur={() => setTimeout(() =>setShowList(false), 100)}
                autoComplete="off"
            />
            {showList && (
                <ListGroup>
                    {filtered.map((elem, index) => (
                        <ListGroup.Item
                            key={index}
                            onMouseDown={() => setOption(elem)}
                            style={{ cursor: 'pointer' }}>
                            {elem}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </>
    )
}
