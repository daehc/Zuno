let nav = document.getElementById("side");
let main = document.querySelector("main");
let texts = document.getElementById("text");
let arr1 = [];
let arr2 = [];

//function of all click events
document.addEventListener('click', function (event) {
    if (event.target.id == 'save') {
        arr1.push(document.getElementById("text").value)
        for (x of arr1) {
            {
                arr2.push(x.slice(0, x.indexOf('\n')));
                noteTitle = x.slice(0, x.indexOf('\n'));
                noteBody = x.slice(x.indexOf('\n\n') + 2, x.length);
            }
            for (titles of arr2) {
                if (nav.innerHTML.includes(titles) == false)
                    nav.innerHTML += `<p>${titles}</p>`

            }
        }
        addANote(noteTitle, noteBody)
    }
    else if (event.target.id == 'cancel') {
        text.parentNode.removeChild(text);
        cancel.parentNode.removeChild(cancel);
        save.parentNode.removeChild(save);
        document.getElementById("dark").style.visibility = "visible";
        document.getElementById("note").disabled = false;
    }
    else if (event.target.id == 'note') {
        main.innerHTML += "<textarea id = 'text'></textarea><button id='save'>Save</button><button id='cancel'>Cancel</button>";
        document.getElementById("dark").style.visibility = "hidden";
        document.getElementById("note").disabled = true;
    }
    else if (event.target.innerHTML == 'Dark') {
        document.body.classList.toggle("theme");
        nav.classList.toggle("navTheme");
        document.getElementById("dark").innerHTML = "Light";
        document.getElementById("dark").style.backgroundColor = "white";
    }
    else if (event.target.innerHTML == 'Light') {
        document.getElementById("dark").innerHTML = "Dark";
        document.getElementById("dark").style.backgroundColor = `rgb(90, 90, 90)`;
        document.body.classList.toggle("theme");
        nav.classList.toggle("navTheme");
    }
})

nav.addEventListener("click", content)
function content(event) {
    getOneNote(event.target.innerHTML)
}
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------

//addANote must be called after save button is clicked
//uncomment to test addANote function
// const title = "note2"
// const note = "this is a sample note"
// addANote(title, note) 

//function to add a note with fetch
async function addANote(noteTitle, noteBody) {
    const data = { title: noteTitle, note: noteBody };
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    const response = await fetch('/newNote', options);
    // making sure the json data was transferred
    const json = await response.json();
    console.log(json);
}

//getOneNote must be called after any of the item's on the sidebar is clicked
//uncomment to test get a note (AddANote should be called first)
// let data = getOneNote(title);


// function to get one note using a query string
async function getOneNote(noteTitle) {
    const response = await fetch(`/oneNote/?note=${noteTitle}`)
    const json = await response.json()
    const data = JSON.parse(json)
    //call the  function to display the retrieved note
    displayNote(data.note);
}

//write a function to display the retrieved note
function displayNote(note) {
    document.getElementById("text").value = note;
}

