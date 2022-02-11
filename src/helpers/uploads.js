const path = require('path');
const fs   = require('fs');

const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const actualizarImagenCloudinary = async( id, coleccion, files) => {


    let modelo;

    switch ( coleccion ) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if ( !modelo ) {
                return ({
                    msg: `No existe un usuario con el id ${ id }`
                });
            }
        
        break;

        case 'productos':
            modelo = await Producto.findById(id);
            if ( !modelo ) {
                return ({
                    msg: `No existe un producto con el id ${ id }`
                });
            }
        
        break;
    
        default:
            return ({ msg: 'Se me olvidó validar esto'});
    }


    // Limpiar imágenes previas
    if ( modelo.img ) {
        // Hay que borrar la imagen del servidor
        const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.img );
        if ( fs.existsSync( pathImagen ) ) {
            fs.unlinkSync( pathImagen );
        }
    }


    const nombre = await subirArchivo( files, undefined, coleccion );
    modelo.img = nombre;

    await modelo.save();


    return ( modelo );

}