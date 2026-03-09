
import { useState } from "react";
import { ExpandedSelector } from "./ExpandedSelector";
export const TypeOfFileSelector = () => {
  const [type, setType] = useState()
  return (
    <>
    <ExpandedSelector 
    options={[
        {id: "PDF", name: "PDF"},
        {id: "Images", name: "Imágenes"}
    ]}
    name="type_of_file"
    label="Qué querés publicar?"
    onChange={(e)=>{setType(JSON.parse(e.target.value).id)}}
    />
    {type === "PDF" && <div>Subí un PDF</div>}
    {type === "Images" && <div>Subí una imagen</div>}
    </>
  )
}
