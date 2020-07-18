namespace general{

window.addEventListener("load", function () {
    document.getElementById("tipo")?.addEventListener("change",mostrarInput);
    document.getElementById("agregar")?.addEventListener("click",abrirAgregar);
    document.getElementById("btnCerrar")?.addEventListener("click",cerrarAgregar);
    document.getElementById("btnCancelar")?.addEventListener("click",cerrarAgregar);
    document.getElementById("btnAgregar")?.addEventListener("click",guardar);
    document.getElementById("search")?.addEventListener("keyup",filter);

    document.getElementById("checkId")?.addEventListener("change",camposMostrar);
    document.getElementById("checkMarca")?.addEventListener("change",camposMostrar);
    document.getElementById("checkModelo")?.addEventListener("change",camposMostrar);
    document.getElementById("checkPrecio")?.addEventListener("change",camposMostrar);

    document.getElementById("filtro-vehiculos")?.addEventListener("change",filter);
})

export var listaVehiculos:Array<Vehiculo> = new Array<Vehiculo>();

export function mostrarInput() {
    var seleccionado = (<HTMLInputElement>document.getElementById('tipo')).value;
    if(seleccionado == 'Auto'){
        const auto = document.querySelector('#selectAuto');
        (<HTMLElement>auto).style.display = "block";

        const camioneta = document.querySelector('#selectCamioneta');
        (<HTMLElement>camioneta).style.display = "none";


    } else if(seleccionado == 'Camioneta'){
        const auto = document.querySelector('#selectAuto');
        (<HTMLElement>auto).style.display = "none";

        const camioneta = document.querySelector('#selectCamioneta');
        (<HTMLElement>camioneta).style.display = "block";
    }
}

export function camposMostrar() {
    if((<HTMLInputElement>document.getElementById("checkId")).checked){
        
    }
    document.getElementById("checkMarca")?.addEventListener("change",camposMostrar);
    document.getElementById("checkModelo")?.addEventListener("change",camposMostrar);
    document.getElementById("checkPrecio")?.addEventListener("change",camposMostrar);
}

    export function abrirAgregar() {
        var contAgregar = document.getElementById("backdrop");
        (<HTMLElement>contAgregar).style.display = "flex";
    }

    export function cerrarAgregar() {
        var contAgregar = document.getElementById("backdrop");
        resetForm();
        (<HTMLElement>contAgregar).style.display = "none";
    }

    function resetForm() {
        (<HTMLInputElement>document.getElementById("id")).value = "";
        (<HTMLInputElement>document.getElementById('marca')).value = "";
        (<HTMLInputElement>document.getElementById('modelo')).value = "";
        (<HTMLInputElement>document.getElementById('precio')).value = "";
        (<HTMLInputElement>document.getElementById('tipo')).value = "";
        (<HTMLInputElement>document.getElementById('puertas')).value = "";

        const perro = document.querySelector('#selectAuto');
        (<HTMLElement>perro).style.display = "none";

        const gato = document.querySelector('#selectCamioneta');
        (<HTMLElement>gato).style.display = "none";

    }

    function resetErrores() {
        (<HTMLInputElement>document.getElementById("id")).classList.remove("error");
        (<HTMLInputElement>document.getElementById("marca")).classList.remove("error");
        (<HTMLInputElement>document.getElementById("modelo")).classList.remove("error");
        (<HTMLInputElement>document.getElementById("precio")).classList.remove("error");
        (<HTMLInputElement>document.getElementById("tipo")).classList.remove("error");
        (<HTMLInputElement>document.getElementById("puertas")).classList.remove("error");
    }

    export function crearTabla(lista:Array<Vehiculo>){
        var tCuerpo = (<HTMLTableElement>document.getElementById("tCuerpo"));

        while(tCuerpo.rows.length > 0){
            tCuerpo.removeChild(tCuerpo.childNodes[0]);
        }
        
        lista.forEach(vehiculo => {
            var id : any = vehiculo.getId();
            var marca : string = vehiculo.getMarca();
            var modelo : string = vehiculo.getModelo();
            var precio : any= vehiculo.getPrecio();
            var dato: any;

            if(vehiculo instanceof Auto){
                var tipo = "Auto";
                dato = "Puertas: " + vehiculo.getPuertas();
            }else if ( vehiculo instanceof Camioneta) {
                var tipo = "Camioneta";
                var esCuatroxCuatro: Boolean =vehiculo.get4x4();
                if(esCuatroxCuatro)
                {
                    dato = "Es 4x4?: Si";
                }else {
                    dato = "Es 4x4?: No";
                }
                
            }  
            

            var tr = document.createElement("tr");

            var tdId = document.createElement("td");
            var nodoTexto = document.createTextNode(id);
            tdId.appendChild(nodoTexto);
            tr.appendChild(tdId);

            var tdMarca = document.createElement("td");
            var nodoTexto = document.createTextNode(marca);
            tdMarca.appendChild(nodoTexto);
            tr.appendChild(tdMarca);

            var tdModelo = document.createElement("td");
            var nodoTexto = document.createTextNode(modelo);
            tdModelo.appendChild(nodoTexto);
            tr.appendChild(tdModelo);

            var tdPrecio = document.createElement("td");
            var nodoTexto = document.createTextNode(precio);
            tdPrecio.appendChild(nodoTexto);
            tr.appendChild(tdPrecio);

            var tdDato = document.createElement("td");
            var nodoTexto = document.createTextNode(dato);
            tdDato.appendChild(nodoTexto);
            tr.appendChild(tdDato);

            var tdAccion = document.createElement("td");
            var btnEliminar = document.createElement("input");
            btnEliminar.type = "button";
            btnEliminar.className = "eliminar"
            btnEliminar.id = "eliminar" + id;
            btnEliminar.value = "Eliminar";
            btnEliminar.addEventListener("click",getPosition)
            btnEliminar.onclick = function(){eliminar(lista.indexOf(vehiculo))};
            tdAccion.appendChild(btnEliminar);
            tr.appendChild(tdAccion);

            (<HTMLElement>tCuerpo).appendChild(tr);
        })
    }

    function getPosition(event:any){
        var position = event.target.parentNode.parentNode.rowIndex;
        console.log(position);
        //eliminar(position);
    }
    
    export function eliminar(position:any) {

        listaVehiculos.splice(position,1);
        crearTabla(listaVehiculos);

    }


    export function guardar() {
        resetErrores();
        var inputMarca = (<HTMLInputElement>document.getElementById("marca")).value;
        var marcaMayus = inputMarca.charAt(0).toUpperCase() + inputMarca.slice(1);

        var inputModelo = (<HTMLInputElement>document.getElementById("modelo")).value;
        var inputPrecio : number = parseInt((<HTMLInputElement>document.getElementById("precio")).value);
        var inputTipo = (<HTMLInputElement>document.getElementById("tipo")).value;
        var inputPuertas = parseInt((<HTMLInputElement>document.getElementById("puertas")).value);
        var inputCuatroxCuatro = (<HTMLInputElement>document.getElementById("cuatroXcuatro")).checked;
        var id :number;

        if (listaVehiculos.length == 0) {
            id = 1;
        }
        else {
            var listaVehiculosAux = listaVehiculos;
            id = listaVehiculosAux.reduce(function (maximo, vehiculo) {
                if (vehiculo.getId() >= maximo) {
                    return vehiculo.getId() + 1;
                }
                return maximo;
            }, 0);
        }

        if(inputMarca.length > 0) {
            if(inputModelo.length > 0){
                if(inputPrecio > 0){
                    if(inputTipo.length > 0){
                        if(inputTipo == "Auto"){
                            if(inputPuertas > 2 && inputPuertas < 6)
                            {
                                Auto.guardarAuto(id,marcaMayus,inputModelo,inputPrecio,inputPuertas);
                                cerrarAgregar();
                            } else {
                                (<HTMLInputElement>document.getElementById("puertas")).classList.add("error");
                            }
                        } else if (inputTipo == "Camioneta")
                        {
                            Camioneta.guardarCamioneta(id,marcaMayus,inputModelo,inputPrecio,inputCuatroxCuatro);
                            cerrarAgregar();
                        }
                    }else {
                        (<HTMLInputElement>document.getElementById("tipo")).classList.add("error");
                    }
                    
                }else{
                    (<HTMLInputElement>document.getElementById("precio")).classList.add("error");
                }
            }else{
                (<HTMLInputElement>document.getElementById("modelo")).classList.add("error");
            }
        } else {
            (<HTMLInputElement>document.getElementById("marca")).classList.add("error");
        }

    }

    export function filter() {
        var listaFiltrada = listaVehiculos.filter(function (vehiculo) {
            return vehiculo instanceof Auto;
            
             
        });
        crearTabla(listaFiltrada);
    }


}