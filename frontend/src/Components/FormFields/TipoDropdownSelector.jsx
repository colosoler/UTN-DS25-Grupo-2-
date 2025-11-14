import React from "react";
import { Dropdown, ButtonGroup } from "react-bootstrap";
import "./../styles/FormDropdown.css";

export const TipoDropdownSelector = ({ useForm }) => {
	const [formData, setFormData, handleChange] = useForm;

	const tipos = [
        { label: "Parcial", value: "PARCIAL" },
        { label: "Parcial resuelto", value: "PARCIAL_RESUELTO" },
        { label: "Final", value: "FINAL" },
        { label: "Final resuelto", value: "FINAL_RESUELTO" },
        { label: "Práctica", value: "PRACTICA" },
        { label: "Práctica resuelta", value: "PRACTICA_RESUELTA" }, 
        { label: "Apunte", value: "APUNTE" },
        { label: "Resumen", value: "RESUMEN" },
        { label: "Otro", value: "OTRO" },
    ];

	const selectedTipo = tipos.find(t => t.value === formData.tipo);
    const title = selectedTipo ? selectedTipo.label : "Seleccione un tipo de material";

	return (
		<Dropdown as={ButtonGroup}>
			<Dropdown.Toggle
				variant="light"
				id="dropdown-tipo"
				size="sm"
				className="custom-dropdown"
			>
				{title}
			</Dropdown.Toggle>

			<Dropdown.Menu>
				{tipos.map((t) => (
					<Dropdown.Item
						key={t.value}
						onClick={() => {
							setFormData({ ...formData, tipo: t.value });
						}}
					>
						{t.label}
					</Dropdown.Item>
				))}
			</Dropdown.Menu>
		</Dropdown>
	);
};
