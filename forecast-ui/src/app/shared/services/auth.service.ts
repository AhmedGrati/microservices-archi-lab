import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginDTO } from '../models/login.dto';
import { LoginResponse } from '../models/login.response';
import { HttpClient } from '@angular/common/http';
import { ErrorResponse } from '../models/error.response';
import { RegistrationInput } from '../models/registration.dto';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  BACKEND_BASE_URL = "localhost:3000";
  constructor(private httpClient: HttpClient) { }
  login(loginDTO: LoginDTO): Observable<any> {
    return this.httpClient.post<any>(`http://${this.BACKEND_BASE_URL}/api/auth/login`, loginDTO);
  }
  register(registrationInput: RegistrationInput): Observable<any> {
    return this.httpClient.post<any>(`http://${this.BACKEND_BASE_URL}/api/auth/register`, registrationInput);
  }

}
