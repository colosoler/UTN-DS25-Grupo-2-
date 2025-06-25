import { useState } from "react"

export const useForm = (callback,...params) => {
    const [formData, setFormData] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target
        const newData = {
            ...formData,
            [name]: value
        }
        setFormData(newData)
        if (callback) {
            callback(name,value,newData,...params)
        }
    }

    return [ formData, setFormData, handleChange ]
}
