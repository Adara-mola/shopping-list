const itemForm = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const itemList = document.querySelector('#item-list');
const clearBtn = document.querySelector('#clear');
const filter = document.getElementById('filter');
const formBtn = document.querySelector('button');
let isEditMode = false;

const addItem = (e) => {
	e.preventDefault();
	const newItem = itemInput.value;

	// Validation
	if (newItem === '') {
		alert('Please add an item');
		return;
	}
	// check for edit mode

	if (isEditMode) {
		const itemToEdit = itemList.querySelector('.edit-mode');
		itemToEdit.classList.remove('edit-mode');
		itemToEdit.remove();
		isEditMode = false;
	}
	// Create list item
	const li = document.createElement('li');
	li.appendChild(document.createTextNode(newItem));
	// console.log(li);
	const button = createButton('remove-item btn-link text-red');
	li.appendChild(button);

	// Add  li to the DOM
	itemList.appendChild(li);

	resetUI();

	itemInput.value = '';
};

const createButton = (classes) => {
	const button = document.createElement('button');
	button.className = classes;
	const icon = createIcon('fa-solid fa-xmark');
	button.appendChild(icon);
	return button;
};

const createIcon = (classes) => {
	const icon = document.createElement('i');
	icon.className = classes;
	return icon;
};
const removeItem = (e) => {
	if (e.target.parentElement.classList.contains('remove-item')) {
		if (confirm('Are you sure?')) {
			e.target.parentElement.parentElement.remove();

			resetUI();
		}
	} else {
		setItemToEdit(e.target);
	}
};

const setItemToEdit = (item) => {
	isEditMode = true;
	itemList
		.querySelectorAll('li')
		.forEach((i) => i.classList.remove('edit-mode'));
	item.classList.add('edit-mode');
	formBtn.innerHTML = '<i class="fa-solid fa-pen"></i>Update Item';
	formBtn.style.backgroundColor = '#228822';
	itemInput.value = item.textContent;
};

const clearItems = () => {
	while (itemList.firstChild) {
		itemList.removeChild(itemList.firstChild);
	}
	resetUI();
};

const filterItems = (e) => {
	const items = document.querySelectorAll('li');
	const text = e.target.value.toLowerCase();

	items.forEach((item) => {
		const itemName = item.firstChild.textContent.toLowerCase();

		if (itemName.indexOf(text) != -1) {
			item.style.display = 'flex';
		} else {
			item.style.display = 'none';
		}
	});

	console.log(text);
};

const resetUI = () => {
	itemInput.value = '';

	const items = document.querySelectorAll('li');
	if (items.length === 0) {
		clearBtn.style.display = 'none';
		filter.style.display = 'none';
	} else {
		clearBtn.style.display = 'block';
		filter.style.display = 'block';
	}
	formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
	formBtn.style.backgroundColor = '#333';

	isEditMode = false;
};

// function checkIfItemExists() {}

// Event Listener

itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
// itemList.addEventListener('click', handleEdit);
clearBtn.addEventListener('click', clearItems);
filter.addEventListener('input', filterItems);

resetUI();
