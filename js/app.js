

  // Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyDx7u7AuJlH0hXPQdvPdFmZOdIoOZMpvvs",
    authDomain: "farmacia-59988.firebaseapp.com",
    projectId: "farmacia-59988"
  });
  
  var db = firebase.firestore();

listar();

function guardar(){
    
    var name = document.getElementById("nombre").value;
    var description = document.getElementById("descripcion").value;
    var price = document.getElementById("precio").value;

db.collection("medicamento").add({
    descripcion: description,
    nombre: name,
    precio: price
    
})
.then(function(docRef) {
    console.log("error");
    console.log("Document written with ID: ", docRef.id);
    document.getElementById("nombre").value = "";
    document.getElementById("descripcion").value = "";
    document.getElementById("precio").value =0;
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});

listar();

}

function listar(){
    //Listar
var tabla = document.getElementById("tabla");
db.collection("medicamento").onSnapshot((querySnapshot) => {
tabla.innerHTML = ``;
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().nombre}`);
        tabla.innerHTML += `
        <tr>
        <td>${doc.data().nombre}</td>
        <td>${doc.data().descripcion}</td>
        <td>${doc.data().precio}</td>
        <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
        <td><button class="btn btn-warning" onclick="editar('${doc.id}', '${doc.data().nombre}', '${doc.data().descripcion}', '${doc.data().precio}')">Editar</button></td>
        </tr>
        `
    });
});
}

function eliminar(id){
    db.collection("medicamento").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}

function editar(id, nombre, descripcion, precio){

    document.getElementById("nombre").value = nombre;
    document.getElementById("descripcion").value = descripcion;
    document.getElementById("precio").value = precio;
    
    var boton = document.getElementById("boton");
    boton.innerHTML = 'Editar';

    boton.onclick = function(){

        var medicamento = db.collection("medicamento").doc(id);

        var name = document.getElementById("nombre").value;
        var description = document.getElementById("descripcion").value;
        var price = document.getElementById("precio").value;

        // Set the "capital" field of the city 'DC'
        return medicamento.update({
            nombre: name,
            descripcion: description,
            precio: price
        
        })
        .then(function() {
            console.log("Document successfully updated!");
            boton.innerHTML = 'Guardar';
            document.getElementById("nombre").value = "";
            document.getElementById("descripcion").value = "";
            document.getElementById("precio").value =0;

        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });

    }
}

