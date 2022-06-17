import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestLogin } from 'src/app/resources/models/RequestLogin';
import { ResponseLogin } from 'src/app/resources/models/ResponseLogin';
import { AlertService } from 'src/app/resources/services/alert.service';
import { LoginService } from 'src/app/resources/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  //variável que diz se o usuário está logado....
 // isLoggedIn = true;


  //Salvando os dados do usuário autenticado
   public responseLogin : ResponseLogin;


   public requestLogin: RequestLogin;


    //injeção de dependencia..
  constructor(
    private loginService: LoginService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.requestLogin = new RequestLogin;
    this.responseLogin = new ResponseLogin;

    //Alterando a variável de segurança liberando a visualização das páginas do sistema.
    //this.isLoggedIn = localStorage.getItem('AUTH') != null;
  }

  //Método invocado pelo botão do formulário
  public doLogin(): void {
    //subscribe --> pegando o retorno da API
    console.log(this.requestLogin)

    //Chamada ao endpoint
    this.loginService.doLogin(this.requestLogin).subscribe(
    
      //Retorno positivo do login
      (data) => {
        //Gravar os dados do usuario em localStage(Sessao)
        this.responseLogin = (data as any);        
        
        //colocando os dados do objeto logado em sessao
        localStorage.setItem("AUTH",JSON.stringify(this.responseLogin));
        
        //Recarregando a página após gravação dos dados em sessao
        this.alertService.info('Usuário autenticado com Sucesso!');
        
        //configurando a rota de navegação caso o login seja de sucesso!
        //se recebeu o JWT
          this.router.navigate(['dashboard']);
      },
      //Retorno negativo do login
      (httpError) => {
        
        if (httpError.status == 401) {
          this.alertService.error("Usuário ou senha inválidos.");
        }
        else {
          //Qualquer outro erro 
          
          this.alertService.error("Ocorreu um erro inesperado, contato o suporte do sistema!");
        }

      }
    );
  }
}



