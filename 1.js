function objectOutput(obj) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            console.log(`${key}: ${obj[key]}`)
        }
    }
}

const objA = {
    name: "Katowice",
    population: 317316
}

const objB = Object.create(objA)
objB.country = "Poland"
objB.continent = "Europe"
// примеры создал для наглядности
objectOutput(objB)// <- вызываем функцию