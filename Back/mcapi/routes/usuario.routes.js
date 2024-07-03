const { Router } = require('express');

const { login, 
     crearUsuario,
     editarUsuario, 
     informacionGestor, 
     informacionEvaluador,
     estadoUsuario,
     datosUsuarioHabilitado,
     datosUsuarioInhabilitado,

    } = require('../controllers/usuario.controllers');

const { existeUsuario,  existeCedula, estaHabilitado } = require('../helpers/db-validadores');

//Apartado de rutas para la seccion de usuario

//Almacenamiento del Router de express
const router = Router();


//Path de Login (Inicio de sesion)
router.post('/login', login)

//Obtener toda la informacion de los usuarios
router.get('/datosUsuariosHabilitados', datosUsuarioHabilitado)

router.get('/datosUsuariosInhabilitados',datosUsuarioInhabilitado)



//Path de creacion de usuario con sus debidos validadores
router.post('/crearUsuario',
    existeUsuario,
    existeCedula,
    crearUsuario
)



//Traer la informacion del gestor en cuestion 
router.get('/informacionGestor', informacionGestor)


//Trae la informacion del gestor
router.get('/informacionEvaluador', informacionEvaluador)


//Path de creacion de Gestor con sus debidos validadores
router.put('/editarUsuario/:id', editarUsuario)

//Cambia el estado del usuario en cuestion
router.post('/estadoUsuario/:id', estaHabilitado,
                                  estadoUsuario)

//Exportacion del router
module.exports = router