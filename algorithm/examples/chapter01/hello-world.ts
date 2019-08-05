let myName = 'Packey';
// myName = 10;

let age:number = 20;
let existsFlag:boolean = true;
let language:string = 'Javascript';

interface Person {
	name: string;
	age: number;
};

function printName(person:Person) {
	console.log(person.name)
}

function printName1(person: { name: string, age: number}) {
	console.log(person.name)
}
const john = { name: 'John', age: 21};
const mary = { name: 'Mary', age: 21, phone: '123-45678' };

printName(john);
printName(mary);

printName1(mary);


let myAdd: (baseValue: number, increment: number) => number =
    function(x: number, y: number): number { return x + y; };

console.log(myAdd(2,3));  
