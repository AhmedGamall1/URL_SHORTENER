import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { LinksModule } from './links/links.module';

@Module({
  imports: [PrismaModule, LinksModule],
})
export class AppModule {}
