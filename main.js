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
        var taskCategory = taskItem.querySelector('.task-category').textContent.trim();
        taskItem.remove(); // Remove the task item
        console.log('Task removed:', taskItem);
        updateCategoryCount(taskCategory)
    } else {
        alert('Veuillez marquer la tâche comme complétée avant de la supprimer.');
    }
}

// Function filter task
function filterTasks(){
    var filterValue = filterInput.value.toLowerCase();
    var tasksItem = document.querySelectorAll('.all-task-item');
    tasksItem.forEach((task) => {
        var taskText = task.querySelector('.task-text').innerText.toLowerCase(); 
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


// Function updateCategoryCount
function updateCategoryCount(categoryToUpdate) {
    var categoryCounts = {};
    var allTasks = document.querySelectorAll('.all-task-item');
    allTasks.forEach(function(task) {
        var category = task.querySelector('.task-category').textContent.trim();
        if (categoryCounts[category]) {
            categoryCounts[category]++;
        } else {
            categoryCounts[category] = 1;
        }
    });

    console.log("categoryCounts :", categoryCounts);

    var taskItems = document.querySelectorAll('.task-item');
    taskItems.forEach(function(taskItem) {
        var category = taskItem.querySelector('.category').textContent.trim();
        var countSpan = taskItem.querySelector('.task-count');
        if (categoryToUpdate === category) {
            countSpan.textContent = categoryCounts[category] ;
            if (countSpan.textContent > 0) {
                countSpan.style.backgroundColor = "red";
                countSpan.style.color = "white"; 
            } else {
                countSpan.style.backgroundColor = "transparent"; 
                countSpan.style.color = "black"; 
            }
        }
    });
}

//Toggle event listener
toggleSearch.addEventListener('click', () => {
    var searchForm = document.querySelector('.search-form');
    var screenWidth = window.innerWidth;

    if (searchForm.style.width == "0%" || searchForm.style.width =="" ) {
        if (screenWidth <= 600) {
            searchForm.style.width = "100%";
        } else {
            searchForm.style.width = "70%";
        }
        filterInput.style.padding = '0 10px';
    } else {
        searchForm.style.width = "0%";
        filterInput.style.padding = '0';
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

        tasksItem.className = 'all-task-item flex items-center';
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

        // Event listener for like button
        likeButton.addEventListener("click", function() {
            var icon = this.querySelector('i');
            if (icon.classList.contains('fa-regular')) {
                icon.classList.replace('fa-regular', 'fa-solid');
                updateCategoryCount(taskCategory.textContent.trim());
            } else {
                icon.classList.replace('fa-solid', 'fa-regular');        
            }
        });
        
    } else if (!categoryValue) {
        alert('Veuillez remplir tous les champs.');
    }
});
