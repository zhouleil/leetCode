/**
 * 类
 */

// 抽象类只能被继承，不能实例化
abstract class Animal {
  abstract makeSound(): void
  move(): void {
    console.log('move')
  }
}

class Cat extends Animal {
  makeSound() {
    console.log('mm')
  }
}

var cat = new Cat()

cat.makeSound()

cat.move()

/**
 * public 成员都默认为 public, 被此限定符修饰的成员是可以被外部访问
 * private 私有属性只能在内部访问
 * protected 保护属性可以在内部和子类访问
 */
class Car {
  private name = 'aodi'

  public run () {
    console.log(this.name + 'run')
  }

  protected init () {
    this.run
  }
}

class CTR extends Car {
  crun () {
    this.init()
  }
}

const car = new Car()
const gtr = new CTR()

car.run()
gtr.crun()


// 类作为接口使用


