import { ApiProperty } from '@nestjs/swagger';

export class singinDto {
  @ApiProperty({
    type: String,
    required: true,
    example: 'kapilrohilla@xyz.com',
  })
  email: string;
  @ApiProperty({
    type: String,
    required: true,
    example: '<secret-password>',
  })
  password: string;
}
