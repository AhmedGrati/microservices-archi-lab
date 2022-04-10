import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginDTO } from '../models/login.dto';
import { LoginResponse } from '../models/login.response';
import { HttpClient } from '@angular/common/http';
import { ErrorResponse } from '../models/error.response';
import { RegistrationInput } from '../models/registration.dto';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }
  login(loginDTO: LoginDTO): Observable<any> {
    console.log(environment.apiURL);
    return this.httpClient.post<any>(`${environment.apiURL}/api/auth/login`, loginDTO);
  }
  register(registrationInput: RegistrationInput): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiURL}/api/auth/register`, registrationInput);
  }

}
