import { Directive, ElementRef, HostListener, inject, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHoverShadow]',
})
export class HoverShadowDirective implements OnInit {
  private elementRef = inject(ElementRef);
  private renderer = inject(Renderer2);

  ngOnInit() {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'transition',
      'box-shadow 0.1s ease-in-out'
    );
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.elementRef.nativeElement.style.boxShadow =
      '0 4px 8px rgba(0,0,0,0.36), 0 4px 9px rgba(0,0,0,0.33)';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.removeStyle(this.elementRef.nativeElement, 'box-shadow');
  }
}
