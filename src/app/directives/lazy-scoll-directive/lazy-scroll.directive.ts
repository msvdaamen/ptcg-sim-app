import {Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';

export interface Viewport {
  h: number;
  w: number;
}


@Directive({
  selector: '[appLazyScroll]'
})
export class LazyScrollDirective implements OnInit {

  @Output()
  isBottom = new EventEmitter();
  @Input()
  offsetBottom: number;
  canEmitAction = false;
  el: any;
  viewport: Viewport;

  constructor(private element: ElementRef) {
    this.el = element.nativeElement;
    this.viewport = this.getViewport(window);
  }

  ngOnInit(): void {
    if (!this.offsetBottom) {
      this.offsetBottom = 0;
    }
  }

  @HostListener('scroll', ['$event'])
  onElementScroll($event): void {
    if (this.elementEndReachedInSelfScrollbarContext() && this.canEmitAction) {
      this.triggerAction();
    }
  }

  triggerAction(): void {
    this.canEmitAction = false;
    this.isBottom.emit(true);
  }

  elementEndReachedInSelfScrollbarContext(): boolean {
    if (Math.ceil(this.el.scrollTop + this.el.offsetHeight) >= this.el.scrollHeight) {
      this.canEmitAction = true;
      return true;
    }
    return false;
  }

  private getViewport(win: Window): Viewport {
    // This works for all browsers except IE8 and before
    if (win.innerWidth != null) {
      return {
        w: win.innerWidth,
        h: win.innerHeight
      };
    }

    // For IE (or any browser) in Standards mode
    const d = win.document;

    if (document.compatMode == 'CSS1Compat') {
      return {
        w: d.documentElement.clientWidth,
        h: d.documentElement.clientHeight
      };
    }

    // For browsers in Quirks mode
    return {
      w: d.body.clientWidth,
      h: d.body.clientHeight
    };
  }
}
