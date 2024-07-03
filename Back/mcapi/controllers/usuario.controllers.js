const { getConnection } = require("../database/config");

//API Login para verificar si los datos que se mandan del login son correctos
const login = async (req, res) => {
    try {
        const {Usuario, Contrasena} = req.body

        
        const query = `SELECT * FROM FMC1_Usuario WHERE Cedula = '${Usuario}' AND Contrasena = '${Contrasena}' AND habilitado = 1`;
        
        const pool = await getConnection();
        const result = await pool.request().query(query)
        

        if (result.recordset.length > 0) {
            res.status(201).send({message: result.recordset})

            
        } else {

            res.status(404).json({message: 'Usuario no encontrado'})
        }

    } catch (error) {
        console.error('Error en la consulta a la base de datos: ', error.message);
        res.status(500).json({error: 'Internal Server Error'})
        
    }
};


const datosUsuarioHabilitado = async(req, res) => {

    try {
        const query = `SELECT *, ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) as posicion FROM FMC1_Usuario WHERE habilitado = 1`
        const pool = await getConnection()
        const result = await pool.request().query(query)
        res.json(result.recordset);

           
    } catch (error) {
        console.error('Internal server error', error.message)
    }
}


const datosUsuarioInhabilitado = async(req, res) => {

    try {
        const query = `SELECT *, ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) as posicion FROM FMC1_Usuario WHERE habilitado = 0`
        const pool = await getConnection()
        const result = await pool.request().query(query)
        res.json(result.recordset);   
    } catch (error) {
        console.error('Internal server error', error.message)
    }
}


//Trae los gestores para el desplegable 
const informacionGestor = async(req, res) => {

    try {
        const pool = await getConnection()
        const result = await pool.request().query(`SELECT Usuario FROM FMC1_Usuario WHERE Roll = 'Gestor' AND habilitado = 1`)
        res.json(result.recordset);

         
    } catch (error) {
        console.error('Error en la consulta de base de datos:', error.message)
        res.status(500).json({message: 'Internal Server Error'})
    }


}

//Trae la informacion del evaluador para el desplegable 
informacionEvaluador = async(req, res) => {
    try {
        const pool = await getConnection()
        const result = await pool.request().query(`SELECT Usuario FROM FMC1_Usuario WHERE Roll = 'Evaluador' OR Roll = 'Admin' AND habilitado = 1`)
        res.json(result.recordset)
    } catch (error) {
        console.error('Error en la consulta de base de datos: ', error.message)
        res.status(201).send({message: 'Informacion obtenida correctamente'})
    }
    
}




//API para poder crear un usuario
const crearUsuario = async (req,res) => {
    try {
        const  {Usuario, Contrasena, Rol, Cedula} = req.body
        
    
        const query = `INSERT INTO [dbo].[FMC1_Usuario] (Usuario, Contrasena, Roll, Cedula, habilitado) 
        VALUES ('${Usuario}', '${Contrasena}', '${Rol}', '${Cedula}', 1);`
    
        const pool = await getConnection()
    
        const result =  await pool.request().query(query); 
    
        res.status(201).send({message: 'Datos ingresados correctamente'})
        
    } catch (error) {
        console.error('Error en la consulta de base de datos:', error.message)
        res.status(500).json({message: 'Internal server error'})
    }

}




//Edicion de usuario por parte del administrador
const editarUsuario = async(req,res) => {
    try {
        const {id} = req.params
        const {UsuarioEdit, ContrasenaEdit, RolEdit, CedulaEdit} = req.body

        const query = `UPDATE FMC1_Usuario
        SET
            Usuario = CASE WHEN '${UsuarioEdit}' <> '' THEN '${UsuarioEdit}' ELSE Usuario END,
            Email = CASE WHEN '' <> '' THEN '' ELSE Email END,
            Contrasena = CASE WHEN '${ContrasenaEdit}' <> '' THEN '${ContrasenaEdit}' ELSE Contrasena END,
            Roll = CASE WHEN '${RolEdit}' <> '' THEN '${RolEdit}' ELSE Roll END,
            Cedula = CASE WHEN '${CedulaEdit}' <> '' THEN '${CedulaEdit}' ELSE Cedula END
        
            WHERE
            id = '${id}'`

        const pool = await getConnection();
        const result = await pool.request().query(query)

        if (result.rowsAffected[0] === 0) return es.status(404).json({ error: 'Cedula no encontrada' });

        return  res.json({ message: 'Usuario actualizado exitosamente' });


    } catch (error) {
        console.error('Error en la consulta a la base de datos:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

//Eliminacion de usuario
const estadoUsuario = async(req, res) => {
    try {
        const {id} = req.params
        const estadoBody = req.body
        estado = estadoBody.estado



        
        const query = `UPDATE [dbo].[FMC1_Usuario]
        SET  habilitado = ${parseInt(estado)}
            WHERE id = '${id}'`

        const pool = await getConnection()
        const result = await pool.request().query(query)
        
        res.status(201).send({message: 'Cambio de usuario hecho  correctamente'})

    } catch (error) {
        console.error('Error en la consulta a la base de datos:', error.message);
        // res.status(500).json({ error: 'Internal Server Error' });
    }

}


//Exportacion de modulos para ser utilizados en otros archivos 
module.exports = {
    login,
    datosUsuarioHabilitado,
    datosUsuarioInhabilitado,
    crearUsuario,
    editarUsuario,
    informacionGestor,
    informacionEvaluador,
    estadoUsuario
}