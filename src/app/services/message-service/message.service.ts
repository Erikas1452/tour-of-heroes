import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  public messages: string[] = [];

  constructor() {}

  public add(message: string): void {
    this.messages = [...this.messages, message]
  }

  public clear() {
    this.messages = [];
  }
}
