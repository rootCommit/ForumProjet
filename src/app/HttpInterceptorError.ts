import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ErrorComponent } from './error/error.component';
import { throwError } from 'rxjs';

@Injectable()
export class HttpInterceptorError implements HttpInterceptor{

    constructor(private modal: NgbModal){

    }

    intercept(req: HttpRequest<any>, handler: HttpHandler){

        return handler.handle(req).pipe(
          catchError((error:HttpErrorResponse) => {
            let errorMessage = 'Erreur inconnu';
           if(error.error.message == undefined){
            this.modal.open(ErrorComponent);

           }
            
            return throwError(error);
          }
          )  
        );
    }
    

}