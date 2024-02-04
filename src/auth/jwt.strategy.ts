import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtPayload } from "./jwt-payload.interface";
import { User } from "./user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor( ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'topSecret5133k',
        });
    }

    async validate(payload: JwtPayload): Promise<User> {
        const { email } = payload;
        const  user = await User.findOneBy({email});

        if(!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}