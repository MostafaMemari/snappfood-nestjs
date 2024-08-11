import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
export class PaginationDto {
  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  page: number;
  @ApiPropertyOptional({ default: 10 })
  @IsOptional()
  limit: number;
}
