import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";



@Component({
    templateUrl: './app.register.html'
})
export class RegisterComponent {
    username: String;
    firstName: String;
    lastName: String;
    email: String;
    password: String;
    passwordConfirm: String;
    _http: HttpClient;
    _errorMessage: String = "";
 


    constructor(private http: HttpClient, private router: Router) {
        this._http = http;
    }


    register() {

        if(!this.username) {
            this._errorMessage = 'Please enter your username.'
        }
        else if(!this.password) {
            this._errorMessage = "Please enter your password."
        } 
        else if(!this.firstName) {
            this._errorMessage = 'Please enter your first name.'
        }
        else if(!this.lastName) {
            this._errorMessage = 'Please enter your last name.'
        }        
        else if(!this.email) {
            this._errorMessage = 'Please enter your email address.'
        }
        else if(this.password != this.passwordConfirm) {
            this._errorMessage = "Invalided password input."
        }
        else {
            let url = "http://localhost:1337/CreateUser";
            let newTask = { 
                "username": this.username,
                "firstName": this.firstName,
                "lastName": this.lastName,
                "email": this.email,
                "password": this.password,
                "passwordConfirm":this.passwordConfirm
            }
            this._http.post<any>(url, newTask)
            .subscribe(
                (data) => {
                    console.log(data)
                    alert('New user registered successfully.')
                    this.router.navigateByUrl('/main');
                },
                error => {
                    this._errorMessage = error.error
                });
        }

    }

}

