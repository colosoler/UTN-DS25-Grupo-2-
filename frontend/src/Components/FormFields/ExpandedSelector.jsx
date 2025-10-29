import { useEffect } from "react";
import { Button } from "react-bootstrap";

export const ExpandedSelector = ({ options = [], name, value, label, onChange}) => {
    //options es una lista de objetos {id, name} 
    // donde id es el valor a guardar y name es lo que se muestra

    return (
        options.length === 0
            ? <div> No hay opciones disponibles </div>
            : <div>
                <h6>{label}</h6>
                <div className="d-flex flex-wrap gap-2 pb-3">
                    {options && options.map((option) => (
                        <Button
                            key={option.id}
                            variant={value === option.id ? "primary" : "outline-secondary"}
                            onClick={onChange}
                            name={name}
                            value={JSON.stringify(option)}
                        >
                            {option.name}
                        </Button>
                    ))}
                </div>
            </div>)
}
