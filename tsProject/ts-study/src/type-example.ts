// Readonly Partial Pick Record
interface Person {
  name: string
  age: number
}



type dd = Readonly<Person>
type cc = Partial<Person>

type Keys = 'option1' | 'option2'
type Flags = { [k in Keys]: boolean}

type Nullable<T> = {
  [P in keyof T]: T[P] | null
}
type NullablePerson = { [P in keyof Person]: Person[P] | null}
type PartialPerson = { [P in keyof Person]?: Person[P] }

