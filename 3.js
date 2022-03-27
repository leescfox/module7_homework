function createNoProtObj() {
    const obj = {}
    obj.__proto__ = null
    return obj
}

const object = createNoProtObj()
console.log(object) // в консоли браузера видно что у нашего объекта нет св-ва __proto__