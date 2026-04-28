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
    const hasSelection = value !== undefined && value !== null && value !== '';

    return (
        options.length === 0
            ? <div> No hay opciones disponibles </div>
            : <div>
                <h6>{label}</h6>
                <div className="d-flex flex-wrap gap-2 pb-3" style={{ alignItems: 'flex-start' }}>
                    {options && options.map((option) => {
                        const selected = isSelected(option);
                        const hidden = hasSelection && !selected;

                        return (
                            <div
                                key={option.id}
                                style={{
                                    position: 'relative',
                                    display: 'inline-block',
                                    overflow: hidden ? 'hidden' : 'visible',
                                    maxWidth: hidden ? '0px' : '300px',
                                    opacity: hidden ? 0 : 1,
                                    transform: hidden ? 'scale(0.8)' : 'scale(1)',
                                    margin: hidden ? '0' : undefined,
                                    padding: hidden ? '0' : undefined,
                                    transition: 'max-width 0.3s ease, opacity 0.25s ease, transform 0.25s ease, margin 0.3s ease, padding 0.3s ease',
                                    pointerEvents: hidden ? 'none' : 'auto',
                                }}
                            >
                                <Button
                                    variant={selected ? "primary" : "outline-secondary"}
                                    onClick={onChange}
                                    name={name}
                                    value={JSON.stringify(option)}
                                    style={{ whiteSpace: 'nowrap' }}
                                >
                                    {option.name}
                                </Button>
                                {selected && onDeselect && (
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
                        );
                    })}
                </div>
            </div>)
}
