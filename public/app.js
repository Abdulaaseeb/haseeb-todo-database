// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";
import { getDatabase, ref, set, push, onValue } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD2r3gWNZcFrS3L_WkJIDogK8jVClr5M2s",
    authDomain: "haseeb-todo-app.firebaseapp.com",
    databaseURL: "https://haseeb-todo-app-default-rtdb.firebaseio.com",
    projectId: "haseeb-todo-app",
    storageBucket: "haseeb-todo-app.appspot.com",
    messagingSenderId: "265880891588",
    appId: "1:265880891588:web:c2fabdb7f9baa340031991"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app)
const db = getDatabase()


var list = document.getElementById("list")
var todo_app = document.getElementById("todo-app")
var  deletebtn
 

window.getData = function () {
    var reference2 = ref(db, "todo/")
    onValue(reference2, function (data) {
        console.log(data.val())
        var dataList = data.val()
        var getValues = Object.values(dataList)
        renderData(getValues)
       
    
    })
}
window.renderData = function(dataArr){
    console.log(dataArr)
    list.innerHTML = ""
    for(var i = 0; i < dataArr.length; i++){
        list.innerHTML += `<li>${dataArr[i].todoApp}</li>`
        var deletebtn = document.createElement("button")
    var deletetext = document.createTextNode("Delete")
    deletebtn.setAttribute("class", "btn btn-dark ms-2 mt-1")
    deletebtn.setAttribute("onclick", "todolist(this)")
    deletebtn.appendChild(deletetext)
    }
}
window.todo_list = function () {
    

    var li = document.createElement("li")
    var textlist = document.createTextNode(todo_app.value)
    li.appendChild(textlist)

    //------- Create delete button -------//
  
    var  deletebtn = document.createElement("button")
    var deletetext = document.createTextNode("Delete")
    deletebtn.setAttribute("class", "btn btn-dark ms-2 mt-1")
    deletebtn.setAttribute("onclick", "todolist(this)")
    deletebtn.appendChild(deletetext)

    //------- Create edit button ------//
    var editbtn = document.createElement("button")
    var edittext = document.createTextNode("Edit")
    editbtn.appendChild(edittext)
    editbtn.setAttribute("class", "btn btn-dark ms-2 mt-1")
    editbtn.setAttribute("onclick", "editItem(this)")
    li.appendChild(deletebtn)
    li.appendChild(editbtn)
    list.appendChild(li)
    var idRef = ref(db, 'todo/')
    var id = push(idRef).key

    var obj = {
        todoApp: todo_app.value,
        id: id,
       
    }


    var reference = ref(db, `todo/${id}/`)
    // list.innerHTML = ""
    todo_app.value = ""


    set(reference, obj)
    getData()
   

    // console.log(li)

}





window.todolist = function (e) {
    e.parentNode.remove()
}

window.editItem = function (h) {
    var val = prompt("Enter the value", h.parentNode.firstChild.nodeValue)
    h.parentNode.firstChild.nodeValue = val
}

window.deleteall = function () {

    list.innerHTML = ""
}