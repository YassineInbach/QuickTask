// Initialisation des données depuis le localStorage ou utilisation des valeurs par défaut
const storedData = JSON.parse(localStorage.getItem('saveToLocalStorage')) || {
    categories: [
        { name: 'Favorites', disabled: true, taskCount: 0 },
        { name: 'Groceries', disabled: false, taskCount: 1 },
        { name: 'Work', disabled: false, taskCount: 1 },
        { name: 'Study', disabled: false, taskCount: 0 },
        { name: 'Sports', disabled: false, taskCount: 1 }
    ],
    tasks: [
        { text: 'Buy Bananas for the pancakes', category: 'Groceries', checked: true, liked: false },
        { text: 'Go to the Gym', category: 'Sports', checked: true, liked: false },
        { text: 'Prepare roadmap for MVP', category: 'Work', checked: true, liked: false }
    ]
};

// Un objet qui associe les noms de catégories à leurs couleurs correspondantes
const categoryColors = {
    Favorites: '#EB5757',
    Groceries: '#27AE60',
    Work: '#2F80ED',
    Study: '#F2994A',
    Sports: '#9B51E0',
};

// Variables globales
const category = storedData.categories;
const tasks = storedData.tasks;

// Sélection des éléments du DOM
let categorySelect = document.querySelector('#category-select');
let taskList = document.querySelector('.task-list');
let newCategoryForm = document.querySelector('.new-category-form');
let newCategoryInput = document.querySelector('.new-category-input');
let allTasks = document.querySelector('.all-task');
let taskForm = document.querySelector('.task-form');
let taskTextInput = document.querySelector('.task-input');
let title = document.getElementById('title');
let allTasksButton = document.querySelector('.btn-all-tasks');
var toggleSearch = document.getElementById('toggle-search');
var filterInput = document.getElementById('filter-input');



title.textContent = "All Tasks";

// Fonction pour capitaliser la première lettre d'une chaîne de caractères
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

// Fonction pour enregistrer les catégories et les tâches dans le localStorage
function saveToLocalStorage() {
    localStorage.setItem('saveToLocalStorage', JSON.stringify({
        categories: category,
        tasks: tasks
    }));
}

// Fonction pour créer dynamiquement les catégories dans le select et la liste
function generateCategories() {
    categorySelect.innerHTML = '';
    taskList.innerHTML = '';

    // Ajouter l'option par défaut
    let defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    defaultOption.textContent = 'Select a category';
    categorySelect.appendChild(defaultOption);

    category.forEach(categorie => {
        let option = document.createElement('option');
        option.value = capitalizeFirstLetter(categorie.name);
        option.textContent = capitalizeFirstLetter(categorie.name);

        if (categorie.disabled) {
            option.disabled = true; // Désactiver l'option
        }
        categorySelect.appendChild(option);
    });

    updateTaskCountDisplay();
}

// Fonction pour mettre à jour l'affichage du compteur de tâches
function updateTaskCountDisplay() {
    taskList.innerHTML = '';

    category.forEach(categorie => {
        let taskItem = document.createElement('li');
        taskItem.className = 'task-item';
        taskItem.innerHTML = `
            <button class="category" data-category="${capitalizeFirstLetter(categorie.name)}">
                ${capitalizeFirstLetter(categorie.name)}
            </button>
            <span class="task-count">${categorie.taskCount}</span>
        `;
        taskList.appendChild(taskItem);
    });
}

// Fonction pour ajouter une tâche ou une catégorie
function addItem(type, text, categoryName) {
    if (type === 'task') {
        tasks.push({ text: text, category: categoryName, checked: false, liked: false });

        // Chercher la catégorie correspondante et mettre à jour le compteur
        let categoryToUpdate = category.find(cat => cat.name.toLowerCase() === categoryName.toLowerCase());
        if (categoryToUpdate) {
            categoryToUpdate.taskCount += 1; // Incrémente le compteur de tâches
        } else {
            console.error('Catégorie introuvable:', categoryName);
        }

        saveToLocalStorage();
        displayTasks();
        updateTaskCountDisplay(); // Mettre à jour l'affichage après ajout de la tâche
    } else if (type === 'category') {
        category.push({ name: text, disabled: false, taskCount: 0 });
        saveToLocalStorage();
        generateCategories(); // Mettre à jour l'affichage des catégories
    }
}

// Gestionnaire d'événement pour le formulaire d'ajout de catégorie
newCategoryForm.addEventListener('submit', function (event) {
    event.preventDefault();
    let newCategoryName = newCategoryInput.value.trim();
    let existingCategory = category.find(cat => cat.name.toLowerCase() === newCategoryName.toLowerCase());

    if (!existingCategory && newCategoryName) {
        addItem('category', newCategoryName);
        newCategoryInput.value = '';
    } else {
        alert('Cette catégorie existe déjà.');
        newCategoryInput.value = '';
    }
});

// Gestionnaire d'événements pour le formulaire d'ajout de tâches
taskForm.addEventListener('submit', function (event) {
    event.preventDefault();
    let newTaskText = taskTextInput.value.trim();
    let newTaskCategory = categorySelect.value;

    if (newTaskText && newTaskCategory) {
        if (!tasks.some(task => task.text === newTaskText && task.category === newTaskCategory)) {
            addItem('task', newTaskText, newTaskCategory);
            // Afficher les tâches après l'ajout
            displayTasks(title.textContent);
        } else {
            alert('Cette tâche existe déjà dans cette catégorie.');
        }
    }
    taskTextInput.value = '';
    categorySelect.value = '';
});

// Gestionnaire d'événements pour le bouton "ALL Tasks"
allTasksButton.addEventListener('click', function () {
    title.textContent = "All Tasks";
    title.style.color = "black";
    displayTasks()
});

// Fonction pour afficher les tâches dans le DOM
function displayTasks(selectedCategory = null) {
    allTasks.innerHTML = '';

    let filteredTasks = selectedCategory === 'Favorites'
        ? tasks.filter(task => task.liked == true) // Vérifiez si "liked" est vrai
        : selectedCategory
            ? tasks.filter(task => task.category === selectedCategory)
            : tasks;

    if (filteredTasks.length === 0) {
        allTasks.innerHTML = '<li>Aucune tâche trouvée.</li>'; // Message si aucune tâche n'est trouvée
    } else {
        filteredTasks.forEach((task) => {
            let listItem = document.createElement('li');
            listItem.className = 'all-task-item flex items-center';

            listItem.innerHTML = `
            <button class="checkbox ${task.checked ? 'checked' : ''}"></button>
            <p class="task-text" style="text-decoration: ${task.checked ? 'line-through' : 'none'}; color: ${task.checked ? '#EB5757' : 'inherit'};">
                <b>${task.text}</b>
            </p>
            <span class="task-category" style="background-color: ${categoryColors[task.category] || '#000000'}">
                ${task.category}
            </span>
            <button type="button" class="btn-heart">
                <i class="${task.liked ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
            </button>
            <button type="button" class="btn-remove">
                <i class="fa-solid fa-trash"></i>
            </button>
        `;

            allTasks.appendChild(listItem);

            // Écouteur d'événements pour le bouton de suppression
            let removeButton = listItem.querySelector('.btn-remove');
            removeButton.addEventListener('click', function () {
                let confirmed = confirm("Are you sure you want to remove this task?");
                if (confirmed) {
                    tasks.splice(tasks.indexOf(task), 1); // Supprimer la tâche par référence
                    let categoryToUpdate = category.find(cat => cat.name.toLowerCase() === task.category.toLowerCase());
                    if (categoryToUpdate) {
                        categoryToUpdate.taskCount -= 1; // Décrémenter le compteur de tâches
                    }
                    let favoritesCategory = category.find(cat => cat.name === 'Favorites');
                    if (task.liked && favoritesCategory) {
                        favoritesCategory.taskCount -= 1; // Décrémenter le compteur de favoris si la tâche était aimée
                    }
                    saveToLocalStorage(); // Enregistrer les modifications dans le localStorage
                    displayTasks(selectedCategory); // Rafraîchir l'affichage des tâches
                    updateTaskCountDisplay(); // Mettre à jour l'affichage des compteurs
                }
            });

            // Écouteur d'événements pour la case à cocher
            let checkbox = listItem.querySelector('.checkbox');
            checkbox.addEventListener('click', function () {
                task.checked = !task.checked;
                saveToLocalStorage(); // Enregistrer l'état modifié dans le localStorage

                let taskText = this.nextElementSibling;
                this.classList.toggle('checked');
                taskText.style.textDecoration = task.checked ? 'line-through' : 'none';
                taskText.style.color = task.checked ? '#EB5757' : 'inherit';
            });

            // Écouteur d'événements pour le bouton de cœur
            let heartButton = listItem.querySelector('.btn-heart');
            heartButton.addEventListener('click', function () {
                task.liked = !task.liked;
                heartButton.querySelector('i').className = task.liked ? 'fa-solid fa-heart' : 'fa-regular fa-heart';

                let favoritesCategory = category.find(cat => cat.name === 'Favorites');
                if (task.liked && favoritesCategory) {
                    favoritesCategory.taskCount += 1;
                } else if (favoritesCategory) {
                    favoritesCategory.taskCount -= 1;
                }

                saveToLocalStorage(); // Enregistrer les modifications dans le localStorage
                updateTaskCountDisplay(); // Mettre à jour l'affichage des compteurs
            });
        });
    }
}


// Écouteur d'événements pour les boutons de catégorie
taskList.addEventListener('click', function (event) {
    if (event.target.classList.contains('category')) {
        let categoryName = event.target.dataset.category;
        title.textContent = categoryName;
        title.style.color = categoryColors[categoryName];
        displayTasks(categoryName); // Afficher les tâches selon la catégorie sélectionnée
    }
});

//Toggle event listener
toggleSearch.addEventListener('click', () => {
    let searchForm = document.querySelector('.search-form');
    let screenWidth = window.innerWidth;

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

// Initialiser les catégories et afficher les tâches lors du chargement de la page
generateCategories();
displayTasks();







