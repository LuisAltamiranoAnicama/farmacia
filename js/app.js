

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
    if (name.trim()!= "" && price >0){

        db.collection("medicamento").add({
            descripcion: description,
            nombre: name,
            precio: prices
            
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

}

function buscar(){

    var nombre_buscar = document.getElementById("txtmedicamento").value;

    if (nombre_buscar.trim() == ""){
        listar();
    }

    else{

        var tabla = document.getElementById("tabla");

    db.collection("medicamento").where("nombre", "==", nombre_buscar)
    .get()
    .then(function(querySnapshot) {

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
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}


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
        <td><button class="btn btn-warning" data-toggle="modal" data-target="#ModalNuevo" onclick="editar('${doc.id}', '${doc.data().nombre}', '${doc.data().descripcion}', '${doc.data().precio}')">Editar</button></td>
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

function editar(id1, nombre1, descripcion1, precio1){

    document.getElementById("nombre").value = nombre1;
    document.getElementById("descripcion").value = descripcion1;
    document.getElementById("precio").value = precio1;

    var boton = document.getElementById("boton");
    boton.innerHTML = 'Editar';

    boton.onclick = function(){

        var medicamento = db.collection("medicamento").doc(id1);

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
            document.getElementById("nombre").value = "";
            document.getElementById("descripcion").value = "";
            document.getElementById("precio").value = 0;
            $('#ModalNuevo').modal('hide');
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });

    }
}

