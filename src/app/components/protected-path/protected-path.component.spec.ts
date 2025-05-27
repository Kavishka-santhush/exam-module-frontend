import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtectedPathComponent } from './protected-path.component';

describe('ProtectedPathComponent', () => {
  let component: ProtectedPathComponent;
  let fixture: ComponentFixture<ProtectedPathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProtectedPathComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProtectedPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
