import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {AppComponent} from "../app.component";
import {NgIf} from "@angular/common";
import {HttpMethodService} from "../service/http-method.service";

@Component({
  selector: 'app-captcha',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './captcha.component.html',
  styleUrl: './captcha.component.scss'
})
export class CaptchaComponent {
  enter: number | undefined
  constructor(protected htppservice: HttpMethodService) {
  }
  onInp(value:string){
    if(value.length===4){
        this.htppservice.postCaptcha(value)
    }
    else{
      this.AppComponent.numb=3
    }
  }
  protected readonly AppComponent = AppComponent;
}
