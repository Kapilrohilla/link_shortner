import { ApiProperty } from '@nestjs/swagger';

export class createShortIdDto {
  @ApiProperty({
    description: 'Url should be in correct format',
    type: String,
    example: 'https://google.in',
  })
  @ApiProperty()
  originalUrl: string;
}
