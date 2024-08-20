import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppComponent} from "../app.component";


@Injectable({
  providedIn: 'root'
})
export class HttpMethodService{
  randomNuber: number | any;
  data:any=[];
  validC: boolean | undefined;
  constructor(private http: HttpClient) { }
  send(form: any) {
    try {
      console.log('Formx: ', form)
      const formData = {...form.value}
      console.log('Formx Data:', formData)
      this.http.post('/api/employee.php', form.value).subscribe(response => {
        console.log(response)
      })
      form.reset();
    }catch (error:any){
      alert('Возникла непредвиденная ошибка' + error.name + ':' + error.message)
    }
  }

  captchaNumber(){ try {
    this.http.get('/api/captch.php', {responseType: 'text'}).subscribe((response)=>{
      this.randomNuber = response;
      console.log(this.randomNuber);
    })
  } catch (error: any){
    alert('Возникла непредвиденная ошибка' + error.name + ':' + error.message)
  }}

  postCaptcha(value:string) { try {
    this.http.post('/api/captch.php',JSON.stringify({value: value,da:this.randomNuber})).subscribe(response => {
      this.data.push(response)
      if(this.data[0].status === '1'){
        this.validC=true
        this.AppComponent.numb=1
        console.log(this.validC)
      }
      else {
        this.validC=false
        this.AppComponent.numb=2
        console.log(this.validC)
      }
      this.data.splice(0, this.data.length)
    })
  } catch (error : any){
    alert('Возникла непредвиденная ошибка' + error.name + ':' + error.message)
  }

  }
  protected readonly AppComponent = AppComponent;
}
