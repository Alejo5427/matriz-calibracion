const { getConnection } = require("../database/config");


//Validador de si existe usuario para no crear otro
const existeUsuario = async(req, res = response, next) => {
    const {Usuario} = req.body
    const pool = await getConnection(); 
    const result = await pool.request() .query(`SELECT Usuario FROM FMC1_Usuario WHERE Usuario = '${Usuario}' `)
    
    
    if (result.recordset.length > 0) {
        const usuarioEncontrado = result.recordset[0];
        console.log('este usuario ya existe y es:', usuarioEncontrado)
        res.status(400).send({
            error: `este usuario ya existe y es: ${Usuario}`
        })
    } else {
        console.log('Verificacion de usuario completada ')
        next();
    }

}

const existeCedula = async(req,res = response, next)  => { 
    const {Cedula} = req.body
    console.log(Cedula);
    
    const pool = await getConnection()
    const result = await pool.request().query(`SELECT Cedula FROM FMC1_Usuario WHERE Cedula = '${Cedula}'`) 

    if (result.recordset.length > 0) {
        const cedulaEncontrada = result.recordset[0];
        console.log('Cedula ya exsite y es:', cedulaEncontrada);
        res.status(400).send({error: 'Cedula ya existente'})
    } else {
        console.log('Verificacion de cedula hecha exitosamente');
        next();
    }

}



//Validador para rectificar si la cedula no existe (Para eliminacion de usuarios)
const noExisteCedula = async(req, res = response, next) => {
    const {Cedula} = req.body
    const pool = await getConnection();
    const result = await pool.request() .query(`SELECT Cedula FROM FMC1_Usuario WHERE Cedula = '${Cedula}' `)

    
    if (result.recordset.length === 0) {
        console.log('Ingrese cedula porfavor')
        res.status(400).json({
            error: `Esta Cedula no existe`
        })
    } else {
        console.log('Verificacion de cedula no existente completada')
        next();

    }

}

//Validador para saber si el usuario esta habilitado o inhabilitado y saltar el error 
const estaHabilitado = async(req, res = response, next) => {

    const {id} = req.params
    const estadoBody = req.body
    const estado = estadoBody.estado
    
    const pool = await getConnection()

    const query = `SELECT habilitado FROM  FMC1_Usuario WHERE habilitado = ${parseInt(estado)} AND id = ${id}`

    const result = await pool.request().query(query)

    if (result.recordset.length > 0) {
        const estado = result.recordset[0]
        const habilitado = estado.habilitado
        if (habilitado === false) {
            res.status(400).json({
                error: 'Este usuario ya esta Inhabilitado'
            })
        } else {
            res.status(400).json({
                error: 'Este usuario ya esta Habilitado'
            })
        }
    } else {
        console.log('Verificacion de usuario habilitado completada');
        next();
    }

}


//Exportacion de los validadores para ser utilizados en las rutas
module.exports = {
    existeUsuario,
    existeCedula,
    noExisteCedula,
    estaHabilitado
    
}