import { useState } from "react"

export const useForm = (defaultForm={}) => {
    const [formData, setFormData] = useState(defaultForm)

    const handleChange = (e,callback,...params) => {
        const { name, value } = e.target
        if (callback) {
            callback(value,...params)
        }else {
            setFormData({ ...formData, [name]: value })
        }
    }

    return [ formData, setFormData, handleChange ]
}
