let consumedEnergy = 0 //потребляемая энергия

function Device(consumption) {
    this.state = 'off'
    this.consumption = consumption //это потребление
}
//включение в сеть
Device.prototype.plugIn = function () {
    if (this.state === 'off') {
        this.state = 'on'
        consumedEnergy = consumedEnergy + this.consumption
    }
}
//отключение от сети
Device.prototype.plugOut = function () {
    if (this.state === 'on') {
        this.state = 'off'
        consumedEnergy = consumedEnergy - this.consumption
    }
}
//чайник
function Kettle(model, price, color, consumption, volume) {
    this.model = model
    this.price = price //в рублях
    this.color = color
    this.consumption = consumption
    this.volume = volume //вместимость в литрах
    this.currentVolume = 0
    this.waterState = 'unboiled'
}
Kettle.prototype = new Device()
//наполнение чайника на какое-то кол-во литров
Kettle.prototype.fill = function (num) {
    if (num > 0) {
        this.waterState = 'unboiled'
        this.currentVolume = this.currentVolume + num
        if (this.currentVolume > this.volume) {
            this.currentVolume = this.volume
        }
    }
}
//кипячение
Kettle.prototype.boil = function () {
    if (this.currentVolume > 0 && this.state === 'on') {
        this.waterState = 'boiled'
    }
}
//наливаем из чайника какое-то кол-во литров
Kettle.prototype.toEmpty = function (num) {
    this.currentVolume = this.currentVolume - num
    if (this.currentVolume < 0) {
        this.currentVolume = 0
    }
}

//холодильник
function Fridge(model, price, color, consumption, height) {
    this.model = model
    this.price = price //в рублях
    this.color = color
    this.consumption = consumption //Вт
    this.height = height //в метрах
    this.items = new Map()
}
Fridge.prototype = new Device()
//кладём что-то в холодильник в определённом кол-ве
Fridge.prototype.putIn = function (item, quantity) {
    if (this.items.has(item)) {
        this.items.set(item, this.items.get(item) + quantity)
    } else {
        this.items.set(item, quantity)
    }
}
//забираем из холодильника тоже в определённом кол-ве
Fridge.prototype.takeOut = function (item, quantity) {
    if (this.items.has(item)) {
        this.items.set(item, this.items.get(item) - quantity)
        if (this.items.get(item) <= 0) {
            this.items.delete(item)
        }
    }
}

// ТУТ НАЧИНАЕТСЯ СОЗДАНИЕ ЭКЗЕМПЛЯРОВ И ПРИМЕРЫ

const myKettle = new Kettle('Bosch TWK5P471', 5399, 'white', 2400, 1.7)
myKettle.fill(3) //наливаем с запасом, но нальётся лишь макс. объём!
myKettle.plugIn() //подключаем чайник
myKettle.boil() //кипятим
myKettle.toEmpty(1) //сливаем 1 литр
//console.log(myKettle) //можно расскомментировать и посмотреть


const myFridge = new Fridge('Haier C2F637CGG', 65999, 'golden', 200, 1.99)

//вспомогательная функция чтобы показать что вещи кладутся и вынимаются из холодильника
function printProductsList(fridge) {
    console.log("Stored products:")
    for (let [key, value] of fridge.items) {
        console.log(`${key}: ${value}`)
    }
}

myFridge.plugIn() //включаем
myFridge.putIn('eggs', 12) //кладём яйца
myFridge.putIn('carrot', 3) //кладём морковь
printProductsList(myFridge) //просто покажет что всё положилось успешно
myFridge.takeOut('eggs', 4) //вынимаем 4 яйца
myFridge.takeOut('carrot', 3) //вынимаем всю морковь
printProductsList(myFridge) //снова выводим лист продуктов для сравнения
console.log(consumedEnergy) //сколько сейчас потребляют мощности все включённые приборы
//console.log(myFridge) //можно расскомментировать и подробно посмотреть экземпляр