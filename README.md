## Bienvenido a mi repo!

En este proyecto estoy implementando una api con usuarios, categorias y productos, generado con Node js y Express, jwt, MongoDB, además me encuentro trabajando en los endpoints de categorias y productos, donde voy a aplicar Cloudinary para subir los archivos.

### Tecnologias utilizadas

- Node js
- Express
- Json Web Token
- Google Sign In
- MongoDB (Mongoose)
- Bcryptjs
- Express Validator

------------


### URL
http://localhost:port/api
   

------------

                 
### Endpoints
#### /users
#### get -> Devuelve todos los usuarios activos

#### post  -> Crea un nuevo usuario
##### Schema


    {
        name:{
            type: String,
            'El nombre es obligatorio'
        },
        email:{
            type: String,
            'El correo es obligatorio',
            unique
        },
        pass:{
            type: String,
            'La contraseña es obligatoria'
        },
        img:{
            type: String
        },
        rol:{
            type: String,
            Enum: 'ADMIN_ROLE','USER_ROLE',
            default: 'USER_ROLE'
        }
    }
	
#### put/:id  -> Actualiza un usuario existente


#### delete/:id  -> Desactiva un usuario (no lo elimina de la base de datos par mantener la referencia)

------------


### /Auth

#### /auth/login -> Inicia sesión con email y contraseña
#### /auth/google -> Inicia sesión con cuenta de Google
