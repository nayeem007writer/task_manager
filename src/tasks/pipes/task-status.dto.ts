import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../tasks.model";

export class TaskStatusValidationPipe implements PipeTransform{
    readonly allowedStatuses = [
        TaskStatus.DONE,
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
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