import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtectedResourceComponent } from './protected-resource.component';

describe('ProtectedResourceComponent', () => {
  let component: ProtectedResourceComponent;
  let fixture: ComponentFixture<ProtectedResourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProtectedResourceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProtectedResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
