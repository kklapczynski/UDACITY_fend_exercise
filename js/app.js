
cats = [
    {
        id: 0,
        name: 'Kitty',
        imgPath: 'images\\cat_large.jpg',
        numberOfClicks: 0,
        addClick() {this.numberOfClicks++;}
    },
    {
        id: 1,
        name: 'Chewie',
        imgPath: 'images\\cat_2_large.jpg',
        numberOfClicks: 0,
        addClick() {this.numberOfClicks++;}
    },
    {
        id: 2,
        name: 'JJ',
        imgPath: 'images\\cat_3_large.jpg',
        numberOfClicks: 0,
        addClick() {this.numberOfClicks++;}
    },
    {
        id: 3,
        name: 'DD',
        imgPath: 'images\\cat_4_large.jpg',
        numberOfClicks: 0,
        addClick() {this.numberOfClicks++;}
    },
    {
        id: 4,
        name: 'Iffy',
        imgPath: 'images\\cat_5_large.jpg',
        numberOfClicks: 0,
        addClick() {this.numberOfClicks++;}
    }
];
// setting cats list
const catsList = document.getElementsByClassName("cats-list").item(0);
for (cat of cats) {
    const catNameHtml = `
        <li id="cat-name-${cat.id}">${cat.name}</li>
    `;
    catsList.insertAdjacentHTML('beforeend', catNameHtml);
}




// event listeners

// show photo of cat cliked on the list
document.getElementsByClassName('cats-list').item(0).addEventListener('click', (e) => {
    const target = e.target;
    const catId = parseInt(target.id.replace('cat-name-', ''));
    displayCat(catId);
})

document.getElementsByClassName('container').item(0).addEventListener('click', (e) => {
    const targetCat = e.target;
    const catId = targetCat.id;
    const cat = updateClicksNumber(catId);
    updateClickNumberView(catId, cat);
    return;
});

// update data
updateClicksNumber = (id) => {
    const cat = cats.filter(item => { return item.id == id; })[0];
    cat.addClick();
    return cat;
};

// update view
const catPhotoContainer = document.getElementsByClassName('container').item(0);
displayCat = (id) => {
    // if there is already cat displayed and it's other then clicked one remove it
    if(isCatDisplayed()) {
        if(!isClickedCat(id)) {
            removeDisplayedCat();
        } else {
            return;
        }
    }

    const cat = cats.filter(item => {return item.id == id; })[0];
    const photoHtml = `
        <div class="photo">
            <img class="cat-photo" id= "${cat.id}" src="${cat.imgPath}" alt="Little cat photo">
            <p id="cat-info-${cat.id}" class="clicks-info">${cat.name} was clicked ${cat.numberOfClicks} times.</p>
        </div>
    `;
    catPhotoContainer.insertAdjacentHTML('beforeend', photoHtml);
}

isCatDisplayed = () => {
    return document.getElementsByClassName('photo').length > 0 ? true : false;
}

isClickedCat = (id) => {
    return document.getElementById(id) ? true : false;
}

removeDisplayedCat = () => {
    document.getElementsByClassName('photo').item(0).remove();
    return;
}

updateClickNumberView = (id, cat) => {
    document.getElementById(`cat-info-${id}`).textContent = `${cat.name} was clicked ${cat.numberOfClicks} times.`;
    return;
}

