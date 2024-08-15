import {Component, DoCheck,  OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {HttpClientModule} from "@angular/common/http";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpMethodService} from "./service/http-method.service";
import {CaptchaComponent} from "./captcha/captcha.component";





@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgForOf, HttpClientModule, FormsModule, NgIf, ReactiveFormsModule, NgClass, CaptchaComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [HttpMethodService,CaptchaComponent]
})
export class AppComponent implements OnInit, DoCheck {
  form: FormGroup | any
  static numb: number;
  nur: boolean | undefined
  constructor(private httpservice: HttpMethodService,private cap:CaptchaComponent) {
  }
  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      message: new FormControl('', Validators.required),
      selector: new FormControl('Техподдержка',),
      phone: new FormControl('', [Validators.pattern(/\d{0}8\d{10}$/), Validators.required])
    })
  }
  submit() {
    if (this.form.valid) {
      this.httpservice.send(this.form)
    }
  }
  openBlankTab() { setTimeout(()=>{
    window.open('http://localhost/newexamp2/base.php');
  },1000)
  }

  ngDoCheck(): void {
    if(this.form.valid && AppComponent.numb==1){
      this.nur = true
      console.log("allgood")
    }
    else {
      this.nur=false
    }
  }
}
