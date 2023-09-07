let datosArr = []

fetch('/File.json')
    .then(response => response.json())
    .then(data => {
        datosArr = data
    })

const ViewDatos =() => {
    pushDatos(datosArr.personajesStarWars)
}


const pushDatos =(arr) => {
    document.getElementById("results").innerHTML = "" 
    arr.forEach( (personajes, index) => {
        document.getElementById("results").innerHTML += `
        <tr>
            <th scope="row">${++index}</th>
            <td>${personajes.nombre}</td>
            <td>${personajes.edad}</td>
            <td>${personajes.genero}</td>
            <td><button class="btn btn-danger " onclick="eliminarPersonaje(${--index})">Eliminar</button></td>
        </tr>
    `
    });
}

const ordenar =() => {
    let arrayOrdenado = datosArr.personajesStarWars.sort((a, b) => {
        if (a.nombre > b.nombre) {
            return 1
        }
        if (a.nombre < b.nombre) {
            return -1
        }
        return 0
    })

    pushDatos(arrayOrdenado)
}

const newPersonaje = () => {
    let nombre = document.getElementById("nombre").value
    const correccionNombre = nombre.charAt(0).toUpperCase() + nombre.slice(1);
    let edad = parseInt(document.getElementById("edad").value)
    let genero = document.getElementById("genero").value
    let especie = document.getElementById("especie").value

    let nuevoPersonaje = {
        nombre: correccionNombre,
        edad: edad,
        genero: genero,
        especie: especie
    }

    datosArr.personajesStarWars.push(nuevoPersonaje)
    pushDatos(datosArr.personajesStarWars)
    ocultarFormulario()
}

const mostrarFormulario = () => {
    document.getElementById("formPersonaje").style.display = "block"
    
}

const ocultarFormulario = () => {
    document.getElementById("formPersonaje").style.display = "none"
}

const eliminarPersonaje = (indice) => {
    datosArr.personajesStarWars.splice(indice,1)
    pushDatos(datosArr.personajesStarWars)
}



const searchPersonaje = () => {
    let personajeBuscado = document.getElementById("buscarItem").value
    let datosEncontrados = datosArr.personajesStarWars.filter( personaje => personaje.nombre.includes(personajeBuscado) )
    if (datosEncontrados.length == 0) {
        document.getElementById("showError").innerHTML = `
        <div class="alert alert-danger" role="alert">
        No se encontraron coincidencias
        </div>
        `
    } else {
        document.getElementById("showError").innerHTML = ""
        pushDatos(datosEncontrados)
    }
    
}

const searchInput = document.getElementById("buscarItem");
searchInput.addEventListener("input",  searchPersonaje)