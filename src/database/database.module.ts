import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { DataSource } from 'typeorm';
import { User } from './models/user.entity';

@Module({
    providers: [
        ...databaseProviders,
        {
            provide: 'USER_REPOSITORY',
            useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
            inject: ['DATA_SOURCE'],
        },
    ],
    exports: [...databaseProviders, 
        'USER_REPOSITORY'
    ],
})
export class DatabaseModule {}
