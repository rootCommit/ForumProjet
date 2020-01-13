import { Pipe, PipeTransform } from '@angular/core';
import { of } from 'rxjs';

@Pipe({
    name: "preEdit"
})
export class PreEditPipe implements PipeTransform{

    transform(value: String) {
        //rajouter un & apres chaque chevron crée par l'user pour empecher les xss
        //Chercher les mots clés comme :hap: pour pour faire un insert image du smyley :hap: par exemple

        //Necessite de parcourir 
        
        value = this.transformSpecialChar(value);
        return this.transformEmoji(value);

    }

    transformSpecialChar(value: String){
        return value.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
    }

    transformEmoji(value: String){
        return value.replace(/:hap:/g, '<img height="20px" width="20px%" src="/assets/emoji/Hap.png">');
    }

}