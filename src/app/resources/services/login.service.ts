import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { RequestLogin } from '../models/RequestLogin';
import { ResponseLogin } from '../models/ResponseLogin';

@Injectable({
  providedIn: 'root',
})
export class LoginService {


  // URL API WEB
  endpoint = environment.apiUrl + '/auth';

  // INJEÇÃO DE DEPENDÊNCIA
  constructor(private httpClient: HttpClient) { }

  // AUTENTICANDO (CHAMADA DO MÉTODO)
  public doLogin(requestLogin: RequestLogin) {

    //AUTENTICANDO DE FATO
    return this.httpClient.post(this.endpoint, requestLogin)

  }


}
