import {PersonReq} from './protobuf-class/PersonReq';
import {ProtobufManager} from "../src/ProtobufManager";

describe('Person serialization and deserialization', () => {
    test('should serialize and deserialize a Person object', () => {

        ProtobufManager.instance.register("demo", PersonReq)

        // 不存在的字段
        let bytes = ProtobufManager.instance.serialize("demo", {
            "name": "demo",
        } as PersonReq);

        const newPerson = ProtobufManager.instance.deserialize(
            "demo",
            bytes
        ) as PersonReq

        // Assert
        expect(newPerson.name).toBe('demo');
        // Add more assertions based on your expected behavior
    });
});
