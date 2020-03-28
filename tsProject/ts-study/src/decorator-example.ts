/**
 * 装饰器
 */

 // 当装饰器作为修饰类的时候，会把构造器传递进去
 function addAge (constructor: Function) {
   constructor.prototype.age = 18
 }


 // 修饰方法
 function method (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
   console.log(target)
   console.log('prop' + propertyKey)
   console.log('desc' + JSON.stringify(descriptor) + '\n\n')
   descriptor.writable = false
 }

 // 装饰类
 @addAge
 class Person2 {
   name: string = 'xx'
   age!: number
   constructor () {
     this.name = 'xiao'
   }

   @method
   say () {
     return 'instance method'
   }

   @method
   static run () {
     return 'static method'
   }
 }

 const person2 = new Person2()

 console.log(person2.age)

