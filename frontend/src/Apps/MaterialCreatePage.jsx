import { Form, Row, Col, Button } from 'react-bootstrap';
import { SearchOptions } from '../Components/SearchOptions.jsx';
import { useForm } from '../Hooks/useForm.jsx';
import { useFetch } from '../Hooks/useFetch.jsx';

export const MaterialCreatePage = () => {
  const [formData,setFormData,handleChange] = useForm((name,value,newData)=>{
    if (name === 'materia' || name === 'carrera'){ 
      setFormData({...newData, [name+'Id']: value.value, [name]: value.option})
    }
  })
  const { data: materias, loading:mLoading, error:mError }=useFetch('localhost:3000/materias/')
  const carrerasUrl = formData.materiaId
    ? `carreras/?materia=${formData.materiaId}`
    : 'carreras/';
  const { data:carreras, loading: cLoading, error:cError }=useFetch('localhost:3000/'+carrerasUrl);

  if (mLoading || cLoading) return <h1>Cargando...</h1>
  if (mError || cError) {return <h1>Ha Ocurrido un Error</h1>}
  return (
    <>
      <Form className="container mt-5 bg-light p-4 rounded">
        <h1 className="text-center mb-4">Subí tu material de estudio</h1>
        <Form.Group className="mb-5" aria-required>
          <Form.Label className='text-center w-100'>Ponele título</Form.Label>
          <Form.Control onChange={handleChange} name="titulo" size="lg" type="text" placeholder="Ej: Resumen Ecuaciones Diferenciales" />
        </Form.Group>
        <Form.Group controlId="formFileMultiple" className="mb-5" aria-required>
          <Form.Label>Subí los archivos que quieras publicar</Form.Label>
          <Form.Control onChange={handleChange} type="file" name="archivos" multiple />
        </Form.Group>
        <Row className="mb-3">
          <Col>
            <Form.Group aria-required>
              <SearchOptions options={materias.materias.map(e=>({value:e.id,option:e.nombre}))} onChange={ handleChange } name="materia" placeholder="De que materia es?" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group aria-required>
              <SearchOptions options={carreras.map(e=>({value:e.id,option:e.nombre}))} onChange={ handleChange } name="carrera" placeholder="En que carrera la cursaste?" />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group >
              <Form.Select onChange={handleChange} name="tipo">
                <option>Tipo de material</option>
                <option value="parcial">Parcial</option>
                <option value="parcial resuelto">Parcial Resuelto</option>
                <option value="practica">Practica</option>
                <option value="practica resuelta">Practica Resuelta</option>
                <option value="final">Final</option>
                <option value="final resuelto">Final resuelto</option>
                <option value="apunte">Apunte</option>
                <option value="resumen">Resumen</option>
                <option value="otro">Otro</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group  >
              <Form.Select onChange={handleChange} name="parcial">
                <option>Parcial con el que se relaciona</option>
                <option value={0}>Ninguno</option>
                <option value={1}>1ero</option>
                <option value={2}>2do</option>
                <option value={3}>3ro</option>
                <option value={4}>4to</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group >
              <Form.Control onChange={handleChange} type="text" placeholder="Comisión" name="comision"></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3">
          <Form.Label>Descripción del material</Form.Label>
          <Form.Control onChange={handleChange} name="descripcion" as="textarea" rows={3} placeholder="Escribí una breve descripción del material que estás subiendo." />
        </Form.Group>
          <Button type="submit" className="d-block mx-auto" variant="primary">
            Subir
          </Button>
      </Form>
    </>
  );
}