import {
  Component,
  Input,
  OnDestroy,
  OnChanges,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  NgZone,
  SimpleChanges,
  OnInit,
} from '@angular/core';
import { F2ChartConfig } from './config';
import { LoaderService } from './load.service';

declare var window: any;

@Component({
  selector: 'f2-chart',
  template: `<canvas #canvas></canvas>`,
  styles: [ `:host { display: block; } ` ]
})
export class F2ChartComponent implements OnInit, OnDestroy, OnChanges {
  private instance: any;
  private initFlag = false;

  @ViewChild('canvas') canvas;

  @Input() options: any;
  @Output() ready = new EventEmitter<any>();
  @Output() destroy = new EventEmitter();

  constructor(
    private el: ElementRef,
    private config: F2ChartConfig,
    private ss: LoaderService,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('options' in changes) this.init();
  }

  ngOnInit() {
    // 构建一个虚拟id
    this.initFlag = true;

    // 已经存在对象无须进入懒加载模式
    if (window.F2) {
      this.init();
      return;
    }

    this.ss
      .load(this.config.js)
      .then(res => {
        this.init();
      });
  }

  private init(options?: any) {
    if (!this.initFlag) return;

    if (this.instance) {
      this._destroy(false);
    }
    // 强制设置container为null，并使用 `id` 初始化
    this.instance = new window.F2.Chart(
      Object.assign({}, this.options, {
        el: this.canvas.nativeElement,
        container: null,
      }),
    );
    this.ready.emit(this.instance);
  }

  private _destroy(needNotify: boolean = false) {
    if (this.instance) {
      this.instance.destroy();
      this.instance = null;
    }
    if (needNotify) this.destroy.emit();
  }

  /**
   * 获取Chart实例
   *
   * @readonly
   */
  get Instance(): any {
    return this.instance;
  }

  ngOnDestroy() {
    this._destroy(true);
  }
}
