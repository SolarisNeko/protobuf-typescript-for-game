import {PersonReq} from './PersonReq';

describe('Person serialization and deserialization', () => {
    test('should serialize and deserialize a Person object', () => {
        // Arrange
        const person = new PersonReq();
        person.name = 'John Doe';
        person.id = 123;
        person.email = 'john@example.com';

        // Act
        const bytes = person.serializeBinary();
        const newPerson = PersonReq.deserializeBinary(bytes);

        // Assert
        expect(newPerson.name).toBe('John Doe');
        // Add more assertions based on your expected behavior
    });
});
