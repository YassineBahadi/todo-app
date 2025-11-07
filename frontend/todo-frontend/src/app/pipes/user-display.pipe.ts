import { Pipe, PipeTransform } from "@angular/core";
import { User } from "../models/user.model";


@Pipe({
    name:'userDisplay',
    standalone:true
})

export class UserDisplayPipe implements PipeTransform{
    transform(user:User|null):string{
        return user?.username|| 'Utilisateur';
    }
}