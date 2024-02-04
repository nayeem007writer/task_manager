import { IsIn, IsString } from "class-validator";
import { ProfileTypeEnum } from "./profile-enum.dto";
import { Optional } from "@nestjs/common";

export class ProfileDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @Optional()
    @IsIn([ProfileTypeEnum.CUSTOM, ProfileTypeEnum.STANDARD])
    type: ProfileTypeEnum;


}