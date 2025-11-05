import { Priority } from './../models/task.model';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Status, Task, TaskForm } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = environment.apiUrl;
  

  constructor(private http: HttpClient) { }

  getAllTasks():Observable<Task[]>{
    return this.http.get<Task[]>(`${this.apiUrl}/tasks`);
  }

  getTaskById(id:number):Observable<Task>{
    return this.http.get<Task>(`${this.apiUrl}/tasks/${id}`);
  }

  createTask(task:Task):Observable<Task>{
    return this.http.post<Task>(`${this.apiUrl}/tasks`,task);
  }

  updateTask(id:number,task:TaskForm):Observable<Task>{
    return this.http.put<Task>(`${this.apiUrl}/tasks/${id}`,task);
  }

  deleteTask(id:number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/tasks/${id}`);
  }

  searchTasks(searchItem:string):Observable<Task[]>{
    const params=new HttpParams().set('q',searchItem);
    return this.http.get<Task[]>(`${this.apiUrl}/tasks/search`,{params});
  }

  filterByStatus(status:Status):Observable<Task[]>{
    const params=new HttpParams().set('status',status);
    return this.http.get<Task[]>(`${this.apiUrl}/tasks/filter/status`,{params});
  }

  filterByPriority(priority:Priority):Observable<Task[]>{
    const params=new HttpParams().set('priority',priority);
    return this.http.get<Task[]>(`${this.apiUrl}/tasks/filter/priority`,{params});
  }


}
