firebase.initializeApp({
    apiKey: "AIzaSyAmrLqw9nrTgqULk2jr8FDnQxD-j7_dVbc",
    authDomain: "plp-apps-b90ff.firebaseapp.com",
    projectId: "plp-apps-b90ff",
    storageBucket: "plp-apps-b90ff.appspot.com",
    messagingSenderId: "903205949342",
    appId: "1:903205949342:web:72429c8f693fad95e4108f"
});

const db = firebase.firestore();

// function to add tasks 
function addTask(){
    const taskInput = document.getElementById("task-input");
    const task = taskInput.value.trim();
    if(task !== ""){
        db.collection("tasks").add({
            task: task,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        taskInput.value = "";
        console.log("Task Added!");
    }
}

function renderTasks(doc){
    const taskList = document.getElementById("task-list");
    const taskItem = document.createElement("li");
    taskItem.className = "task-item";
    taskItem.innerHTML = `
    <span>${doc.data().task}</span>
    <button onclick="deleteTask('${doc.id}')">Delete</button>
    `;
    taskList.appendChild(taskItem);
}

db.collection("tasks")
    .orderBy("timestamp", "desc")
    .onSnapshot(snapshot => {
        const changes = snapshot.docChanges();
        changes.forEach(change => {
            if(change.type === "added"){
                renderTasks(change.doc);
            }
        });
    });

function deleteTask(id){
    db.collection("tasks").doc(id).delete();
    console.log("Task Deleted!");
}
