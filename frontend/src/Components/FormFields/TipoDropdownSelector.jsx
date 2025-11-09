import React from "react";
import { Dropdown, ButtonGroup } from "react-bootstrap";
import "./../styles/FormDropdown.css";

export const TipoDropdownSelector = ({ useForm }) => {
	const [formData, setFormData, handleChange] = useForm;

	const tipos = [
		"Parcial",
		"Parcial resuelto",
		"Final",
		"Final resuelto",
		"Práctica",
		"Práctica resuelta",
		"Apunte",
		"Resumen",
		"Otro",
	];

	const title = formData.tipo || "Seleccione un tipo de material";

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
						key={t}
						onClick={() => {
							setFormData({ ...formData, tipo: t });
						}}
					>
						{t}
					</Dropdown.Item>
				))}
			</Dropdown.Menu>
		</Dropdown>
	);
};
