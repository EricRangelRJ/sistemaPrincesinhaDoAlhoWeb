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
  
  
  //atributo
  endpoint = environment.apiUrl + '/auth';
  
  
  constructor(private httpClient: HttpClient) {}


  public doLogin(requestLogin: RequestLogin){

    //passando os dados do formulário para o endpoint
    const formData = new FormData();

    formData.append('email', requestLogin.email);
    formData.append('senha', requestLogin.senha);

    return this.httpClient.post(this.endpoint,formData)
    
  }




  }
