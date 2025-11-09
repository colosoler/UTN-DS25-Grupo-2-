import React from "react";
import { Dropdown, ButtonGroup } from "react-bootstrap";
import './../styles/FormDropdown.css';

export const CarreraDropdownSelector = ({ useForm, carreras }) => {
	const [formData, setFormData, handleChange] = useForm;

	const title = formData.carrera || "Seleccione una carrera";

	return (
		<Dropdown as={ButtonGroup}>
			<Dropdown.Toggle
				variant="light"
				id="dropdown-carrera"
				size="sm"
				className="custom-dropdown"
			>
				{title}
			</Dropdown.Toggle>

			<Dropdown.Menu>
				{(carreras || []).map((c) => (
					<Dropdown.Item
						key={c.id}
						onClick={() => {
							setFormData({
								...formData,
								carreraId: c.id,
								carrera: c.nombre
							});
						}}
					>
						{c.nombre}
					</Dropdown.Item>
				))}
			</Dropdown.Menu>
		</Dropdown>
	);
};