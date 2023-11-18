import { ApiProperty } from '@nestjs/swagger';

export class newUserDto {
  @ApiProperty({ type: String, required: true, example: 'Kapil' })
  first_name: string;
  @ApiProperty({
    type: String,
    required: false,
    example: 'Rohilla',
  })
  last_name?: string;
  @ApiProperty({
    type: String,
    required: true,
    example: 'kapilrohilla2002@gmail.com',
  })
  email: string;
  @ApiProperty({
    type: String,
    required: true,
    example: 'secured-password',
  })
  password: string;
}
