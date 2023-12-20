import { Person } from './Person';

const person = new Person();
person.name = 'John Doe'
person.id = 123;
person.email = 'john@example.com'

// 序列化为字节数组
const bytes = person.serializeBinary();

// 反序列化
const newPerson = Person.deserializeBinary(bytes);

console.log(newPerson.name); // 输出 'John Doe'
