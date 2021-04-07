import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
  Renderer2,
} from '@angular/core';
import { interval, Observable, Subject } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';
@Directive({
  selector: '[appHoldToDelete]',
})
export class HoldToDeleteDirective {
  @Output() holdTime: EventEmitter<number> = new EventEmitter();

  state: Subject<string> = new Subject();

  cancel: Observable<string>;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.cancel = this.state.pipe(
      filter((v) => v === 'cancel'),
      tap((v) => {
        console.log('%c stopped hold', 'color : red');
        this.holdTime.emit(0);
      })
    );
  }

  @HostListener('mouseup', ['$event'])
  @HostListener('mouseleave', ['$event'])
  onExit() {
    this.state.next('cancel');
  }

  @HostListener('mousedown', ['$event'])
  onHold() {
    console.log('%c started hold', 'color : green');

    this.state.next('start');
    const n = 100;

    interval(n)
      .pipe(
        takeUntil(this.cancel),
        tap((v) => {
          this.holdTime.emit(n * v);
        })
      )
      .subscribe();
  }
}
