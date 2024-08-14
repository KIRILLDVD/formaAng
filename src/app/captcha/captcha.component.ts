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
  constructor(private http:HttpClient) {
  }

  check() {
    if (this.enter == this.random) {
      console.log('good')
    } else {
      console.log('bad')
    }
  }
  onInp(value:string){
    if(value.length===4){
      console.log(JSON.stringify({data:value, da:this.random}))
      this.http.post('http://localhost/ang/captch.php',JSON.stringify({data: value,res:this.random})).subscribe(response => {
        this.data.push(response)
        console.log(parseInt(this.data[0].status))
        if(this.data[0].status === '3'){
          console.log('good')
        }
        else {
          console.log('bad')
        }
        this.data.splice(0, this.data.length)
      })
      // this.http.get('http://localhost/ang/captch.php').subscribe((response ) => {
      //   this.data.push(response)
      //   if(parseInt(this.data[0].status) === 1){
      //     console.log('успех')
      //   }
      //  else {
      //     console.log('нет успеха')
      //   }
      //
      // });
    }
  }
  genRandom() {
    const min = 1000;
    const max = 9999;

    this.random = Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
