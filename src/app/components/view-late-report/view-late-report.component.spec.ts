import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLateReportComponent } from './view-late-report.component';

describe('ViewLateReportComponent', () => {
  let component: ViewLateReportComponent;
  let fixture: ComponentFixture<ViewLateReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewLateReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewLateReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
