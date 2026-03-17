import { ExpandedSelector } from "./ExpandedSelector"

export const TipoExpandedSelector = ({useForm}) => {
  const [formData, setFormData, handleChange] = useForm;
  return (
  <ExpandedSelector
          name="tipo"
          value={formData.tipo || ""}
          onChange={(e) => handleChange(e, (value) => {
                value = JSON.parse(value);
                const selectedTipo = value.id;
                const isSameTipo = formData.tipo === selectedTipo;
                const isParcialTipo = selectedTipo === "Parcial" || selectedTipo === "Parcial resuelto";

                setFormData({
                  ...formData,
                  tipo: isSameTipo ? "" : selectedTipo,
                  parcial: isSameTipo || !isParcialTipo ? null : formData.parcial
                })
            }
            )}
          options={["Parcial", "Parcial resuelto", "Final", "Final resuelto", "Práctica", "Práctica resuelta", "Apunte", "Resumen", "Otro"].map(tipo => ({ id: tipo, name: tipo }))}
        />
  )
}
