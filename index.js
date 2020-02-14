let items, n = 500;
let start = null;
// let items, n;

let maxHeight = getComputedStyle(document.documentElement).getPropertyValue('--container-height').replace('px', '')

let x = null, y = null, tempArr, temp, temp1, temp2, temp3;

function onloading() {
    // items = document.getElementsByClassName('item');
    const selectEl = document.getElementsByClassName('quickSortSelectContent')[0];
    selectEl.addEventListener('change', quickSort);
    let container = document.getElementsByClassName('container')[0];
    const containerWidth = container.clientWidth;
    // n = items.length;
    let itemWidth = 50;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        n = 130;
        container.style.margin = '0px auto';
    }
    if ((n * itemWidth) > containerWidth) {
        itemWidth = containerWidth / n;
    }


    for (let i = 0; i < n; i++) {
        let height = parseInt(Math.random() * 320) + 100;
        let div = document.createElement('div');
        div.addEventListener('click', onClick, { once: true });
        // div.innerText = height;
        div.classList.add('item');
        div.style.height = `${height}px`;
        div.style.width = `${itemWidth}px`;
        div.style.marginTop = `${440 - height}px`;
        // items[i].style.height = `${height}px`;
        // items[i].style.marginTop = `${440 - height}px`;
        container.append(div);
    }
    items = document.getElementsByClassName('item');
    enableAllButton();

    // setTimeout(numberIt, 300);
}

window.onload = onloading;

function reset() {
    let container = document.getElementsByClassName('container')[0];
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    const selectEL = document.getElementsByName('quickSort')[0];
    selectEL.selectedIndex = 0;
    onloading();
}

function disableAllButton() {
    const resetButton = document.getElementById('reset');
    resetButton.setAttribute('disabled', true);

    const quickSortButton = document.getElementById('quickSort');
    quickSortButton.setAttribute('disabled', true);

    const mergeSortButton = document.getElementById('merge');
    mergeSortButton.setAttribute('disabled', true);

    const countingSortButton = document.getElementById('counting');
    countingSortButton.setAttribute('disabled', true);

    const bubbleSortButton = document.getElementById('bubble');
    bubbleSortButton.setAttribute('disabled', true);
}

function enableAllButton() {
    const resetButton = document.getElementById('reset');
    resetButton.removeAttribute('disabled');

    const quickSortButton = document.getElementById('quickSort');
    quickSortButton.removeAttribute('disabled');

    const mergeSortButton = document.getElementById('merge');
    mergeSortButton.removeAttribute('disabled');

    const countingSortButton = document.getElementById('counting');
    countingSortButton.removeAttribute('disabled');

    const bubbleSortButton = document.getElementById('bubble');
    bubbleSortButton.removeAttribute('disabled');
}

// function numberIt() {
//     let arr = new Array(maxHeight + 1);
//     for (let i = 0; i <= maxHeight; i++) { arr[i] = 0; }
//     let sortedItemsByHeight = new Array(n);
//     for (let i = 0; i < n; i++) {
//         arr[parseInt(items[i].style.height.replace('px', ''), 10)]++;
//         sortedItemsByHeight[i] = parseInt(items[i].style.height.replace('px', ''), 10);
//     }
//     sortedItemsByHeight = sortedItemsByHeight.sort((a, b) => a < b ? -1 : (a == b ? 0 : 1));
//     let key, lb, ub, mid;
//     for (let i = 0; i < n; i++) {
//         key = parseInt(items[i].style.height.replace('px', ''), 10);
//         lb = 0, ub = n - 1;
//         mid = -1;
//         while (lb <= ub) {
//             mid = lb + Math.floor((ub - lb) / 2);
//             if (sortedItemsByHeight[mid] === key) {
//                 break;
//             } else if (key < sortedItemsByHeight[mid]) {
//                 ub = mid - 1;
//             } else {
//                 lb = mid + 1;
//             }
//         }
//         if (mid > -1 && mid < n) {
//             arr[key]--;
//             items[i].id = n - (mid - arr[key]);
//             items[i].innerText = n - (mid - arr[key]);
//         }
//     }
// }

function onClick(e) {
    const el = e.target;
    // const id = e.target.id;
    // move(id);
    swap(el);
}


// window.requestAnimationFrame(swapItem)

function sleep(ms) {
    return new Promise((resolve, reject) => setTimeout(resolve, ms));
}

async function swapItem(value1, value2, ms) {
    await sleep(ms)
    temp = value1.innerText;
    temp1 = value1.style.height;
    temp2 = value1.style.marginTop

    value1.innerText = value2.innerText;
    value1.style.marginTop = value2.style.marginTop;
    value1.style.height = value2.style.height;

    value2.innerText = temp;
    value2.style.marginTop = temp2;
    value2.style.height = temp1;
    // })
}

function swap(value) {
    if (x === null) {
        x = value;
    }
    if (x !== null && value !== x && y === null) {
        y = value;
        temp = x.innerText;
        temp1 = x.style.height;
        temp2 = x.style.marginTop

        x.innerText = y.innerText;
        x.style.height = y.style.height;
        x.style.marginTop = y.style.marginTop;

        y.innerText = temp;
        y.style.height = temp1;
        y.style.marginTop = temp2;

        x = y = null;
    }
}

function move(id) {
    // const id = event.target.id;
    items = document.getElementsByClassName('item');
    tempArr = Array.from(items);
    if (x === null) {
        x = id;
    }
    if (x !== null && id !== x && y === null) {
        y = id;
        const xId = tempArr.findIndex(value => value.id === x);
        const yId = tempArr.findIndex(value => value.id === y);

        temp = items[xId].style.height;
        temp1 = items[xId].style.marginTop;
        temp2 = items[xId].id;
        temp3 = items[xId].innerText;

        items[xId].style.height = items[yId].style.height;
        items[xId].style.marginTop = items[yId].style.marginTop;
        items[xId].id = items[yId].id;
        items[xId].innerText = items[yId].innerText

        items[yId].style.height = temp;
        items[yId].style.marginTop = temp1;
        items[yId].id = temp2;
        items[yId].innerText = temp3;

        x = y = null;
    }
}