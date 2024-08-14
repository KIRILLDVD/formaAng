import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpMethodService {

  constructor(private http: HttpClient) { }

  send(form: any) {
    console.log('Formx: ', form)
    const formData = {...form.value}
    console.log('Formx Data:', formData)
    this.http.post('http://localhost/newexamp2/employee.php', form.value).subscribe(response => {
      console.log(response)
    })
    form.reset();
  }
}
