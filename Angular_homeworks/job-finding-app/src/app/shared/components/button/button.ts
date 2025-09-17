import { NgClass, NgStyle } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [NgClass, NgStyle],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  text = input<string>('');
  iconClass = input<string>('');
  style = input<{ [key: string]: string }>({});
  disabled = input<boolean>(false);
  btnClick = output();

  onBtnClick() {
    if(!this.disabled()){
      this.btnClick.emit();
    }
  }
}