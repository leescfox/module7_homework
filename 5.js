let consumedEnergy = 0 //потребляемая энергия

class Device {
    constructor(consumption) {
        this.state = 'off'
        this.consumption = consumption //это потребление
    }
    //включение в сеть
    plugIn() {
        if (this.state === 'off') {
            this.state = 'on'
            consumedEnergy = consumedEnergy + this.consumption
        }
    }
    //отключение от сети
    plugOut() {
        if (this.state === 'on') {
            this.state = 'off'
            consumedEnergy = consumedEnergy - this.consumption
        }
    }
}

//чайник
class Kettle extends Device {
    constructor(model, price, color, volume, consumption) {
        super(consumption)
        this.model = model
        this.price = price //в рублях
        this.color = color
        this.volume = volume //вместимость в литрах
        this.currentVolume = 0 //текущая заполненность в литрах
        this.waterState = 'unboiled'
    }
    //наполнение чайника на какое-то кол-во литров
    fill(num) {
        if (num > 0) {
            this.waterState = 'unboiled'
            this.currentVolume = this.currentVolume + num
            if (this.currentVolume > this.volume) {
                this.currentVolume = this.volume
            }
        }
    }
    //кипячение
    boil() {
        if (this.currentVolume > 0 && this.state === 'on') {
            this.waterState = 'boiled'
        }
    }
    //наливаем из чайника какое-то кол-во литров
    toEmpty(num) {
        this.currentVolume = this.currentVolume - num
        if (this.currentVolume < 0) {
            this.currentVolume = 0
        }
    }
}

//холодильник
class Fridge extends Device {
    constructor(model, price, color, height, consumption) {
        super(consumption) //в Ваттах
        this.model = model
        this.price = price //в рублях
        this.color = color
        this.height = height //в метрах
        this.items = new Map()
    }
    //кладём что-то в холодильник в определённом кол-ве
    putIn(item, quantity) {
        if (this.items.has(item)) {
            this.items.set(item, this.items.get(item) + quantity)
        } else {
            this.items.set(item, quantity)
        }
    }
    //забираем из холодильника тоже в определённом кол-ве
    takeOut(item, quantity) {
        if (this.items.has(item)) {
            this.items.set(item, this.items.get(item) - quantity)
            if (this.items.get(item) <= 0) {
                this.items.delete(item)
            }
        }
    }
}

//
// ТУТ НАЧИНАЮТСЯ СОЗДАНИЕ ЭКЗЕМПЛЯРОВ И ПРИМЕРЫ
//

const myKettle = new Kettle('Bosch TWK5P471', 5399, 'white', 1.7, 2400)
myKettle.fill(3) //наливаем с запасом, но нальётся лишь макс. объём!
myKettle.plugIn() //подключаем чайник в розетку
myKettle.boil() //кипятим
myKettle.toEmpty(1) //сливаем 1 литр
//console.log(myKettle) //можно расскомментировать и посмотреть экземпляр


const myFridge = new Fridge('Haier C2F637CGG', 65999, 'golden', 1.99, 200)

//вспомогательная функция чтобы показать что вещи успешно кладутся и вынимаются из холодильника
function printProductsList(fridge) {
    console.log("Stored products:")
    for (let [key, value] of fridge.items) {
        console.log(`${key}: ${value}`)
    }
}

myFridge.plugIn() //включаем к розетке
myFridge.putIn('eggs', 12) //кладём яйца
myFridge.putIn('carrot', 3) //кладём морковь
printProductsList(myFridge) //просто покажет что всё положилось успешно
myFridge.takeOut('eggs', 4) //вынимаем 4 яйца
myFridge.takeOut('carrot', 3) //вынимаем всю морковь
printProductsList(myFridge) //снова выводим лист продуктов для сравнения
console.log(consumedEnergy) //выведет сколько сейчас мощности в сумме потребляют все включённые приборы
//console.log(myFridge) //можно расскомментировать и подробно посмотреть экземпляр