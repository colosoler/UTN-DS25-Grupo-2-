import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

export const ComisionField = ({ useForm, carreraMateria }) => {
    const [formData, setFormData, handleChange] = useForm;
    const [prefix, setPrefix] = useState("");
    useEffect(() => {
        if (!formData.materiaId || !formData.carreraId || !formData.carrera || !carreraMateria) return;
        let comisionPrefix = "";
        const carreraPalabras = formData.carrera.toLowerCase().split(" ");
        if (carreraPalabras[1] === "en") {
            comisionPrefix = carreraPalabras[2][0].toUpperCase(); //Ingenieria en ... Sistemas -> S
        } else {
            comisionPrefix = carreraPalabras[1][0].toUpperCase(); //Ingeniería ... Industrial -> I
        }
        comisionPrefix += carreraMateria.anio;
        setPrefix(comisionPrefix);
    }, [formData.carreraId, formData.carrera, formData.materiaId, carreraMateria]);

    return (
        <Form.Group>
            <Form.Label>Comisión</Form.Label>
            <div className="d-flex">
                <Form.Control
                    disabled
                    value={prefix || ""}
                    className="bg-secondary text-white"
                    style={{ width: '50px', paddingRight: '0' }}
                />
                <Form.Control
                    onChange={(e) => handleChange(e, (value) => setFormData(
                        { ...formData, comision: value?prefix + value:'' })
                    )}
                    name="comision"
                    type="number"
                    placeholder="2"
                    value={parseInt(formData.comision.charAt(2)) || ''}
                    style={{ width: '50px', paddingLeft: '0' }}
                    min="0"
                    max="9"
                />
            </div>
        </Form.Group>
    )
}
