import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F2ChartModule } from '../ngx-f2.module';

const html = ``;

describe('Component: ngx-f2', () => {
  let fixture: ComponentFixture<any>;
  let context: TestNGComponent;
  let element: any;
  let clean: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestNGComponent],
      imports: [F2ChartModule],
    });
    TestBed.overrideComponent(TestNGComponent, { set: { template: html } });
    fixture = TestBed.createComponent(TestNGComponent);
    context = fixture.componentInstance;
    element = fixture.nativeElement.querySelector('#c1');
    clean = fixture.nativeElement.querySelector('#c2');
    fixture.detectChanges();
  });

  it('fixture should not be null', () => {
    expect(fixture).not.toBeNull();
  });
});

@Component({
  selector: 'app-ngx-f2-test',
  template: '',
})
class TestNGComponent {}
