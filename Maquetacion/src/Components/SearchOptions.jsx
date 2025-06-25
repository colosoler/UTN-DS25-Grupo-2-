import { useState } from 'react';
import { Form, ListGroup, Row, Col, Image } from 'react-bootstrap';
import { useForm } from '../Hooks/useForm';

export const SearchOptions = ({options, onChange, name, placeholder}) => {
    const [filtered, setFiltered] = useState(options);
    const [showList, setShowList] = useState(false);
    const [option, setOption] = useState('');

    const handleChangeOptions = (e) =>{
        onChange(e);
        const filtered = options.filter(o => o.toLowerCase().includes(e.target.value.toLowerCase()));
        setFiltered(filtered);
    };
    return (
        <>  
            <Form.Control
                type="text"
                placeholder={placeholder}
                name={name}
                value={option}
                onChange={handleChangeOptions}
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
