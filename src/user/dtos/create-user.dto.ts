import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length, Matches } from "class-validator"

export class CreateUserDto {

    @ApiProperty({example: '1234567890', description: 'The phone number of the user'})
    @Matches(/^[0-9]{10}$/, { message: 'Phone number must be 10 digits' })
    phone: string;

    @ApiProperty({example: 'John Doe', description: 'The name of the user'})
    name: string;

    @ApiProperty({example: 'john.doe@gmail.com', description: 'The email of the user'})
    email: string;

    @ApiProperty({example: '123456', description: 'The password of the user'})
    @IsNotEmpty()
    @Length(6,18)
    password: string;
}
