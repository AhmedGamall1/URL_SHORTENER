import { Body, Controller, Post } from '@nestjs/common';
import { LinksService } from './links.service';
import { CreateLinkDto } from './dto/create-link.dto';

@Controller('api/links')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Post()
  async create(
    @Body() dto: CreateLinkDto,
  ): Promise<{ code: string; shortUrl: string }> {
    const { code } = await this.linksService.create(dto.url);
    return {
      code,
      shortUrl: `http://localhost:3000/${code}`,
    };
  }
}
