const { getConnection } = require("../database/config");

const sql = require('mssql');


//Agrega datos a las tablas de encabezado y detalle
const  agregarDatosTabla = async(req,res) => {
    try {
        const matriz =  req.body
        const pool = await getConnection()
        
        const query1 = `INSERT INTO [dbo].[FMC1_Encabezado] (Fecha, NombreGestor, ID_Interaccion, NumeroInteraccion, Observaciones, Evaluador, NotaFinal)
        VALUES ('${matriz.formulario.fechaInteraccion}', 
                '${matriz.formulario.nombre}', 
                '${matriz.formulario.idInteraccion}',
                 '${matriz.formulario.numeroContacto}', 
                 '${matriz.formulario.observaciones}', 
                 '${matriz.formulario.evaluador}', 
                 ${matriz.notaFinal})`
        

        const queryObtenerNumForm = `SELECT TOP 1 NumeroFormulario  From FMC1_Encabezado
        ORDER BY NumeroFormulario DESC`
        
        const result1 = await pool.request().query(query1)
        // .then(result => {
        //     res.status(201).send({message: 'Datos Ingresados correctamente'})
        // }).catch(error => {
        //     res.status(500).json({message: 'Error del servidor al ingresar los datos'})
        // })

        const result2 = await pool.request()
        .query(queryObtenerNumForm)
        // .then(result => {
        //     res.status(201).send({message: 'Datos ingresados correctamente'})
        //     console.log('Efectivamente llego al then');  
        //     console.log(result.recordset);
        //     const numeroFormulario = result.recordset[0].NumeroFormulario
        //     console.log('Aqui estoy mirando la desestructuracion de objetos', numeroFormulario);
        // }).catch(error => {
        //     console.error('Error en la consulta de la base de datos:', error.message)
        //     res.status(500).json({error: 'Internal Server Error from Query1'})
        // })

        const numForm = result2.recordset[0].NumeroFormulario


     const query2 = `INSERT INTO [dbo].[FMC1_Detalle] (NumeroFormulario, Cod_criterio, Cod_Item, Cumple) 
                    VALUES (${numForm}, 1, 1, ${parseInt(matriz.formulario.item1)}),
                        (${numForm}, 1, 2, ${parseInt(matriz.formulario.item2)}),
                        (${numForm}, 2, 1, ${parseInt(matriz.formulario.item3)}),
                        (${numForm}, 2, 2, ${parseInt(matriz.formulario.item4)}),
                        (${numForm}, 3, 1, ${parseInt(matriz.formulario.item5)}),
                        (${numForm}, 3, 2, ${parseInt(matriz.formulario.item6)}),
                        (${numForm}, 3, 3, ${parseInt(matriz.formulario.item7)}),
                        (${numForm}, 3, 4, ${parseInt(matriz.formulario.item8)}),
                        (${numForm}, 4, 1, ${parseInt(matriz.formulario.item9)}),
                        (${numForm}, 4, 2, ${parseInt(matriz.formulario.item10)}),
                        (${numForm}, 4, 3, ${parseInt(matriz.formulario.item11)}),
                        (${numForm}, 4, 4, ${parseInt(matriz.formulario.item12)}),
                        (${numForm}, 4, 5, ${parseInt(matriz.formulario.item13)}),
                        (${numForm}, 5, 1, ${parseInt(matriz.formulario.item14)}),
                        (${numForm}, 5, 2, ${parseInt(matriz.formulario.item15)}),
                        (${numForm}, 5, 3, ${parseInt(matriz.formulario.item16)}),
                        (${numForm}, 6, 1, ${parseInt(matriz.formulario.item17)}),
                        (${numForm}, 6, 2, ${parseInt(matriz.formulario.item18)}),
                        (${numForm}, 6, 3, ${parseInt(matriz.formulario.item19)}),
                        (${numForm}, 6, 4, ${parseInt(matriz.formulario.item20)}),
                        (${numForm}, 6, 5, ${parseInt(matriz.formulario.item21)}),
                        (${numForm}, 6, 6, ${parseInt(matriz.formulario.item22)}),
                        (${numForm}, 6, 7, ${parseInt(matriz.formulario.item23)}),
                        (${numForm}, 6, 8, ${parseInt(matriz.formulario.item24)}),
                        (${numForm}, 6, 9, ${parseInt(matriz.formulario.item25)}),
                        (${numForm}, 7, 1, ${parseInt(matriz.formulario.item26)}),
                        (${numForm}, 7, 2, ${parseInt(matriz.formulario.item27)}),
                        (${numForm}, 7, 3, ${parseInt(matriz.formulario.item28)}),
                        (${numForm}, 7, 4, ${parseInt(matriz.formulario.item29)}),
                        (${numForm}, 7, 5, ${parseInt(matriz.formulario.item30)}),
                        (${numForm}, 7, 6, ${parseInt(matriz.formulario.item31)}),
                        (${numForm}, 7, 7, ${parseInt(matriz.formulario.item32)}),
                        (${numForm}, 7, 8, ${parseInt(matriz.formulario.item33)}),
                        (${numForm}, 7, 9, ${parseInt(matriz.formulario.item34)}),
                        (${numForm}, 7, 10,${parseInt(matriz.formulario.item35)}),
                        (${numForm}, 8, 1, ${parseInt(matriz.formulario.item36)}),
                        (${numForm}, 8, 2, ${parseInt(matriz.formulario.item37)}),
                        (${numForm}, 8, 3, ${parseInt(matriz.formulario.item38)}),
                        (${numForm}, 8, 4, ${parseInt(matriz.formulario.item39)}),
                        (${numForm}, 8, 5, ${parseInt(matriz.formulario.item40)});`


        const result3 = await pool.request().query(query2)

        res.status(201).send({message: 'Datos ingresados correctamente'})
    
    } catch (error) {
        console.error('Error en la consulta a la base de datos:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
        
    }


}


//Apartado de estadisticas, en este se hace la consulta y se trae los datos especificados
const estadisticas = async(req, res) => {
    try {
        const {fechaInicio, fechaFin, gestor} = req.body
        
        
        const pool = await getConnection()




        const query = `SELECT 
                Detalle.Cod_Item,
                Criterio.Nom_Criterio, 
                item.Nombre_Item,
                COUNT(*) AS total
            FROM 
                FMC1_Detalle AS Detalle
                INNER JOIN FMC1_Items AS item ON item.Cod_Criterio = Detalle.Cod_criterio AND item.Cod_Item = Detalle.Cod_Item
                INNER JOIN FMC1_Criterios AS Criterio ON Criterio.Cod_Criterio = Detalle.Cod_criterio
                INNER JOIN FMC1_Encabezado AS Encabezado ON Encabezado.NumeroFormulario = Detalle.NumeroFormulario
            WHERE 
                CAST(Encabezado.Fecha AS DATE) BETWEEN '${fechaInicio}' AND '${fechaFin}'
                AND Detalle.Cumple = '0'
                AND Encabezado.nombreGestor = '${gestor}'
            GROUP BY 
                Detalle.Cod_Item,
                item.Nombre_Item,
                Criterio.Nom_Criterio
            ORDER BY 
                total DESC`

        const resultado = await pool.request().query(query)

        


        res.status(201).send(resultado.recordset)

        
        
    } catch (error) {
        console.error('Error en la consulta a la base de datos:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }    
}
//En esta consulta se devuelve los registros 
const ultimosRegistros = async(req,res) => {
    try {
        const  {gestor} = req.body
        
        const pool = await getConnection()
        const query = `SELECT TOP 8 NumeroFormulario,  Evaluador, Fecha, NotaFinal FROM FMC1_Encabezado 
        WHERE NombreGestor = '${gestor}'
        ORDER BY Fecha DESC`

        const result = await pool.request().query(query)

        
        res.status(201).send(result.recordset)

        
        
    } catch (error) {
        console.error('Error en la consulta a la base de datos:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}   

const estadisticasFormGestor = async(req, res) => {
    try {
    const {fechaInicio, fechaFin, gestor} = req.body

        const query = `SELECT 
        Encabezado.Fecha,
        Encabezado.NombreGestor,
        Encabezado.ID_Interaccion,
        Encabezado.NumeroInteraccion,
        Encabezado.Observaciones,
        Encabezado.Evaluador,
        Encabezado.NotaFinal,
        Criterio.Nom_Criterio,
        item.Nombre_Item,
        Detalle.Cumple
        FROM 
        FMC1_Detalle AS Detalle
        INNER JOIN FMC1_Items AS item ON item.Cod_Criterio = Detalle.Cod_criterio AND item.Cod_Item = Detalle.Cod_Item
        INNER JOIN FMC1_Criterios AS Criterio ON Criterio.Cod_Criterio = Detalle.Cod_criterio
        INNER JOIN FMC1_Encabezado AS Encabezado ON Encabezado.NumeroFormulario = Detalle.NumeroFormulario
        WHERE
        Encabezado.Fecha BETWEEN '${fechaInicio}' AND '${fechaFin}'
        AND Encabezado.NombreGestor = '${gestor}'
        ORDER BY Encabezado.Fecha`
        
        
        const pool = await getConnection()

        const result = await pool.request().query(query)

        res.status(200).send(result.recordset)
        
    } catch (error) {
        console.error('Error en la consulta a la base de datos:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });      
    }
}
        

const estadisticasFormGeneral = async(req, res) => {
    try {
        const query = `SELECT 
        Encabezado.Fecha,
        Encabezado.NombreGestor,
        Encabezado.ID_Interaccion,
        Encabezado.NumeroInteraccion,
        Encabezado.Observaciones,
        Encabezado.Evaluador,
        Encabezado.NotaFinal,
        Criterio.Nom_Criterio,
        item.Nombre_Item,
        Detalle.Cumple
        FROM 
        FMC1_Detalle AS Detalle
        INNER JOIN FMC1_Items AS item ON item.Cod_Criterio = Detalle.Cod_criterio AND item.Cod_Item = Detalle.Cod_Item
        INNER JOIN FMC1_Criterios AS Criterio ON Criterio.Cod_Criterio = Detalle.Cod_criterio
        INNER JOIN FMC1_Encabezado AS Encabezado ON Encabezado.NumeroFormulario = Detalle.NumeroFormulario
        ORDER BY Encabezado.Fecha`
        
        
        const pool = await getConnection()

        const result = await pool.request().query(query)

        res.status(200).send(result.recordset)
        
    } catch (error) {
        console.error('Error en la consulta a la base de datos:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });      
    }
}





module.exports = {
    agregarDatosTabla,
    estadisticas,
    ultimosRegistros,
    estadisticasFormGestor,
    estadisticasFormGeneral
}
