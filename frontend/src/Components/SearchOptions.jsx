import { useEffect, useState } from 'react';
import { Form, ListGroup} from 'react-bootstrap';


export const SearchOptions = ({options, onChange, name, placeholder}) => {
    const [filtered, setFiltered] = useState(options);
    useEffect(() => {
        setFiltered(options);
    }, [options]);
    const [showList, setShowList] = useState(false);
    const [option, setOption] = useState({value: -1, option: ''});

    const handleChangeOptions = (e) =>{
        onChange(e);
        const newOption= e.target.value?.option || e.target.value
        setOption({value: e?.value || -1, option:newOption});
        const filtered = options.filter(o => o.option.toLowerCase().includes(newOption.toLowerCase()));
        setFiltered(filtered);
    };
    return (
        <>  
            <Form.Control
                type="text"
                placeholder={placeholder}
                name={name}
                value={option.option}
                onChange={handleChangeOptions}
                onFocus={() => setShowList(true)}
                onBlur={() => setTimeout(() =>setShowList(false), 100)}
                autoComplete="off"
            />
            {showList && (
                <ListGroup>
                    {filtered.map((elem) => (
                        <ListGroup.Item
                            key={elem.value}
                            onMouseDown={() => {setOption(elem); handleChangeOptions({target:{name,value:elem}});}}
                            style={{ cursor: 'pointer' }}>
                            {elem.option}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </>
    )
}
