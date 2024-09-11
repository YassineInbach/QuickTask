const categoryColors = {
    'Groceries': '#27AE60',
    'Work': '#2F80ED',
    'Study': '#F2994A',
    'Sports': '#9B51E0',
};

// Declare variables
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
function filterTasksByCategory(category) {
    document.querySelectorAll('.all-task-item').forEach(task => {
        let taskCategory = task.querySelector('.task-category').textContent.toLowerCase();
        task.style.display = taskCategory === category.toLowerCase() ? '' : 'none';
    });
}

// Add event listener "Afficher toutes les tâches"
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
    title.style.color = "black";
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
function attachCategoryButtonListeners() {
    document.querySelectorAll('.category').forEach(button => {
        button.removeEventListener('click', handleCategoryClick); // Remove previous listener
        button.addEventListener('click', handleCategoryClick);
    });
}

// Function to increment the task count category
function incrementTaskCount(category, countChange) {
    var categoryButtons = document.querySelectorAll('.category');
    categoryButtons.forEach(button => {
        if (button.getAttribute('data-category').toLowerCase() === category.toLowerCase()) {
            let taskCount = button.nextElementSibling; // The next sibling is the task count span
            let currentCount = parseInt(taskCount.textContent) || 0; // Get the current count
            taskCount.textContent = Math.max(currentCount + countChange, 0); // Update the count
        }
    });
}

// Function to handle remove button click
function handleRemoveClick(event) {
    const removeButton = event.target.closest('.btn-remove');
    if (removeButton) {
        const taskItem = removeButton.closest('.all-task-item');
        const cercleButton = taskItem.querySelector('.checkbox');
        const category = taskItem.querySelector('.task-category').textContent;
        removeTask(taskItem, cercleButton, category);
    }
}

// Function to attach event listeners to remove buttons
function attachRemoveButtonListeners() {
    document.querySelectorAll('.btn-remove').forEach(button => {
        button.removeEventListener('click', handleRemoveClick); // Remove previous listener
        button.addEventListener('click', handleRemoveClick);
    });
}

// Function to remove taskItem
function removeTask(taskItem, cercleButton, category) {
    if (cercleButton.classList.contains('checked')) {
        taskItem.remove(); // Remove the task item
        console.log('Task removed:', taskItem);
        incrementTaskCount(category, -1); // Update the category count
        updateCategoryCount(-1); // Update the total count
        confirm('You wanted to delete this task');
    } else {
        alert('Veuillez marquer la tâche comme complétée avant de la supprimer.');
    }
}

// // Function filter task
// function filterTasks(){
//     var filterValue = filterInput.value.toLowerCase();
//     var tasksItem = document.querySelectorAll('.all-task-item');
//     tasksItem.forEach((task) => {
//         var taskText = task.querySelector('.task-text').innerText.toLowerCase(); 
//         if (taskText.includes(filterValue)) {
//             task.style.display = ''; // Afficher l'élément si le texte contient la valeur de recherche
//             console.log('Showing task:', taskText);
//         } else {
//             task.style.display = 'none'; // Masquer l'élément sinon
//             console.log('Hidding task:', taskText);
//         }
//     }) 
// }

// filterInput.addEventListener('input', filterTasks);

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

// Toggle event listener
toggleSearch.addEventListener('click', () => {
    var searchForm = document.querySelector('.search-form');
    var screenWidth = window.innerWidth;

    if (searchForm.style.width === "0%" || searchForm.style.width === "") {
        searchForm.style.width = (screenWidth <= 600) ? "100%" : "70%";
        filterInput.style.padding = '0 10px';
    } else {
        searchForm.style.width = "0%";
        filterInput.style.padding = '0';
    }
});

// Event listener for task interactions
allTasks.addEventListener('click', function(e) {
    var event = e.target;

    // Handle checkbox clicks
    if (event.classList.contains('checkbox')) {
        let taskText = event.nextElementSibling;

        // Toggle the 'checked' class
        event.classList.toggle('checked');

        // Update styles based on the checkbox state
        if (event.classList.contains('checked')) {
            taskText.style.textDecoration = 'line-through';
            taskText.style.color = '#EB5757';
        } else {
            taskText.style.textDecoration = 'none';
            taskText.style.color = 'inherit';
        }
    }

    // Handle like button clicks
    if (event.closest('.btn-heart')) {
        let likeButtonIcon = event.closest('.btn-heart').querySelector('i');
        if (likeButtonIcon.classList.contains('fa-regular')) {
            likeButtonIcon.classList.replace('fa-regular', 'fa-solid');
            updateCategoryCount(1); 
        } else {
            likeButtonIcon.classList.replace('fa-solid', 'fa-regular');
            updateCategoryCount(-1);
        }
    }
});

// Function to update total count
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
        likeButton.innerHTML = `<i class="fa-regular fa-heart"></i>`;
        removeButton.className = 'btn-remove';
        removeButton.innerHTML = `<i class="fa-solid fa-trash"></i>`;
        taskCategory.textContent = capitalizeFirstLetter(selectedCategory);

        if (bgColor) {
            taskCategory.style.backgroundColor = bgColor;
        } else {
            console.log(`No color assigned for category: ${selectedCategory}`);
        }

        tasksItem.appendChild(cercleButton);
        tasksItem.appendChild(taskText);
        tasksItem.appendChild(taskCategory);
        tasksItem.appendChild(likeButton);
        tasksItem.appendChild(removeButton);

        taskList.appendChild(tasksItem);

        // Clear the input fields
        taskInput.value = '';
        categorySelect.value = '';

        // Re-attach event listeners to the new remove buttons
        attachRemoveButtonListeners();
    } else {
        alert('Veuillez remplir tous les champs');
    }
});

attachCategoryButtonListeners();
attachRemoveButtonListeners();


