import { ApiProperty } from '@nestjs/swagger';
import 'reflect-metadata';

export function ApiObjectProperties(target: Function) {
    const properties = Reflect.ownKeys(target.prototype);  // 获取所有属性
    properties.forEach((property) => {
        if (property === 'constructor') return; // 跳过构造函数

        const type = Reflect.getMetadata('design:type', target.prototype, property);
        if (!type) return;

        ApiProperty({ type: type, description: `${String(property)} 字段` })(target.prototype, property);
    });
}
