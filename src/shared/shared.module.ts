import { Module } from '@nestjs/common';
import { SystemService } from './system.service';
import { ConfigModule } from '@nestjs/config';
import { configModuleOptions } from './configs/module-options';

@Module({
    providers: [SystemService],
    exports: [SystemService, ConfigModule],
    imports: [ConfigModule.forRoot(configModuleOptions)]
})
export class SharedModule { }