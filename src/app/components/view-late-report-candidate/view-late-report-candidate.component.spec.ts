import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLateReportCandidateComponent } from './view-late-report-candidate.component';

describe('ViewLateReportCandidateComponent', () => {
  let component: ViewLateReportCandidateComponent;
  let fixture: ComponentFixture<ViewLateReportCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewLateReportCandidateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewLateReportCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
