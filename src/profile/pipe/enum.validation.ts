import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { ProfileTypeEnum } from "../dto/profile-enum.dto";


export class ProfileValidationPipe implements PipeTransform{
    readonly allowedStatuses = [
        ProfileTypeEnum.CUSTOM,
        ProfileTypeEnum.STANDARD,
    ];
    transform(value: any) {
        console.log('value', value);
        value = value.toUpperCase()
        if(!this.isStatusValid(value)){
            throw new BadRequestException(`${value} is invalid status`);
        }
        return value;
    }

    private isStatusValid( status: any){
        const idx = this.allowedStatuses.indexOf(status);
        return idx !== -1;
    }
}