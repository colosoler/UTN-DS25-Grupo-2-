/*
Para llamarlo:
<CarreraExpandedSelector
    useForm={[formData, setFormData, (e, callback, ...params) => { handleChange(e, callback, ...params);]}
    carreras={cLoading ? [] : carreras}
/>

*/

import { ExpandedSelector } from "./ExpandedSelector";
export const CarreraExpandedSelector = ({ useForm, carreras }) => {
    const [formData, setFormData, handleChange] = useForm;
    return (
        <ExpandedSelector
            options={carreras?.map(carrera => ({ id: carrera.id, name: carrera.nombre }))}
            name="carrera"
            value={formData.carreraId}
            onChange={(e) => handleChange(e, (value) => {
                value = JSON.parse(value);
                setFormData({ ...formData, carreraId: value.id, carrera: value.name })
            }
            )}
            onDeselect={() => setFormData({ ...formData, carreraId: undefined, carrera: '' })}
        ></ExpandedSelector>
    )
}
