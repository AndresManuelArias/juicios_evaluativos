
/** @module QueryCrud 
 * */

class QueryCrud {
    /**
     *  *
     * @async
     * @method ejecutaView - Es la vista que se ejecuta en GET
    *@param {string} accion -  Peticion que indica que debe accion del crud debe realizar
    *@param {string} req - Peticion del usuario
    *@param {string} res - Respuesta al usuario
     */
    ejecutaView(accion,req,res){  
        
        console.log('ejecutarView',accion.accion)
        switch (accion.accion) {
            case 'Eliminar':
                this.eliminarView(req,res)
                break;
            case 'Actualizar':
                this.actualizarView(req,res)
            break;       
            case 'Crear': 
                this.crearView(req,res)
            break;
            default:
            this.crearView(req,res)
            break;
        }
    }
    /**
     *  *
        * @async
        * @method ejecutar - Es la accion que se ejecuta en POST
        *@param {string} accion -  Peticion que indica que debe accion del crud debe realizar
        *@param {string} req - Peticion del usuario
        *@param {string} res - Respuesta al usuario
     */
    ejecutar(accion,req,res){  
        console.log('ejecutar')
        switch (accion.accion) {
            case 'Eliminar':
                this.eliminar(req,res)
                break;
            case 'Actualizar':
                this.actualizar(req,res)
            break;       
            case 'Crear': 
                this.crear(req,res)
            break;
            default:
            break;
        }
    }
    /**
        * @async
        * @method leer - Accion que se ejecuta en POST
        *@param {string} req - Peticion del usuario
        *@param {string} res - Respuesta al usuario
     */    
    async leer(req,res){

    } 
    /**
        * @async
        * @method crear - Accion que se ejecuta en POST
        *@param {string} req - Peticion del usuario
        *@param {string} res - Respuesta al usuario
     */ 
    async crear(req,res){

    }
    /**
    * @async
    * @method eliminar - Accion que se ejecuta en POST
    *@param {string} req - Peticion del usuario
    *@param {string} res - Respuesta al usuario
     */ 
    async eliminar(req,res){

    }
    /**
    * @async
    * @method actualizar - Accion que se ejecuta en POST
    *@param {string} req - Peticion del usuario
    *@param {string} res - Respuesta al usuario
     */ 
    async actualizar(req,res){

    }
    /**
    * @async
    * @method leerView - Accion que se ejecuta en GET
    *@param {string} req - Peticion del usuario
    *@param {string} res - Respuesta al usuario
     */ 
    async leerView(req,res){

    }
        /**
    * @async
    * @method crearView - Accion que se ejecuta en GET
    *@param {string} req - Peticion del usuario
    *@param {string} res - Respuesta al usuario
     */  
    async crearView(req,res){

    }
        /**
    * @async
    * @method eliminarView - Accion que se ejecuta en GET
    *@param {string} req - Peticion del usuario
    *@param {string} res - Respuesta al usuario
     */     
    async eliminarView(req,res){

    }
        /**
    * @async
    * @method actualizarView - Accion que se ejecuta en GET
    *@param {string} req - Peticion del usuario
    *@param {string} res - Respuesta al usuario
     */ 
    async actualizarView(req,res){

    }
}
module.exports = QueryCrud