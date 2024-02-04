import {  Repository  } from "typeorm";
import { Profile } from "./profile.entity";
import { Injectable } from "@nestjs/common";

// @EntityRepository(Task)
@Injectable()
export class ProfileRepository extends Repository<Profile> {

}