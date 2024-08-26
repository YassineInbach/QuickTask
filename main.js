// Déclaration des variables
var addButton = document.querySelector('.add-button');
var taskInput = document.querySelector('.task-input');
var categorySelect = document.querySelector('#category-select');
var allTasks = document.querySelector('.all-task');
var taskList = document.querySelector('.task-list');
var categoryInput = document.querySelector('.new-category-input');

// Generate color with function random
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// // Function to add event listeners to all .cercle buttons
// function addCheckEventListeners() {
//     var check = document.querySelectorAll('.cercle');

//     check.forEach(button => {
//         button.addEventListener('click', function() {
//             // Toggle the checked class on the button
//             this.classList.toggle('checked');

//             // Find the corresponding task text element
//             var taskText = document.querySelector('.task-text');

//             // Apply text decoration based on the checked state
//             if (this.classList.contains('checked')) {
//                 taskText.style.textDecoration = 'line-through';
//                 taskText.style.color = '#EB5757';
//             } else {
//                 taskText.style.textDecoration = 'none';
//                 taskText.style.color="inherit";
//             }

//             console.log('checked');
//         });
//     });
// }

// Function to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

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

        // Add event listener for the new task's button
        tasksItem.querySelector('.cercle').addEventListener('click', function() {
            var taskText = this.nextElementSibling; // Selects the .task-text element next to this .cercle button
            if (this.classList.toggle('checked')) {
                taskText.style.textDecoration = 'line-through';
                taskText.style.color = '#EB5757';
            } else {
                taskText.style.textDecoration = 'none';
                taskText.style.color = 'inherit';
            }
        });

    } else if (!categoryValue) {
        alert('Veuillez remplir tous les champs.');
    }
});
