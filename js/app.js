

  // Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyDx7u7AuJlH0hXPQdvPdFmZOdIoOZMpvvs",
    authDomain: "farmacia-59988.firebaseapp.com",
    projectId: "farmacia-59988"
  });
  
  var db = firebase.firestore();

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
        </tr>
        `
    });
});
}

