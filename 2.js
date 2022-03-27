function checkKeyInObj(str, obj) {
    for (let key in obj) {
        if (key === str) {
            return true
        }
    }
    return false
}

const object = {
    city: "Katowice",
    population: 317316,
    country: "Poland"
} // какой-то объект для примера

console.log(checkKeyInObj('city', object))  //пример 1
console.log(checkKeyInObj('key', object))  //пример 2