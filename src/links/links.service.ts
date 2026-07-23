import { Injectable } from '@nestjs/common';
import { encodeBase62 } from 'src/common/base62';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LinksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(originalUrl: string): Promise<{ code: string }> {
    //  reserve the next id to prevent duplicate ids under concurrency
    const rows = await this.prisma.$queryRaw<{ id: bigint }[]>`
      SELECT nextval(pg_get_serial_sequence('links', 'id')) AS id
    `;
    const id = rows[0].id;

    // turn that unique id into a short code
    const code = encodeBase62(id);

    // save the row
    await this.prisma.link.create({
      data: { id, code, originalUrl },
    });

    return { code };
  }
}
