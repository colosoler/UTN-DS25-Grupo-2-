# Acceder
1. cd /frontend/
2. npm install
3. en el login:
    - Usuario: admin@utn.com
    - Contraseña: 1234

# Funcionalidades Implementadas
1. Registro 
    - con validaciones
2. Inicio de Sesión 
    - con validaciones
3. Pantalla Principal
    -  una carrera para filtrar por ella ó directamente buscar un material de estudio
4. Detalle de Carrera
    - al ingresar a una carrera se podrá filtrar por año y por materia los resultados a buscar
5. Resultados de búsqueda
    - permite filtrar por cualquier campo de material de estudio, actualizando los parámetros de la url
6. Subir material 
7. Ver perfil
    - cerrar sesión
    - eliminar perfil (con pantalla de confirmación)
8. Editar perfil
9. Ver mis publicaciones
10. Editar mis publicaciones
11. Por cada publicacion se puede:
    - Eliminar (con pantalla de confirmación)
    - Compartir
    - Editar
    - Reportar (+selección de motivo)
    - Dar voto positivo
    - Dar voto negativo

# Hooks
Implementamos 2 Hooks personalizados
1. useFetch
    - Recibe un endpoint y la url de la api
    - Devuelve data(la respuesta de la api), isLoading(para no mostrar la info hasta que termine de cargar), error(si es q la api devolvió alguno)
    - Utiliza useEffect
2. useForm
    - Devuelve formData y setFormData por si se desea manejar el estado del formulario y handleChange (la función default para actualizar el estado ante un cambio de un campo)
    - Además agregamos los parámetros callback y ...params por si se quiere ejecutar alguna lógica fuera de lo común dentro de handleChange (la callback recibe name del campo, el value, el formData actualizado y los params extras que se le quieran pasar)

Además utilizamos useState, useParams, useSearchParams, useLocation y useNavigate

# Conexión con API
Creamos una API personalizada con beeceptor para los materiales (tiene usos limitados por dia, por eso pueden aparecer errores si se utiliza varias veces) 