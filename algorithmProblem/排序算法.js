/**
 * 生成无序数组
 * @param {number} len  数组长度
 */
function createRandomArray(len) {
    let arr = [];
    function getRandom(len) {
        return Math.floor(Math.random() * (len + 1));
    }
    while(arr.length !== len) {
        arr.push(getRandom(len))
    }
    return arr;
}

/**
 * sort方法排序
 * @param {Array} arr 
 */
function fnSort(arr) {
    console.time('fnSort')
    arr.sort(function(a ,b) {
          if (a < b) {
              return -1;
          }
          if (a == b ) {
              return 0;
          }
          if (a > b) {
              return 1
          }
    });
    console.timeEnd('fnSort')
    return arr;
}
/**
 * 选择排序
 * @param {Array} arr 
 */
function selectSort(arr) {
    console.time('selectSort')
    let initIndex = 0;
    // 获取最小值索引
    function getMininumIndex(initIndex,arr) {
        let minimumIndex = initIndex;
        let counter = minimumIndex + 1;
        while(counter < arr.length) {
            if (arr[minimumIndex] > arr[counter]) {
                minimumIndex = counter;
            }
            counter++;
        }
        return minimumIndex;
    }
    // 将最小值交换到应该所处的位置
    function swapNum (initIndex,minimumIndex, arr) {
        let a = arr[initIndex];
        arr[initIndex] = arr[minimumIndex];
        arr[minimumIndex] = a;
    }
    // 从0位置开始排序
    while(initIndex < arr.length ) {
        let minimumIndex = getMininumIndex(initIndex,arr);
        swapNum(initIndex,minimumIndex,arr);
        initIndex++;
    }
    console.timeEnd('selectSort')
    return arr;
}


/**
 * 冒泡排序
 * @param {Array} arr 
 */
function bubbleSort(arr) {
    console.time('bubbleSort')
    // 需要冒泡的次数
    for (let i = 0; i < arr.length - 1; i++) {
        // 执行冒泡
        for (let j = arr.length - 1; j > i; j--) {
            // 如果没有发生过交换，说明排序已完成
            if (arr[j] < arr[j - 1]) {
                let temp = arr[j];
                arr[j] = arr[j -1];
                arr[j -1] = temp;
            }
        }
    }
    console.timeEnd('bubbleSort')
    return arr;
}
// 冒泡 while循环实现
function bubbleSort2(arr) {
    console.time('bubbleSort2')
    let firstUnsorted = 0;
    let swap = true;
    while(firstUnsorted < arr.length - 1 && swap) {
        swap = false;
        let index = arr.length - 1;
        while (index > firstUnsorted) {
            if (arr[index] < arr[index - 1]) {
                let temp = arr[index];
                arr[index] = arr[index -1];
                arr[index -1] = temp;
                swap = true;
            }
            index--;
        }
        firstUnsorted++;
    }
    console.timeEnd('bubbleSort2')
    return arr;
}

/**
 * 插入排序
 * @param {Array} arr 
 */
function insertionSort(arr) {
    console.time("insertionSort")
    let current = 1;
    while (current < arr.length) {
        let index = current,
            placeUnfound = false;
        while(index > 0 && !placeUnfound) {
            if(arr[index] < arr[index -1]) {
                let temp = arr[index];
                arr[index] = arr[index - 1];
                arr[index -1] = temp;
                index--;
            } else {
                placeUnfound = true;
            }
        }
        current++;
    }
    console.timeEnd("insertionSort")
    return arr;
}
/**
 * 插入排序 for循环
 * @param {Array} arr 
 */
function insertionSort2(arr) {
    console.time('insertionSort2');
    for (let i = 1; i < arr.length; i++) {
        for (let j = i; j > 0; j--) {
            if (arr[j] < arr[j - 1]) {
                let temp = arr[j];
                arr[j] = arr[j - 1];
                arr[j -1] = temp;
            } else {
                break;
            }
        }
    }
    console.timeEnd('insertionSort2');
    return arr;
}
// 测试
// fnSort(createRandomArray(100000));
// selectSort(createRandomArray(100000));
// bubbleSort(createRandomArray(100000));
// bubbleSort2(createRandomArray(100000));
// insertionSort(createRandomArray(100000));
// insertionSort2(createRandomArray(100000));






