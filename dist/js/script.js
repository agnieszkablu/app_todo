var plus = document.querySelector('#add');
var item = document.querySelector('#item');
// Remove and complere icons in SVG format
var removeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="20" viewBox="0 0 16 20"><path class="fill" d="M5.714 8.214v6.429q0 0.156-0.1 0.257t-0.257 0.1h-0.714q-0.156 0-0.257-0.1t-0.1-0.257v-6.429q0-0.156 0.1-0.257t0.257-0.1h0.714q0.156 0 0.257 0.1t0.1 0.257zM8.571 8.214v6.429q0 0.156-0.1 0.257t-0.257 0.1h-0.714q-0.156 0-0.257-0.1t-0.1-0.257v-6.429q0-0.156 0.1-0.257t0.257-0.1h0.714q0.156 0 0.257 0.1t0.1 0.257zM11.429 8.214v6.429q0 0.156-0.1 0.257t-0.257 0.1h-0.714q-0.156 0-0.257-0.1t-0.1-0.257v-6.429q0-0.156 0.1-0.257t0.257-0.1h0.714q0.156 0 0.257 0.1t0.1 0.257zM12.857 16.295v-10.58h-10v10.58q0 0.246 0.078 0.452t0.162 0.301 0.117 0.095h9.286q0.033 0 0.117-0.095t0.162-0.301 0.078-0.452zM5.357 4.286h5l-0.536-1.306q-0.078-0.1-0.19-0.123h-3.538q-0.112 0.022-0.19 0.123zM15.714 4.643v0.714q0 0.156-0.1 0.257t-0.257 0.1h-1.071v10.58q0 0.926-0.525 1.602t-1.261 0.675h-9.286q-0.737 0-1.261-0.653t-0.525-1.579v-10.625h-1.071q-0.156 0-0.257-0.1t-0.1-0.257v-0.714q0-0.156 0.1-0.257t0.257-0.1h3.449l0.781-1.864q0.167-0.413 0.603-0.703t0.882-0.29h3.571q0.446 0 0.882 0.29t0.603 0.703l0.781 1.864h3.449q0.156 0 0.257 0.1t0.1 0.257z"></path></svg>';
var completeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20" viewBox="0 0 20 20"><path class="fill" d="M18.65 6.317q0 0.446-0.313 0.759l-9.598 9.598q-0.313 0.313-0.759 0.313t-0.759-0.313l-5.558-5.558q-0.313-0.313-0.313-0.759t0.313-0.759l1.518-1.518q0.313-0.313 0.759-0.313t0.759 0.313l3.281 3.292 7.321-7.333q0.313-0.313 0.759-0.313t0.759 0.313l1.518 1.518q0.313 0.313 0.313 0.759z"></path></svg>';

//user clicked on add button
//if there is text inside item input field, add that text to todo list
plus.addEventListener('click', function() {
	var activity = item.value;
	// if the activity is not empty add it to todo list (execute the function addActivity)
	if (activity) {
		addActivity(activity);
		item.value = '';
	}
});
//Remove items from the list
function removeItems() {
	//grab list item
	var item = this.parentNode.parentNode;
	//grab list  
	var parent = item.parentNode;
	parent.removeChild(item);
}
//transfer items to completed list
function completeItems() {
	//grab list item
	var item = this.parentNode.parentNode;
	//grab list 
	var parent = item.parentNode;
	//grab list id
	var id = parent.id;
	// check if the item should be added to completed or re-added to the todoList
	var target = (id === 'todoList') ? document.querySelector('#todoCompleted'):document.querySelector('#todoList');
	
	parent.removeChild(item);
	target.insertBefore(item, target.childNodes[0]);

}
// Edit mode for items on the list
function editMode(){
	this.parentNode.className = 'edit';
	var input = this.parentNode.querySelector('input');
	input.focus();
	input.setSelectionRange(0, input.value.length);
}
// Update item on blur
function updateItem(){
	this.previousElementSibling.innerHTML = this.value;
	this.parentNode.className = '';
}
// Add a new item to todo list
function addActivity(text) {
	var list = document.querySelector('#todoList');

	var listItem = document.createElement('li');
	//listItem.innerText = text;

	
	//create input for text
	var listSpan = document.createElement('span');
	listSpan.innerText = text;
	//add click event to eneble edit mode
	listSpan.addEventListener('click', editMode);

	//create input for text
	var listInput = document.createElement('input');
	
	listInput.addEventListener('blur', updateItem);

	var buttons = document.createElement('div');
	buttons.classList.add('todo__buttons');

	var remove = document.createElement('button');
	remove.classList.add('remove');
	remove.innerHTML = removeSVG;
	// add click event for removing item
	remove.addEventListener('click', removeItems);

	var complete = document.createElement('button');
	complete.classList.add('complete');
	complete.innerHTML = completeSVG;
	//add click event for completing the item
	complete.addEventListener('click', completeItems);

	buttons.appendChild(remove);
	buttons.appendChild(complete);
	listItem.appendChild(listSpan);
	listItem.appendChild(listInput);
	listItem.appendChild(buttons);
	
	// insert new list item before the previouse ones
	list.insertBefore(listItem, list.childNodes[0]);
}
// add remove items to default list item
document.querySelector('#defaultRemove').addEventListener('click', removeItems);
// add complete items to default list item
document.querySelector('#defaultComplete').addEventListener('click', completeItems);

