import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional, Min } from "class-validator";
import { Transform } from "class-transformer";

export class PaginationParamsDto {
    /**
     * 每页显示条数
     */
    @ApiPropertyOptional({
        description: '每页显示条数',
        default: 10,
        example: 10,
        type: Number
    })
    @IsNumber()
    @IsOptional()
    @Min(1)
    @Transform(({value}) => parseInt(value, 10), {toClassOnly: true})
    pageSize: number;
    
    /**
     * 当前页码
     */
    @ApiPropertyOptional({
        description: '当前页数' ,
        default: 1,
        example: 1,
        type: Number  
    })
    @IsNumber()
    @IsOptional()
    @Min(1)
    @Transform(({value}) => parseInt(value, 10), {toClassOnly: true})
    page: number;
}