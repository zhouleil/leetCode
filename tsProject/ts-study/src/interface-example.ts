
interface User {
  name: string
  age?: number
  readonly isMale?: boolean
  say: Say,
  phone: Phone
}

interface Say {
  (words: string): string
}

interface Config {
  width?: number
}

interface Phone {
  [name: string]: string
}

interface VipUser extends User {
  broadcast: () => void
}

const user: User = {
  name: 'aa',
  age: 12,
  say: (words: string) => words,
  phone: {
    qq: '79874564'
  }
}

const getUserName = (user: User) => user.name

user.say('hello world')

function CalculateAreas(config: Config): { area: number } {
  let square = 100
  if (config.width) {
    square = config.width * config.width
  }
  return { area: square }
}

let mySquare = CalculateAreas( { widdth : 100 } as Config )