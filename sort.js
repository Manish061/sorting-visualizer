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
    if (!isArraySorted(arr)) {
        disableAllButton();
        await bubbleSortUtil(arr);
        enableAllButton();
    } else {
        alert('Already sorted. Use reset button to start again')
    }
    // for (let i = 0; i < n; i++) {
    //     items[i].style.height = `${arr[i]}px`;
    //     items[i].style.marginTop = `${400 - arr[i]}px`;
    // }
}

async function quickSort(e) {
    const quickSortType = e.target.value;
    const lb = 0, ub = n - 1;
    let arr = Array.from(items).map(item => parseInt(item.style.height.replace('px', ''), 10));
    if (!isArraySorted(arr)) {
        disableAllButton();
        await quickSortUtil(arr, lb, ub, quickSortType);
        enableAllButton();
    } else {
        alert('Already sorted. Use reset button to start again')
    }
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
        await Promise.all([quickSortUtil(arr, lb, pivot - 1, quickSortType),quickSortUtil(arr, pivot + 1, ub, quickSortType)])
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
    if (!isArraySorted(arr)) {
        const n = arr.length;
        disableAllButton();
        await mergeSortUtil(arr, 0, n - 1);
        enableAllButton();
    } else {
        alert('Already sorted. Use reset button to start again')
    }
}

async function mergeSortUtil(arr, lb, ub) {
    if (lb < ub) {
        let mid = lb + Math.floor((ub - lb) / 2);
        // await Promise.all([mergeSortUtil(arr, lb, mid), mergeSortUtil(arr, mid + 1, ub)])
        await Promise.all([mergeSortUtil(arr, lb, mid), mergeSortUtil(arr, mid + 1, ub)])
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
    let arr = Array.from(items).map(item => parseInt(item.style.height.replace('px', ''), 10));
    if (!isArraySorted(arr)) {
        disableAllButton();
        await countingSortUtil(arr);
        enableAllButton();
    } else {
        alert('Already sorted. Use reset button to start again')
    }
}

function isArraySorted(arr) {
    if (!arr || !Array.isArray(arr)) {
        return false;
    }
    let i;
    const n = arr.length;
    for (i = 1; i < n; i++) {
        if (arr[i] < arr[i - 1]) {
            return false;
        }
    }
    return true;
}
