const DOMelements = {
    adminButton: document.getElementById('admin'),
    adminForm: document.getElementById('adminForm'),
    btnCancelForm: document.getElementById('btnCancel'),
    formInputName: document.getElementById('name'),
    formInputUrl: document.getElementById('url'),
    formInputNumber: document.getElementById('number'),

}

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
    currentCat: null,

    updateClicksNumber(id) {
        const cat = this.cats.filter(item => { return item.id == id; })[0];
        cat.addClick();
        return cat;
    }
};

const controller = {

    init() {
        catListView.init();
        catView.init();
        this.setEventListeners();
    },
    getCats() {
        return model.cats;
    },

    getCat(index) {
        return model.cats[index];
    },

    getCurrentCat() {
        return model.currentCat;
    },
    setCurrentCat(catId) {
        model.currentCat = model.cats[catId];
    },
    // event listeners


    setEventListeners() {
        // DONE: add event listener for ADMIN button: show form with default current cat values
        DOMelements.adminButton.addEventListener('click', () => {
            adminView.setFormView();
            adminView.showAdminForm();
        });
        // TODO: event listener for form buttons:
        // DONE CANCEL: turn off admin mode
        DOMelements.btnCancelForm.addEventListener('click', () => {
            DOMelements.adminForm.style.visibility = 'hidden';
        });
        // SAVE: change model and update view
        DOMelements.adminForm.addEventListener('submit', (event) => {
            event.preventDefault();
            // get values of form
            const formName = DOMelements.formInputName.value;
            const formUrl = DOMelements.formInputUrl.value;
            const formNumber = DOMelements.formInputNumber.value;
            // run model methods to set new values for cat properties
            model.currentCat.name = formName;
            model.currentCat.imgPath = formUrl;
            model.currentCat.numberOfClicks = formNumber;
            // update catView
            catView.displayCat(model.currentCat);
            // hide admin from
            DOMelements.adminForm.style.visibility = 'hidden';
        });
        // show photo of cat cliked on the list
        document.getElementsByClassName('cats-list').item(0).addEventListener('click', (e) => {
            const target = e.target;
            // don't do anything if list was clicked, but not item of the list
            if(e.target === e.currentTarget) {
                return;
            }

            const catId = parseInt(target.id.replace('cat-name-', ''));
            const cat = model.cats.filter(item => {return item.id == catId; })[0];
            catView.displayCat(cat);
            this.setCurrentCat(cat.id);
            adminView.setFormView();
        });

        document.getElementsByClassName('photo').item(0).addEventListener('click', (e) => {
            model.currentCat.numberOfClicks++;
            catView.displayCat(model.currentCat);
            adminView.updateFormInputNumberValue();
            return;
        });
    }

};
const adminView = {
    setFormView() {
        // set current input name value
        DOMelements.formInputName.value = controller.getCurrentCat().name;
        DOMelements.formInputUrl.value = controller.getCurrentCat().imgPath;
        DOMelements.formInputNumber.value = controller.getCurrentCat().numberOfClicks;
    },

    showAdminForm() {
        DOMelements.adminForm.style.visibility = 'visible';
    },

    updateFormInputNumberValue() {
        DOMelements.formInputNumber.value = controller.getCurrentCat().numberOfClicks;
    }
}

const catListView = {
    init() {
        const cats = controller.getCats();
        this.displayCatsList(cats);
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
    // DOM elements
    catImg: document.getElementById('cat-photo'),
    catInfo: document.getElementById('cat-info'),
    // set initial cat to be displayed
    init() {
        const defaultCat = controller.getCat(0);
        controller.setCurrentCat(0);
        this.displayCat(defaultCat);
    },

    displayCat(cat) {
        this.catImg.src = cat.imgPath;
        this.catInfo.textContent = `${cat.name} was clicked ${cat.numberOfClicks} times.`;
    },
};
controller.init();