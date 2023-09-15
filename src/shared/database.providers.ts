import { ConfigService } from "@nestjs/config";
import path from "path";
import { DataSource, DataSourceOptions } from "typeorm";


const databaseType: DataSourceOptions['type'] = 'mongodb'

export const DatabaseProviders = [
    {
        provide: 'MONGODB_DATA_SOURCE',
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => {
            const config = {
                type: databaseType,
                url: configService.get<string>('database.url'),
                name: configService.get<string>('database.name'),
                user: configService.get<string>('database.user'),
                pass: configService.get<string>('database.pass'),
                synchronize: configService.get<boolean>('database.synchronize'),
                logging: configService.get<boolean>('database.logging'),
                entities: [path.join(__dirname, '../../**/*.mongo.entity{.ts,.js}')]
            }
            const ds = new DataSource(config);
            await ds.initialize();
            return ds
        }
    }
]