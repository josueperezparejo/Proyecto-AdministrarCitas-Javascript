import Citas from './classes/Citas.js';
import UI from './classes/UI.js';
import { 
    mascotaInput,
    propietarioInput, 
    telefonoInput, 
    fechaInput, 
    horaInput, 
    sintomasInput, 
    formulario 
} from './selectores.js';

const ui = new UI();
const administrarCitas = new Citas();

let editando;

// Objeto con la informacion de la cita
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: '',
}

// Agrega datos al objeto de cita
export function datosCita(e) {
    citaObj[e.target.name] = e.target.value
}

// valida y agrega una nueva cita a la clase de citas
export function nuevaCita(e) {
    e.preventDefault();

    // extraer la informacion del objeto de cita
    const {mascota, propietario, telefono, fecha, hora, sintomas} = citaObj;

    // Validar
    if( mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '' ) {   
        ui.imprimirAlerta('Todos los campos son Obligatorios', 'error');
        return;
    }

    if(editando) {
        ui.imprimirAlerta('Editado Correctamente')

        // Pasar el objeto de la cita a edicion
        administrarCitas.editarCita({...citaObj});

        // Regresar el texto del boton a su estado original 
        formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';

        // Quitar modo edicion
        editando = false;                
    } else {
        // Generar un id Unico
        citaObj.id = Date.now();

        // Creando una nueva cita 
        administrarCitas.agregarCita({...citaObj});

        // Mensaje de agregado correctamente
        ui.imprimirAlerta('Agregado Correctamente')
    }

    // Reiniciar objeto para la validacion
    reiniciarObjeto();

    // Reinicia el formulario
    formulario.reset();

    // Mostrar citas en el DOM 
    ui.imprimirCitas(administrarCitas);  
}

export function reiniciarObjeto() {
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}

export function eliminarCita(id) {
    // Eliminar la cita 
    administrarCitas.eliminarCita(id);

    // Muestra un mensaje 
    ui.imprimirAlerta('Eliminado Correctamente')

    // Refrescar las citas
    ui.imprimirCitas(administrarCitas);
}

// Carga los datos y modo edicion
export function cargarEdicion(cita) {
    const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;

    // Llenar los inputs
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    // Llenar el objeto de cita
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    // Cambiar texto del boton 
    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';

    editando = true;
}