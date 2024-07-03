const {agregarDatosTabla, estadisticas, ultimosRegistros, estadisticasFormGestor, estadisticasFormGeneral } = require('../controllers/formulario.controllers')
const { Router } = require('express');


const router = Router();

//Envio de los datos del formulario (Detalle, Encabezado)
router.post('/envioformulario', agregarDatosTabla)

//Envio de datos y devolucion de estadisticas
router.post('/estadisticas', estadisticas)

//Ultimos registros de formularios del usuario
router.post('/registrosForm', ultimosRegistros)


//Prueba de formulario
router.post('/estadisticasFormGestor', estadisticasFormGestor)

router.get('/estadisticasFormGeneral', estadisticasFormGeneral)

module.exports = router