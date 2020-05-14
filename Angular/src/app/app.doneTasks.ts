import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
    templateUrl: './app.doneTasks.html'
})
export class DoneTasksComponent {
    _doneTasksArray: Array<any>;
    username: String;
    _http: HttpClient;
    selectedTask;

 


    constructor(private http: HttpClient) {
        this._http = http;
        this.updateLinks()
        this.getDoneTasks();
    }

    updateLinks() {         
        if(sessionStorage.getItem('username')) {
            this.username = sessionStorage.getItem('username')
        }
    }

    getDoneTasks() {
        let url = "http://localhost:1337/doneTasks";
        this._http.post<any>(url, {username:this.username})
        .subscribe(result => {
            this._doneTasksArray = result.doneTasks;
        })
    }

    onSelect(task) {
        this.selectedTask = task;
    }

}