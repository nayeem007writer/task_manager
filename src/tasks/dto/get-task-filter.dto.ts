import { IsIn, IsOptional } from "class-validator";
import { TaskStatus } from "../tasks.model";

export class GetTaskFilterDto {
    @IsOptional()
    @IsIn([TaskStatus.DONE, TaskStatus.OPEN, TaskStatus.IN_PROGRESS])
    status: TaskStatus;

    @IsOptional()
    search: string;
}