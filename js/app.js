
cats = [
    {
        id: 0,
        name: 'kitty',
        imgPath: 'images\\cat_large.jpg',
        numberOfClicks: 0,
        addClick() {this.numberOfClicks++;}
    },
    {
        id: 1,
        name: 'chewie',
        imgPath: 'images\\cat_2_large.jpg',
        numberOfClicks: 0,
        addClick() {this.numberOfClicks++;}
    }
];

// setting photos to display
const container = document.getElementsByClassName('container').item(0);
for (cat of cats) {
    const photoHtml = `
        <div class="photo">
            <img id= "${cat.id}" src="${cat.imgPath}" alt="Little cat photo">
            <p id="cat-info-${cat.id}" class="clicks-info">Cat was clicked ${cat.numberOfClicks} times.</p>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', photoHtml);
}

// event listeners
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
updateClickNumberView = (id, cat) => {
    document.getElementById(`cat-info-${id}`).textContent = `Cat was clicked ${cat.numberOfClicks} times.`;
    return;
}

