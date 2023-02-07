
let form = document.querySelector('#addForm');
let itemsList = document.querySelector('#items');
let filter = document.querySelector('#filter');

//Add new task  listening an event
form.addEventListener('submit', addItem);

//Filter of the to-do list (listening input)
filter.addEventListener('keyup', filterItems);

//Delete the element listening a click
itemsList.addEventListener('click', removeItem);

//Add new task (function)
function addItem (event) {
    //Cancel form submission
    event.preventDefault();

    //Find the "input" with text for new task
    let newItemInput = document.querySelector('#newItemText');
    //Get text from the input-box
    let newItemText = newItemInput.value;


    //Create new element for new task
    let newElement = document.createElement('li');
    newElement.className = 'list-group-item';

    //Add text in text element (text node)
    let newTextNode = document.createTextNode(newItemText);
    newElement.appendChild(newTextNode);


    //Create the button
    let deleteButn = document.createElement('button');
    //Add text in button
    deleteButn.appendChild(document.createTextNode('Delete'));
    //Add CSS class
    deleteButn.className = 'btn btn-light btn-sm float-right';
    //Add data attribute (dataset)
    deleteButn.dataset.action = 'delete';

    //Move the button to the tag li
    newElement.appendChild(deleteButn);
    console.log("addItem -> newElement", newElement);

    //Add the new tastk in all to-do list
    itemsList.prepend(newElement);

    //Clear the input-box
    newItemInput.value = '';
}


//Delete the element (function)
function removeItem(event){
    if (
        event.target.hasAttribute('data-action') && 
        event.target.getAttribute('data-action') == 'delete'
    ){
        if (confirm ('Are you sure you want to delete this task?')){
            event.target.parentNode.remove();
        }
    }

    console.log('data-action', event.target);
}

//filter of the to-do list (function)
function filterItems(event){
    //Get frase for our search & change inputting to lower case
    let seachedText = event.target.value.toLowerCase();

    //1. Get all tasks in the to-do list
    let items = itemsList.querySelectorAll('li');

    //2. Sort by cycle all tags 'li' with tasks
    items.forEach(function(item){
        //Get the text of the to-do list & change inputting to lower case
        let itemText = item.firstChild.textContent.toLowerCase();

        //Check the occurrence of the desired substring in the text of the to-do list
        if (itemText.indexOf(seachedText) != -1) {
            //If we have the occurrence - we're showing the element whith task
            item.style.display = 'block';
            //if we don't - then we're hiding the element whith task
        } else {
            item.style.display = 'none';
        }
        // console.log(item.firstChild.textContent);
    })
}