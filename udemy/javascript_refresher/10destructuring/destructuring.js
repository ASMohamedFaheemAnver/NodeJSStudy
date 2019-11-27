const person = {
    name : 'RiFa',
    age : 29,
    greed(){
        console.log('Hello ' + this.name);
    }
}

const printName = ({name, age}) =>{
    console.log(name);
}

const {name, age} = person;

const arr = ['rifa', 'fari'];

const [el1, el2] = arr;

console.log(el1, el2);

printName(person);