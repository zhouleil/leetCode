interface Userss {
  id: number
  name: string
  form?: string
}

type Fo = () => Userss

type R1 = ReturnType<Fo> // User

// type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

