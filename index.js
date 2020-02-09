let items, n = 200;
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

function disableResetButton() {
    const resetButton = document.getElementById('reset');
    resetButton.setAttribute('disabled', true);
}

function enableResetButton() {
    const resetButton = document.getElementById('reset');
    resetButton.removeAttribute('disabled');
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

async function bubbleSortUtil(arr) {
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j + 1];
                arr[j + 1] = arr[j];
                arr[j] = temp;
                await swapItem(items[j], items[j + 1], 1);
                // swap(items[j + 1]);
            }
        }
    }
}

async function bubbleSort() {
    let arr = Array.from(items).map(item => parseInt(item.style.height.replace('px', ''), 10));
    disableResetButton();
    await bubbleSortUtil(arr);
    enableResetButton();
    // for (let i = 0; i < n; i++) {
    //     items[i].style.height = `${arr[i]}px`;
    //     items[i].style.marginTop = `${400 - arr[i]}px`;
    // }
}

async function quickSort(e) {
    const quickSortType = e.target.value;
    const lb = 0, ub = n - 1;
    let arr = Array.from(items).map(item => parseInt(item.style.height.replace('px', ''), 10));
    disableResetButton();
    await quickSortUtil(arr, lb, ub, quickSortType);
    enableResetButton();
    // for (let i = 0; i < n; i++) {
    //     items[i].style.height = `${arr[i]}px`;
    //     items[i].style.marginTop = `${400 - arr[i]}px`;
    // }
}

async function quickSortUtil(arr, lb, ub, quickSortType) {
    if (lb < ub) {
        let pivot;
        if (quickSortType === 'lomuto') {
            pivot = await partitionLomuto(arr, lb, ub);
        } else if (quickSortType === 'hoare') {
            pivot = await partitionHoare(arr, lb, ub);
        }
        await quickSortUtil(arr, lb, pivot - 1, quickSortType);
        await quickSortUtil(arr, pivot + 1, ub, quickSortType);
    }
}

async function partitionLomuto(arr, lb, ub) {
    let pivot = arr[ub];
    let i = lb - 1;
    let j = lb;
    let temper = 0;
    while (j <= ub - 1) {
        temper = arr[j];
        if (temper < pivot) {
            i++;
            temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
            await swapItem(items[i], items[j], 10);
        }
        j++;
    }
    temp = arr[i + 1];
    arr[i + 1] = arr[ub];
    arr[ub] = temp;
    await swapItem(items[i + 1], items[ub], 100);
    // setTimeout(() => {
    //     swap(items[i + 1]);
    //     swap(items[ub]);
    // }, 300);
    return (i + 1);
}

async function partitionHoare(arr, lb, ub) {
    const pivot = arr[lb];
    let i = lb - 1;
    let j = ub + 1;
    while (i < j) {
        do {
            i++;
        } while (arr[i] < pivot);
        do {
            j--;
        } while (arr[i] > pivot);
        if (i >= j) {
            return j;
        }
        await swapItem(items[i], items[j], 10);
    }

}

async function mergeSort() {
    let arr = Array.from(items).map(item => parseInt(item.style.height.replace('px', ''), 10));
    const n = arr.length;
    disableResetButton();
    await mergeSortUtil(arr, 0, n - 1);
    enableResetButton();
}

async function mergeSortUtil(arr, lb, ub) {
    if (lb < ub) {
        let mid = lb + Math.floor((ub - lb) / 2);
        // await Promise.all([mergeSortUtil(arr, lb, mid), mergeSortUtil(arr, mid + 1, ub)])
        await mergeSortUtil(arr, lb, mid);
        await mergeSortUtil(arr, mid + 1, ub)
        await merge(arr, lb, mid, ub);
    }
}

async function merge(arr, lb, mid, ub) {
    const n1 = mid - lb + 1;
    const n2 = ub - mid;
    const arr1 = new Array(n1);
    const arr2 = new Array(n2);
    for (let i = 0; i < n1; i++) {
        arr1[i] = arr[lb + i];
    }
    for (let i = 0; i < n2; i++) {
        arr2[i] = arr[mid + i + 1];
    }
    let i = 0, j = 0, k = lb;
    while (i < n1 && j < n2) {
        if (arr1[i] <= arr2[j]) {
            arr[k] = arr1[i];
            await sleep(20)
            items[k].style.marginTop = `${440 - arr1[i]}px`;
            items[k].style.height = `${arr1[i]}px`;
            i++;
        } else {
            arr[k] = arr2[j];
            await sleep(20)
            items[k].style.marginTop = `${440 - arr2[j]}px`;
            items[k].style.height = `${arr2[j]}px`;
            j++;
        }
        k++;
    }
    while (i < n1) {
        arr[k] = arr1[i];
        await sleep(20)
        items[k].style.marginTop = `${440 - arr1[i]}px`;
        items[k].style.height = `${arr1[i]}px`;
        i++;
        k++;
    }
    while (j < n2) {
        arr[k] = arr2[j];
        await sleep(20)
        items[k].style.marginTop = `${440 - arr2[j]}px`;
        items[k].style.height = `${arr2[j]}px`;
        j++;
        k++;
    }
}

async function countingSortUtil(arr) {
    const count = new Array(maxHeight + 1);
    for (let i = 0; i <= maxHeight; i++) {
        count[i] = 0;
    }
    const n = arr.length;
    const output = new Array(n);
    for (let i = 0; i < n; i++) {
        const height = arr[i];
        count[height]++;
    }
    for (let i = 1; i <= maxHeight; i++) {
        count[i] += count[i - 1];
    }
    for (let i = 0; i < n; i++) {
        items[i].style.height = `${0}px`;
        // items[i].style.marginTop = `${0}px`;
    }
    for (let i = 0; i < n; ++i) {
        let height = arr[i];
        output[count[height] - 1] = arr[i];
        --count[height];
    }
    for (let i = 0; i < n; i++) {
        await sleep(100);
        items[i].style.height = `${output[i]}px`;
        items[i].style.marginTop = `${400 - output[i]}px`;
    }
}

async function countingSort() {
    disableResetButton();
    let arr = Array.from(items).map(item => parseInt(item.style.height.replace('px', ''), 10));
    await countingSortUtil(arr);
    enableResetButton();
}

function onClick(e) {
    const el = e.target;
    // const id = e.target.id;
    // move(id);
    swap(el);
}

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