// 定义 protobuf 静态方法的接口
export interface ProtoMessageStatic<T> {
    // 构造函数签名
    new(...args: any[]): ProtoMessage;

    // 反序列化方法
    deserializeBinary(bytes: Uint8Array): T;
}

// 定义 protobuf 消息的接口
export interface ProtoMessage {
    // 序列化
    serializeBinary(): Uint8Array;
}

// Protobuf 管理器类
export class ProtobufManager {
    private static _instance: ProtobufManager | null = null;
    private protobufTypes: Map<string, ProtoMessageStatic<any>> = new Map();

    // 私有构造函数，初始化默认类型或其他设置
    private constructor() {
    }

    // 获取单例实例
    static get instance(): ProtobufManager {
        if (!ProtobufManager._instance) {
            ProtobufManager._instance = new ProtobufManager();
        }
        return ProtobufManager._instance;
    }

    // 注册新的 protobuf 类型，并关联到一个数据包 ID
    register<T>(packetId: string,
                clazz: ProtoMessageStatic<T>): void {
        this.protobufTypes.set(packetId, clazz);
    }

    // 根据数据包 ID 将任意对象序列化为字节数组
    serialize<T extends ProtoMessage>(packetId: string,
                                      obj: T): Uint8Array {
        const clazz = this.protobufTypes.get(packetId);
        if (clazz) {
            let protoObj = new clazz();
            // 将对象的字段复制到 protobuf 对象中
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    // @ts-ignore
                    protoObj[key] = obj[key];
                }
            }
            return protoObj.serializeBinary();
        } else {
            throw new Error(`Unknown packet ID: ${packetId}`);
        }
    }

    // 根据数据包 ID 将字节数组反序列化为指定类型的对象
    deserialize<T>(packetId: string,
                   bytes: Uint8Array): T {
        const clazz = this.protobufTypes.get(packetId);
        if (clazz) {
            return clazz.deserializeBinary(bytes);
        } else {
            throw new Error(`Unknown packet ID: ${packetId}`);
        }
    }
}
