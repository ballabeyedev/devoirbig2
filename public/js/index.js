let taskList = document.getElementById("taskList");
let totalCount = document.createElement("div");
totalCount.id = "taskCounter";
document.querySelector(".container").appendChild(totalCount);

// Charger les tâches sauvegardées au démarrage
loadTasks();

// Ajouter une tâche
function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Veuillez entrer une tâche.");
        return;
    }

    let task = {
        text: taskText,
        completed: false
    };

    createTaskElement(task);
    saveTasks();
    taskInput.value = ""; // Réinitialisation du champ texte
    updateTaskCounter();
}

// Créer un élément de tâche
function createTaskElement(task) {
    let li = document.createElement("li");
    li.textContent = task.text;

    // Ajouter la classe "completed" si la tâche est terminée
    if (task.completed) {
        li.classList.add("completed");
    }

    // Marquer une tâche comme terminée au clic
    li.onclick = function () {
        li.classList.toggle("completed");
        saveTasks(); // Mettre à jour le stockage
        updateTaskCounter(); // Mettre à jour le compteur
    };

    // Bouton pour supprimer une tâche
    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<ion-icon name="trash-outline"></ion-icon> Supprimer';
    deleteButton.onclick = function (e) {
        e.stopPropagation(); // Éviter de déclencher l'événement du clic sur la tâche
        deleteTask(li);
    };

    li.appendChild(deleteButton);
    taskList.appendChild(li);
    updateTaskCounter(); // Mettre à jour le compteur
}

// Supprimer une tâche
function deleteTask(task) {
    taskList.removeChild(task);
    saveTasks(); // Mettre à jour le stockage
    updateTaskCounter(); // Mettre à jour le compteur
}

// Supprimer toutes les tâches
function deleteAllTasks() {
    if (confirm("Êtes-vous sûr de vouloir tout supprimer ?")) {
        taskList.innerHTML = ""; 
        saveTasks(); // Vider le stockage
        updateTaskCounter(); // Mettre à jour le compteur
    }
}

// Sauvegarder les tâches dans le localStorage
function saveTasks() {
    let tasks = [];
    taskList.querySelectorAll("li").forEach(li => {
        tasks.push({
            text: li.firstChild.textContent,
            completed: li.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Charger les tâches depuis le localStorage
function loadTasks() {
    let savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        JSON.parse(savedTasks).forEach(task => {
            createTaskElement(task);
        });
    }
    updateTaskCounter(); // Mettre à jour le compteur après chargement
}

// Mettre à jour le compteur de tâches
function updateTaskCounter() {
    let totalTasks = taskList.querySelectorAll("li").length;
    let completedTasks = taskList.querySelectorAll("li.completed").length;
    totalCount.innerHTML = `Tâches totales : ${totalTasks} | Tâches terminées : ${completedTasks}`;
}

// Bouton pour supprimer toutes les tâches
let deleteAllButton = document.createElement("button");
deleteAllButton.innerHTML = '<ion-icon name="trash-bin-outline"></ion-icon> Supprimer Tous';
deleteAllButton.onclick = deleteAllTasks;
deleteAllButton.classList.add("delete-all-button");  // Ajout de la classe pour le bouton
document.querySelector(".container").appendChild(deleteAllButton);
