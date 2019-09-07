import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name:'ConnectColor'
})
export class ConnectPipe implements PipeTransform{
    transform(value: any, ...args: any[]) {
        throw new Error("Method not implemented.");
    }


}