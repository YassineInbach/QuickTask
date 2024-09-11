const categoryColors = {
    'Groceries': '#27AE60',
    'Work': '#2F80ED',
    'Study': '#F2994A',
    'Sports': '#9B51E0',
};

// Déclaration des variables
var addButton = document.querySelector('.add-button');
var taskInput = document.querySelector('.task-input');
var categorySelect = document.querySelector('#category-select');
var allTasks = document.querySelector('.all-task');
var taskList = document.querySelector('.task-list');
var categoryInput = document.querySelector('.new-category-input');
var filterInput = document.getElementById('filter-input');
var toggleSearch = document.getElementById('toggle-search');
var categoryBtn = document.querySelector('.new-category-btn');
var btnAllTasks = document.querySelector('.btn-all-tasks');
var title = document.getElementById('title');

// Function to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

// Function to filter tasks by category
function filterTasksByCategory(category){
    document.querySelectorAll('.all-task-item').forEach(task => {
        let taskCategory = task.querySelector('.task-category').textContent.toLowerCase(); 
        task.style.display = taskCategory === category.toLowerCase() ? '' : 'none';
    });
};

// add event listner "Afficher toutes les tâches"
btnAllTasks.addEventListener('click', () => {
    var tasksItems = document.querySelectorAll('.all-task-item');
    var categoryItems = document.querySelectorAll('.category');
    tasksItems.forEach((task) => {
        task.style.display = '';
    });
    categoryItems.forEach((categoryItem) => {
        categoryItem.style.borderLeft = "none";
        categoryItem.style.paddingLeft = "0";
        categoryItem.style.color = "black";
    });
    title.textContent = "ALL Tasks";
    title.style.color = "black"
    console.log('Toutes les tâches sont affichées.');
});

// Function to handle category button clicks
function handleCategoryClick() {
    var category = this.getAttribute('data-category').toLowerCase();
    var categoryItem = document.querySelectorAll('.category');
    var borderColor = categoryColors[capitalizeFirstLetter(category)] || 'black'; 

    title.textContent = capitalizeFirstLetter(category);
    title.style.color = borderColor;

    categoryItem.forEach((task) => {
        var taskCategory = task.getAttribute('data-category').toLowerCase();
        if (taskCategory === category) {
            task.style.borderLeft = `5px solid ${borderColor}`;
            task.style.paddingLeft = '10px';
            task.style.color = `${borderColor}`;

        } else {
            task.style.borderLeft = "none";
            task.style.paddingLeft = 0;
            task.style.color = "black"; 
        }
    });

    filterTasksByCategory(category);
}
// Function to attach event listeners to category buttons
function attachCategoryButtonListeners(){
    document.querySelectorAll('.category').forEach(button => {
        button.removeEventListener('click', handleCategoryClick); // Ensure no duplicate listeners
        button.addEventListener('click', handleCategoryClick);
    });
};

// Function to increment the task count category
function incrementTaskCount(category, countChange) {
    // Mise à jour du compteur pour la catégorie spécifique
    var categoryButtons = document.querySelectorAll('.category');
    categoryButtons.forEach(button => {
        if (button.getAttribute('data-category').toLowerCase() === category.toLowerCase()) {
            let taskCount = button.nextElementSibling; // Le prochain élément frère est le span du compteur de tâches
            let currentCount = parseInt(taskCount.textContent) || 0; // Obtenir le nombre actuel
            taskCount.textContent = Math.max(currentCount + countChange, 0); // Met à jour le compteur de la catégorie
        }
    });
}

function handleRemoveClick(event) {
    let removeButton = event.target.closest('.btn-remove');
    let taskItem = removeButton.closest('.all-task-item');
    let cercleButton = taskItem.querySelector('.checkbox');
    let category = taskItem.querySelector('.task-category').textContent;
    removeTask(taskItem, cercleButton, category);
}

function attachRemoveButtonListeners() {
    document.querySelectorAll('.btn-remove').forEach(button => {
        button.removeEventListener('click', handleRemoveClick); // Assurez-vous qu'il n'y a pas de double écouteurs
        button.addEventListener('click', handleRemoveClick);
    });
}

// Function to remove taskItem
function removeTask(taskItem, cercleButton , category) {
    if (cercleButton.classList.contains('checked')) {
        taskItem.remove(); // Remove the task item
        console.log('Task removed:', taskItem);
        incrementTaskCount(category, -1); // Met à jour le compteur de la catégorie et le compteur total
        updateCategoryCount(-1)
        confirm('You wanted to delete this task')
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

// Add event listener for new category
categoryBtn.addEventListener('click', (e) => {
    e.preventDefault();

    var categoryValue = categoryInput.value.trim();

    if (categoryValue) {
        let formattedCategoryValue = capitalizeFirstLetter(categoryValue);
        
        // Add to the select element
        let newOption = document.createElement('option');
        newOption.value = formattedCategoryValue;
        newOption.textContent = formattedCategoryValue;
        categorySelect.appendChild(newOption);

        // Add to the task list
        let newTaskItem = document.createElement('li');
        newTaskItem.className = 'task-item';
        newTaskItem.innerHTML = `
            <button class="category" data-category="${formattedCategoryValue}">
            ${formattedCategoryValue}</button>
            <span class="task-count">0</span>
        `;

        taskList.appendChild(newTaskItem);
        // Clear the input
        categoryInput.value = '';

        // Re-attach event listeners to the new category buttons
        attachCategoryButtonListeners();
    } else {
        alert('Veuillez remplir tous les champs');
    }
});

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

allTasks.addEventListener('click', function(e) {
    var event = e.target;
    // Gestion des cases à cocher (checkbox)
    if (event.classList.contains('checkbox')) {
        let taskText = event.nextElementSibling;

        // Basculer la classe 'checked'
        event.classList.toggle('checked');

        // Mettre à jour les styles en fonction de l'état de la case
        if (event.classList.contains('checked')) {
            taskText.style.textDecoration = 'line-through';
            taskText.style.color = '#EB5757';
        } else {
            taskText.style.textDecoration = 'none';
            taskText.style.color = 'inherit';
        }
    }

    // Gestion des boutons "like" (btn-heart)
    if (event.closest('.btn-heart')) {
        let likeButtonIcon = event.closest('.btn-heart').querySelector('i');
        // Basculer l'icône entre 'fa-regular' et 'fa-solid'
        if (likeButtonIcon.classList.contains('fa-regular')) {
            likeButtonIcon.classList.replace('fa-regular', 'fa-solid');
            // updateCategoryCount(1); 
            updateCategoryCount(1)

        } else {
            likeButtonIcon.classList.replace('fa-solid', 'fa-regular');
            // updateCategoryCount(-1);
            updateCategoryCount( -1)
        }
    }
});

function updateCategoryCount(countChange) {
        let countSpan = document.querySelector('.total-count');
                let currentCount = parseInt(countSpan.textContent) || 0;
                let newCount = Math.max(currentCount + countChange, 0);
                countSpan.textContent = newCount;
 }

// Add event listener for adding tasks
addButton.addEventListener('click', function(e) {
    e.preventDefault();

    var taskValue = taskInput.value.trim();
    var selectedCategory = categorySelect.value;
    var bgColor = categoryColors[capitalizeFirstLetter(selectedCategory)];

    if (taskValue && selectedCategory) {
        let tasksItem = document.createElement('li');
        let cercleButton = document.createElement('button');
        let taskText = document.createElement('p');
        let taskCategory = document.createElement('span');
        let likeButton = document.createElement('button');
        let removeButton = document.createElement('button');

        tasksItem.className = 'all-task-item flex items-center';
        cercleButton.className = 'checkbox';
        taskText.className = 'task-text';
        taskText.innerHTML = `<b>${taskValue}</b>`;
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

        if (bgColor) {
            taskCategory.style.backgroundColor = bgColor;
        } else {
            console.log(`No color found for category: ${selectedCategory}`); // Debugging statement
            taskCategory.style.backgroundColor = "#000000"; // Default color
        }

        tasksItem.appendChild(cercleButton);
        tasksItem.appendChild(taskText);
        tasksItem.appendChild(taskCategory);
        tasksItem.appendChild(likeButton);
        tasksItem.appendChild(removeButton);
        allTasks.appendChild(tasksItem);

        taskInput.value = '';
        categorySelect.selectedIndex = 0;

        // incrementTaskCount(selectedCategory)
        incrementTaskCount(selectedCategory , 1)
        
        // Event listener for remove button
        removeButton.addEventListener('click', function() {
            removeTask(tasksItem , cercleButton , selectedCategory)
        });

    } else {
        alert('Veuillez remplir tous les champs.');
    }
});

// Initial setup
attachCategoryButtonListeners();
attachRemoveButtonListeners();