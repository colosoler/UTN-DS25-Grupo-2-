/*
Para llamarlo:

<TipoExpandedSelector 
useForm={[formData, setFormData, (e, callback, ...params) => { handleChange(e, callback, ...params); clearField('tipo'); }]} 
/>
                
*/

import { ExpandedSelector } from "./ExpandedSelector"

export const TipoExpandedSelector = ({ useForm }) => {
  const [formData, setFormData, handleChange] = useForm;
  return (
    <ExpandedSelector
      name="tipo"
      value={formData.tipo || ""}
      onChange={(e) => handleChange(e, (value) => {
        value = JSON.parse(value);
        const selectedTipo = value.id;
        const isSameTipo = formData.tipo === selectedTipo;
        const isParcialTipo = selectedTipo === "PARCIAL" || selectedTipo === "PARCIAL_RESUELTO";

        setFormData({
          ...formData,
          tipo: isSameTipo ? "" : selectedTipo,
          parcial: isSameTipo || !isParcialTipo ? null : formData.parcial
        })
      }
      )}
      options={[
        { id: "PARCIAL", name: "Parcial" },
        { id: "PARCIAL_RESUELTO", name: "Parcial resuelto" },
        { id: "FINAL", name: "Final" },
        { id: "FINAL_RESUELTO", name: "Final resuelto" },
        { id: "PRACTICA", name: "Práctica" },
        { id: "PRACTICA_RESUELTA", name: "Práctica resuelta" },
        { id: "APUNTE", name: "Apunte" },
        { id: "RESUMEN", name: "Resumen" },
        { id: "OTRO", name: "Otro" },
      ]}
      onDeselect={() => setFormData({ ...formData, tipo: '', parcial: null })}
    />
  )
}
