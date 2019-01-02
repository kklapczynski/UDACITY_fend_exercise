let numberOfClicks = 0;

document.getElementById('cat-photo').addEventListener('click', () => {
    numberOfClicks++;
    updateClicksNumber(numberOfClicks);
});

updateClicksNumber = (number) => {
    document.getElementsByClassName('clicks-info').item(0).textContent = `Cat was clicked ${number} times.`;
};
