// let addbtn=document.getElementById("add-btn");
// let item_modal=document.getElementById("item-modal");
// let tripcardvalue=document.getElementById("trip-card-value");
// let count=0;
// addbtn.addEventListener("click",function(){
//     item_modal.style.display="unset";
    

    
// })
// let taskarr=[];
// document.getElementById("Item-addbtn").addEventListener("click",createCard);
// function createCard(){
//     const iteminputvalue=tripcardvalue.value;
//     const itemObj={
//         taskname:iteminputvalue,
//         taskid:count+=1 
//     }
//     taskarr.push(itemObj);
//    createtile(taskarr); 
// }
// function createtile(taskarr){
//     let tile           = document.createElement('div');    // full tile
//     let tileTitle      = document.createElement('div');  
//     let horizontalLine = document.createElement('hr');     // after heading horizontal line
//     let iconSection    = document.createElement('div');    // tile icon section
//     let addTaskBtn     = document.createElement('button'); // add task on tile button
//     let deleteTileBtn  = document.createElement('button'); // delete task tile button
//     let listItem       = document.createElement('div');
//     tile.setAttribute('class', 'tile');
//         tile.setAttribute('id', taskarr[taskarr.length-1].taskid);

//         tileTitle.setAttribute('class', 'card-title');
//         tileTitle.innerText = taskarr[taskarr.length-1].taskname;
//         tile.append(tileTitle);
//         let cardTiles = document.getElementById('flex-container');
//         cardTiles.appendChild(tile);
//         item_modal.style.display="none";
//         document.getElementById("noitem").style.display="none";
// }


const navbar=document.getElementById("navbar");
const flexcontainer=document.getElementById("flex-container");
const title=document.getElementById("title");
const item_modal=document.getElementById("item-modal");
const maincontainer=document.getElementById("main-container");
const noitem=document.getElementById("noitem");

// 
let cardId=1;
let listItemId=1;
let cardLinkValue = 1;
function additem() {
    const addbtn = document.getElementById('addbtn');
    addbtn.addEventListener("click", function () {
        item_modal.style.display = "block";
        maincontainer.style.filter = "blur(7px)";
        maincontainer.style.webkitFilter = "blur(7px)";
    })
}
additem();
function closeAdditem() {
    const itemclosebtn = document.getElementById('Item-closebtn');
    itemclosebtn.addEventListener("click", function () {
        item_modal.style.display = "none";
        maincontainer.style.filter = "none";
        maincontainer.style.webkitFilter = "none";
    })
}
closeAdditem();
// adding cards using add button
function addToDOItem() {

    const itemaddbtn = document.getElementById('Item-addbtn');
    const flexcontainer = document.getElementById('flex-container');
    itemaddbtn.addEventListener("click", function () {
        item_modal.style.display = "none";
        maincontainer.style.filter = "none";
        maincontainer.style.webkitFilter = "none";
        noitem.innerText = " ";
        const cardtitle = document.getElementById('trip-card-value').value;
        const element = document.createElement('div');
        element.classList.add('todo_card');
        element.setAttribute('id', `card${cardId}`);
        element.innerHTML = `
          <div class="todo_header">
          <button class="cardLink" value=${cardId}>${cardtitle}</button>
          </div>
          <hr>
          <div class="todo_body" id="cardBody${cardId}"></div>
            <div class="todo_btns">
              <button class="add_todo_list_btn" id="addItem-${cardId}" value=${cardId}>+</button>
              <button class="delete_todo_btn" id="deleteBtnContainer" value=${cardId} >
                <i class="fa-solid fa-trash-can" value=${cardId}></i>
              </button>
         </div>`;
        restoreHeader();
        restoreflexcontainer();
        flexcontainer.appendChild(element);
        cardId++;
    })

}
addToDOItem();

// list
function addItemsList() {
    const listItems = document.getElementById('list-modal');
    let id = 0;
    flexcontainer.addEventListener("click", (e) => {
        if (e.target.classList.contains('add_todo_list_btn')) {
            maincontainer.style.filter = "blur(8px)";
            maincontainer.style.webkitFilter = "blur(8px)";
            const listItemName = document.getElementById('listinput').value;
            listItems.style.display = "block";
            id = e.target.value;
        }
        else if (e.target.classList.contains('fa-trash-can')) {
            let valueOfDeleteBtn = e.target.parentElement.value;
            const card = document.getElementById('card' + valueOfDeleteBtn);
            card.remove();
            restoreHeader();
            restoreflexcontainer();
        }
        else if (e.target.classList.contains('markDonebtn')) {
            let markDoneValue = e.target.value;
            document.getElementById('markdoneBtn' + markDoneValue).style.display = 'none';
            document.getElementById('listText' + markDoneValue).style.textDecoration = "line-through";
            document.getElementById('listText' + markDoneValue).style.color="red";
        }
        else if (e.target.classList.contains('cardLink')) {
            cardLinkValue = e.target.getAttribute('value');
            changeHeader();
            showCard(e.target.innerText);
        }
    })

    const listaddbtn = document.getElementById('list-addbtn');
    listaddbtn.addEventListener("click", function () {
        document.getElementById('list-modal').style.display = "none";
        maincontainer.style.filter = "none";
        maincontainer.style.webkitFilter = "none";

        const listItemName = document.getElementById('listinput').value;
        const listItem = document.createElement('div');
        listItem.classList.add('listItem');
        let listItemContent = `
            <span id=listText${listItemId} class='listText'>${listItemName}</span>
            <button id=markdoneBtn${listItemId} class='markDonebtn' value=${listItemId}>Mark Done</button>
        `;
        listItem.innerHTML = listItemContent;
        listItems.style.display = "none";
        document.getElementById('cardBody' + id).append(listItem);
        listItemId++;
    })
}
addItemsList();

function closeListForm() {
    const listclosebtn = document.getElementById('list-closebtn');
    listclosebtn.addEventListener("click", function () {
        document.getElementById('list-modal').style.display = "none";
        maincontainer.style.filter = "none";
        maincontainer.style.webkitFilter = "none";
    })
}
closeListForm();
function flexcontainerClick() {
    const flexcontainer = document.getElementById('flex-container');
    flexcontainer.addEventListener("click", function () {

    })

}
function showCard(cardName) {
    let cards = document.getElementsByClassName('todo_card');
    for (let i = 0; i < cards.length; i++) {
        if (cards[i].getAttribute('id') != 'card' + cardLinkValue) {
            cards[i].style.display = "none";
        }
    }
    flexcontainer.style.justifyContent = "center";
    flexcontainer.style.alignItems = "flex-start";
    document.getElementById('card' + cardLinkValue).classList.add('bigTodoCard');
    title.style.display = "inline";
    title.innerText = cardName;
}

function changeHeader() {
    document.getElementById('task').style.display = "none";
    document.getElementById('list').style.display = "none";
    document.getElementById('backbtn').style.display = "block";
}
function restoreHeader() {
    document.getElementById('task').style.display = "inline";
    document.getElementById('list').style.display = "inline";
    document.getElementById('backbtn').style.display = "none";
    title.style.display = "none";
}

const backbtn = document.getElementById('backbtn');
backbtn.addEventListener("click", restoreflexcontainer);

function restoreflexcontainer() {
    let cards = document.getElementsByClassName('todo_card');
    for (let i = 0; i < cards.length; i++) {
        cards[i].style.display = "block";
    }
    flexcontainer.style.justifyContent = "space-between";
    restoreHeader();
    try {
        document.getElementById('card' + cardLinkValue).classList.remove('bigTodoCard');
    }
    catch (error) {
        console.log("");
    }
}