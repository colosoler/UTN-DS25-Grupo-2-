import { ExpandedSelector } from "./ExpandedSelector"

export const TipoExpandedSelector = ({useForm}) => {
  const [formData, setFormData, handleChange] = useForm;
  return (
  <ExpandedSelector
          name="tipo"
          value={formData.tipo || ""}
          onChange={(e) => handleChange(e, (value) => {
                value = JSON.parse(value);
                setFormData({ ...formData, tipo: value.id})
            }
            )}
          label="Tipo de material"
          options={["Parcial", "Parcial resuelto", "Final", "Final resuelto", "Práctica", "Práctica resuelta", "Apunte", "Resumen", "Otro"].map(tipo => ({ id: tipo, name: tipo }))}
        />
  )
}
