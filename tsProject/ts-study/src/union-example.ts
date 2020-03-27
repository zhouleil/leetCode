/**
 * 可辨识度联合类型
 */

 // 1、字面量类型

 // 字面量（Literal Type）主要分为 真值字面量类型（boolean literal types）,数字字面量类型（numeric literal types）,枚举字面量类型（enum literal types）,大整数字面量类型（bigInt literal types）和字符串字面量类型（string literal types）。
 
 // 字面量类型的要和实际的值的字面量一一对应
 const f: false = false

 const n: 2333 = 2333

 const nb: 0b10 = 2

 const no: 0o114 = 0b1001100

 const nx: 0x514 = 1300

//  const nn: 0x1919n = 6425n

 const g: 'github' = 'github'


 // 2、类型字面量

 type BAX = {
   baz: [
     number,
     'xx'
   ]
   toString(): string
   readonly [Symbol.iterator]: 'github'
   0x1: 'foo'
   'bar': 12n
 }

 // 可辨识联合类型

 interface Info {
  username: string
}

interface UserAction {
  id?: number
  action: 'create' | 'delete'
  info: Info
}

// 创建用户时是不需要 id 的,但是根据上面接口产生的情况,以下代码是合法的:
const action:UserAction = {
  action:'create',
  id: 111,
  info: {
      username: 'xiaomuzhu'
  }
}


type UserAction2 =  {
  id: number
  action: 'delete'
  info: Info
} |
{
  action: 'create'
  info: Info
}

const action2:UserAction2 = {
  action:'create',
  info: {
      username: 'xiaomuzhu'
  }
}

const UserReducer = (userAction: UserAction2) => {
  switch (userAction.action) {
      case 'delete':
          console.log(userAction.id);
          break;
      default:
          break;
  }
}

// 上面提到了 userAction.action 就是辨识的关键,被称为可辨识的标签,