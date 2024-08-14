import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-captcha',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './captcha.component.html',
  styleUrl: './captcha.component.scss'

})
export class CaptchaComponent {
  random = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  enter: number | undefined
  data:any=[];
  validC=false;
  constructor(private http:HttpClient) {
  }
  onInp(value:string){
    if(value.length===4){
      this.http.post('http://localhost/newexamp2/captch.php',JSON.stringify({value: value,da:this.random})).subscribe(response => {
        this.data.push(response)
        if(this.data[0].status === '1'){
          this.validC = true
          console.log(this.validC)
        }
        else {
          this.validC = false
          console.log(this.validC)
        }
        this.data.splice(0, this.data.length)
      })
    }
  }
  genRandom() {
    this.random = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  }
}
