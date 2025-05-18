import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { DataSource } from 'typeorm';
import { User } from './models/user.entity';
import { Event } from './models/event.entity';

@Module({
    providers: [
        ...databaseProviders,
        {
            provide: 'USER_REPOSITORY',
            useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
            inject: ['DATA_SOURCE'],
        },
        {
            provide: 'EVENT_REPOSITORY',
            useFactory: (dataSource: DataSource) => dataSource.getRepository(Event),
            inject: ['DATA_SOURCE'],
        },
    ],
    exports: [...databaseProviders, 
        'USER_REPOSITORY',
        'EVENT_REPOSITORY'
    ],
})
export class DatabaseModule {}
