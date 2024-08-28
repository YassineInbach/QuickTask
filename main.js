// Déclaration des variables
var addButton = document.querySelector('.add-button');
var taskInput = document.querySelector('.task-input');
var categorySelect = document.querySelector('#category-select');
var allTasks = document.querySelector('.all-task');
var taskList = document.querySelector('.task-list');
var categoryInput = document.querySelector('.new-category-input');
var filterInput = document.getElementById('filter-input');
var toggleSearch = document.getElementById('toggle-search');

// Generate color with function random
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Function to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

// Function to remove taskItem
function removeTask(taskItem, cercleButton) {
    if (cercleButton.classList.contains('checked')) {
        taskItem.remove(); // Remove the task item
        console.log('Task removed:', taskItem);
    } else {
        alert('Veuillez marquer la tâche comme complétée avant de la supprimer.');
    }
}

// Function filter task
function filterTasks(){
    var filterValue = filterInput.value.toLowerCase();
    var tasksItem = document.querySelectorAll('.all-task-item');
    tasksItem.forEach((task) => {
        var taskText = task.querySelector('.task-text').innerText.toLowerCase(); // Texte de la tâche en minuscules
        if (taskText.includes(filterValue)) {
            task.style.display = ''; // Afficher l'élément si le texte contient la valeur de recherche
            console.log('Showing task:', taskText);
        } else {
            task.style.display = 'none'; // Masquer l'élément sinon
            console.log('Hidding task:', taskText);
        }
    }) 
}

filterInput.addEventListener('input', filterTasks);

//Toggle event listener
toggleSearch.addEventListener('click', () => {
    var searchForm = document.querySelector('.search-form');
    if (searchForm.style.width === "") {
        searchForm.style.width = "40%";
        filterInput.style.padding= '0 10px';
    } else {
        searchForm.style.width = "0%";
        filterInput.style.padding= '0';
    }
});


// Add event listener for the button
addButton.addEventListener('click', function(e) {
    e.preventDefault();
    
    var taskValue = taskInput.value.trim();
    var categoryValue = categoryInput.value.trim();
    var selectedCategory = categorySelect.value;

    if (categoryValue) {
        var newOption = document.createElement('option');
        newOption.value = capitalizeFirstLetter(categoryValue);
        newOption.textContent = capitalizeFirstLetter(categoryValue);
        categorySelect.appendChild(newOption);

        var newTaskItem = document.createElement('li');
        newTaskItem.className = 'task-item';
        newTaskItem.innerHTML = `
            <span class="category">${capitalizeFirstLetter(categoryValue)}</span>
            <span class="task-count"></span>
        `;
        taskList.appendChild(newTaskItem);
        categoryInput.value = '';
    } 

    if (taskValue && selectedCategory) {
        var tasksItem = document.createElement('li');
        var cercleButton = document.createElement('button');
        var taskText = document.createElement('p');
        var taskCategory = document.createElement('span');
        var likeButton = document.createElement('button'); 
        var removeButton = document.createElement('button'); 

        tasksItem.className = 'all-task-item';
        cercleButton.className = 'cercle';
        taskText.className = 'task-text';
        taskText.innerHTML = `<strong>${taskValue}</strong>`;
        taskCategory.className = 'task-category';
        likeButton.className = 'btn-heart';
        likeButton.innerHTML = `
            <i class="fa-regular fa-heart"></i>
        `;
        removeButton.className = 'btn-remove'; 
        removeButton.innerHTML = `
            <i class="fa-solid fa-trash"></i>
        `;
        taskCategory.textContent = capitalizeFirstLetter(selectedCategory);
        taskCategory.style.backgroundColor = getRandomColor();
    
        tasksItem.appendChild(cercleButton);
        tasksItem.appendChild(taskText);
        tasksItem.appendChild(taskCategory);
        tasksItem.appendChild(likeButton);
        tasksItem.appendChild(removeButton); 
        allTasks.appendChild(tasksItem);
    
        taskInput.value = '';
        categorySelect.selectedIndex = 0;

        // Event listener for checkbox button
        tasksItem.querySelector('.cercle').addEventListener('click', function() {
            var taskText = this.nextElementSibling;
            if (this.classList.toggle('checked')) {
                taskText.style.textDecoration = 'line-through';
                taskText.style.color = '#EB5757';
                removeButton.disabled = false; // Enable the remove button
                console.log('checked');
            } else {
                taskText.style.textDecoration = 'none';
                taskText.style.color = 'inherit';
                removeButton.disabled = true; // Disable the remove button
            }
        });

        // Event listener for remove button
        removeButton.addEventListener('click', function() {
            removeTask(tasksItem , cercleButton)
        });

    } else if (!categoryValue) {
        alert('Veuillez remplir tous les champs.');
    }
});
