class Luchador{
    acciones = [];

    constructor(nick, pv,ca,ta,fue,des,cont,inteli,sab,car){
        this.nombre = nick;
        this.pv = pv;
        this.ca = ca;
        this.ta = ta;
        this.fue = fue;
        this.des = des;
        this.cont = cont; 
        this.inteli = inteli;
        this.sab = sab;
        this.car = car;
    }

    aniadeAccion(name,desc,danio){
        var acc = new Accion(name,desc,danio);
        this.acciones.push(acc);
    }

    //Metodos get de luchador
    /******************************/
    get Nombre(){
        return this.nombre;
    }

    get Vida(){
        return this.pv;
    }

    get Armadura(){
        return this.ca;
    }

    get Tirada(){
        return this.ta;
    }

    get Fuerza(){
        return this.fue;
    }

    get Destreza(){
        return this.des;
    }

    get Constitucion(){
        return this.cont;
    }

    get Inteligencia(){
        return this.inteli;
    }

    get Sabiduria(){
        return this.sab;
    }

    get Carisma(){
        return this.car;
    }

    //Metodos set
    set aniadeVida(nPV){
        this.pv += nPV;
    }

    set restaVida(nPV){
        this.pv -= nPV;
    }
    //Implementar algun set más?

    /******************************/
}


//Tipos de luchadores del sistema
/*****************************************************************/
class Personaje extends Luchador{
    constructor(nick, pv,ca,ta,fue,des,cont,int,sab,car,raza){
        this.super(nick, pv,ca,ta,fue,des,cont,int,sab,car);
        this.raza = raza;
    }

}

class Monstruo extends Luchador{
    constructor(nick, pv,ca,ta,fue,des,cont,int,sab,car,raza){
        this.super(nick, pv,ca,ta,fue,des,cont,int,sab,car);
    }


}
/*****************************************************************/

//Acciones a realizar
/*****************************************************************/
class Accion{
    constructor(nombre,descripcion,pd){
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.pd = pd;
    }
}
/*****************************************************************/


//Representación del combate
/*****************************************************************/
class Combate{
    luchadores = [];
    rondas = 0;
    nTurnos = 0;

    aniadirLuchador(tipoLuchador){
        let newFighter;

        if (tipoLuchador == 1){
            newFighter = generarPersonaje();    //Realizar funcion que a partir de un formulario, genere un personaje
        }else{
            newFighter = generarMonstruo();     //Realizar funcion que a partir de un formulario, genere un monstruo
        }

        this.luchadores.push(newFighter);
    }

    eliminarLuchador(nombreLuchador){
        var i = luchadores.indexOf(nombreLuchador);
        
        if(i !== -1){
            this.luchadores.splice(i,1);
        }
    }

    pasarTurno(){
        nTurnos++;
        if(nTurnos == this.luchadores.length()){
            nTurnos = 0;
            rondas++;
        }
    }

    /*Implementar simulación del combate
    * 0.- Iniciar combate
    *
    * 1.- Aniadir y eliminar luchadores cuando desee el usuario
    *   1.1.- ¿Eliminar el luchador cuando este se quede a 0 de vida? En principio no.
    * 
    * 2.- Señalar cuando es el turno de un luchador a través de mensaje o icono
    * 
    * 3.- Se pasa de turnos correctamente y se reinicia el orden tras finalizar cada ronda
    * 
    * 4.- Finalizar combate cuando el usuario lo desee
    */


}

//CREAR CLASE ENUM CON DISTINTAS RAZAS, Y DEPENDIENDO DE ESTAS REALIZAR UN 
//METODO QUE MODIFIQUE LOS ATRIBUTOS DEL PERSONAJE AL CREARLO

/*****************************************************************/