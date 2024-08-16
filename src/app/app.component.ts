import {Component, DoCheck,  OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpMethodService} from "./service/http-method.service";
import {CaptchaComponent} from "./captcha/captcha.component";
import {HttpClientModule} from "@angular/common/http";






@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgForOf,HttpClientModule, FormsModule, NgIf, ReactiveFormsModule, NgClass, CaptchaComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [HttpMethodService,CaptchaComponent]
})
export class AppComponent implements OnInit, DoCheck {
  form: FormGroup | any
  static numb: number;
  nur: boolean | undefined
  constructor(protected httpservice: HttpMethodService) {
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
    window.location.reload();
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
  async doSomething() {
    try {
      const promis1 = new Promise((resolve, reject) => {
        setTimeout(() => resolve('It good'), 1000)
      })
      const promis2 = new Promise((resolve, reject) => {
        setTimeout(() => reject('2good'), 2000)
      })
      await promis1
      await promis2
      console.log('200')
    }catch (error){
      console.error(error)
    }
  }
  async ddt(){
    try{
      const task1 = await this.Tsk1()
      const task2 = await this.Tsk2()
      console.log(`ALL:${task1}`)
      console.log(`ALL:${task2}`)
    } catch (error){
      console.error(error)
    }
  }
  async Tsk1(){
    return new  Promise((resolve, reject)=>{
      setTimeout(()=> resolve('good1'),1000)
      console.log(resolve)
    })
  }
  async Tsk2(){
    return new  Promise((resolve, reject)=>{
      setTimeout(()=> resolve('good2'),2000)
    })
  }

  fff() {
    this.httpservice.metod()
  }
}
