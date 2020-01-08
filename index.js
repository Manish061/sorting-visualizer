window.onload = function () {
    const items = document.getElementsByClassName('item');
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const height = (Math.random() * 320) + 100;
        item.style.height = `${height}px`;
        item.style.marginTop = `${440 - height}px`
    }
}

function sort() {
    const items = document.getElementsByClassName('item');
    const n = items.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            let a = items[j].innerText;
            let b = items[j + 1].innerText;
            // items[j].classList.add('focus');
            // items[j + 1].classList.add('focus');
            // if (+a > +b) {
            // }
            // items[j].classList.add('focus');
            // items[j + 1].classList.add('focus');
            
        }
    }
}