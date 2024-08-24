/*Déclaration des variables*/
var addButton = document.querySelector('.add-button');
var taskInput = document.querySelector('.task-input');
var categorySelect = document.querySelector('#category-select');
var allTasks = document.querySelector('.all-task');

// géré les color en random
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Ajouter un événement au bouton "Add"
addButton.addEventListener('click', function(e) {
    e.preventDefault();
    // Pour la récupération des valeurs et catégory
    var taskValue = taskInput.value.trim();
    var categoryValue = categorySelect.value;

    console.log(`Pour la Valeur : ${taskValue} , Pour la CategoryValue : ${categoryValue}`);

    // Vérification des champ n'est pas vide
    if (taskValue && categoryValue) {

        var tasksItem = document.createElement('li');
        tasksItem.className = 'all-task-item';

        var cercleButton = document.createElement('button');
        cercleButton.className = 'cercle';

        var taskText = document.createElement('p');
        taskText.className = 'task-text';
        taskText.innerHTML = `<strong>${taskValue}</strong>`;

        var taskCategory = document.createElement('span');
        taskCategory.className = 'task-category';
        taskCategory.textContent = categoryValue;
        taskCategory.style.backgroundColor = getRandomColor(); // Appliquer la couleur aléatoire


        tasksItem.appendChild(cercleButton);
        tasksItem.appendChild(taskText);
        tasksItem.appendChild(taskCategory);

        allTasks.appendChild(tasksItem);

        // Réinitialiser l'input et le select
        taskInput.value = '';
        categorySelect.selectedIndex = 0;
    } else {
        alert('Veuillez remplir tous les champs.');
    }
});
