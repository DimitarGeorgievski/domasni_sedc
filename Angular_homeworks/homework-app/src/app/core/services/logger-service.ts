import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  logAction(action: string){
    console.log(`The action taken is: ${action}, on date: ${new Date().toDateString()}`)
  }
}
