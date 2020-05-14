import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";



@Component({
    templateUrl: './app.newTask.html'
})
export class NewTaskComponent {
    name: String;
    description: String;
    deadline: Date;
    deadline_datetime: Date;
    _http: HttpClient;
    _errorMessage: String = "";
    _validation: String;
 


    constructor(private http: HttpClient, private router: Router) {
        this._http = http;
    }


    createTask() {
        let now = new Date();
        this.deadline_datetime = new Date(this.deadline);
        if(this.deadline_datetime.getTime() < now.getTime()) {
            this._errorMessage = "Invalided deadline input."
        } 
        else if(this.name == "") {
            this._errorMessage = 'Task name can not be empty.'
        }
        else if(this.description == "") {
            this._errorMessage = 'Task description can not be empty.'
        }
        else if(!this.deadline) {
            this._errorMessage = 'Task deadline can not be empty.'
        }
        else {
            let url = "http://localhost:1337/newTask";
            console.log(this.deadline)
            let newTask = {
                "name": this.name,
                "description": this.description,
                "deadline": this.deadline
            }
            this._http.post<any>(url, newTask)
            .subscribe(
                (data) => {
                    console.log(data)
                    alert('New task successfully created.')
                    this.router.navigateByUrl('/main');
                },
                error => {
                    alert(JSON.stringify(error));
                });
        }

    }

}

