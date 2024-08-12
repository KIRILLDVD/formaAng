import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgForOf, HttpClientModule, FormsModule, NgIf, ReactiveFormsModule, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  form: FormGroup | any
  random = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  enter: number | undefined
  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      message: new FormControl('', Validators.required),
      selector: new FormControl('Техподдержка',),
      phone: new FormControl('', [Validators.pattern(/\d{0}8\d{10}$/), Validators.required]),
      captcha: new FormControl('', [Validators.required, Validators.minLength(4)])
    })
  }

  genRandom() {
    const min = 1000;
    const max = 9999;

    this.random = Math.floor(Math.random() * (max - min + 1)) + min;
  }

  submit() {
    if (this.form.valid) {
      console.log('Form: ', this.form)
      const formData = {...this.form.value}
      console.log('Form Data:', formData)
      this.http.post('http://localhost/ang/employee.php', this.form.value).subscribe(response => {
        console.log(response)
      })
      this.form.reset();
    }
  }

  check() {
    if (this.enter == this.random) {
      this.form.controls.captcha.setErrors(null)
    } else {
      this.form.controls.captcha.setErrors({ incorrect: true})
    }
  }
}
