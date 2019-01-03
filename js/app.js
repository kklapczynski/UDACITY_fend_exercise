(function() {
    const model = {
        cats: [
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
        ],
        updateClicksNumber(id) {
            const cat = this.cats.filter(item => { return item.id == id; })[0];
            cat.addClick();
            return cat;
        }
    };

    const controller = {
        init() {
            catListView.init(model.cats);
            this.setEventListeners();
        },
        // event listeners
        setEventListeners() {
            // show photo of cat cliked on the list
            document.getElementsByClassName('cats-list').item(0).addEventListener('click', (e) => {
                const target = e.target;
                const catId = parseInt(target.id.replace('cat-name-', ''));
                const cat = model.cats.filter(item => {return item.id == catId; })[0];
                catView.displayCat(cat);
            });

            document.getElementsByClassName('photo').item(0).addEventListener('click', (e) => {
                const targetCat = e.target;
                const catId = targetCat.id;
                const cat = model.updateClicksNumber(catId);
                catView.updateClickNumberView(catId, cat);
                return;
            });
        }

    };

    const catListView = {
        init(data) {
            this.displayCatsList(data);
        },
        // setting cats list
        displayCatsList(cats) {
            const catsList = document.getElementsByClassName("cats-list").item(0);
            for (cat of cats) {
                const catNameHtml = `
                    <li id="cat-name-${cat.id}">${cat.name}</li>
                `;
                catsList.insertAdjacentHTML('beforeend', catNameHtml);
            }
        }

    };

    const catView = {
        catPhotoDiv: document.getElementsByClassName('photo').item(0),
        displayCat(cat) {
            // if there is already cat displayed and it's other then clicked one remove it
            if(this.isCatDisplayed()) {
                if(!this.isClickedCat(cat.id)) {
                    this.removeDisplayedCat();
                } else {
                    return;
                }
            }

            const photoHtml = `
                    <img class="cat-photo" id= "${cat.id}" src="${cat.imgPath}" alt="Little cat photo">
                    <p id="cat-info-${cat.id}" class="clicks-info">${cat.name} was clicked ${cat.numberOfClicks} times.</p>
            `;
            this.catPhotoDiv.insertAdjacentHTML('beforeend', photoHtml);
        },

        isCatDisplayed() {
            return document.getElementsByClassName('cat-photo').length > 0 ? true : false;
        },

        isClickedCat(id) {
            return document.getElementById(id) ? true : false;
        },

        removeDisplayedCat() {
            document.getElementsByClassName('cat-photo').item(0).remove();
            document.getElementsByClassName('clicks-info').item(0).remove();
            return;
        },

        updateClickNumberView(id, cat) {
            document.getElementById(`cat-info-${id}`).textContent = `${cat.name} was clicked ${cat.numberOfClicks} times.`;
            return;
        }
    };
    controller.init();
})();