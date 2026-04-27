import { useEffect } from "react";
import { Button } from "react-bootstrap";

export const ExpandedSelector = ({ options = [], name, value, label, onChange, onDeselect }) => {
    //options es una lista de objetos {id, name} 
    // donde id es el valor a guardar y name es lo que se muestra
    // en value se guarda el valor default
    // para recibir el nuevo value: onChange={ (e) => console.log(JSON.parse(e.targe.value))}
    // ó:                           onChange={(e) => handleChange(e, (value) => {
    //            value = JSON.parse(value);
    //            setFormData({ ...formData, <atributo>: value.id})
    //        }
    //        )}

    const isSelected = (option) => value === option.id;

    return (
        options.length === 0
            ? <div> No hay opciones disponibles </div>
            : <div>
                <h6>{label}</h6>
                <div className="d-flex flex-wrap gap-2 pb-3">
                    {options && options.map((option) => (
                        <div key={option.id} style={{ position: 'relative', display: 'inline-block' }}>
                            <Button
                                variant={isSelected(option) ? "primary" : "outline-secondary"}
                                onClick={onChange}
                                name={name}
                                value={JSON.stringify(option)}
                            >
                                {option.name}
                            </Button>
                            {isSelected(option) && onDeselect && (
                                <span
                                    onClick={(e) => { e.stopPropagation(); onDeselect(); }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#888'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#aaa'}
                                    style={{
                                        position: 'absolute',
                                        top: '-5px',
                                        right: '-5px',
                                        width: '14px',
                                        height: '14px',
                                        borderRadius: '50%',
                                        backgroundColor: '#aaa',
                                        color: '#fff',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '0.55rem',
                                        fontWeight: 700,
                                        cursor: 'pointer',
                                        lineHeight: 1,
                                    }}
                                    title="Deseleccionar"
                                >
                                    ✕
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>)
}
