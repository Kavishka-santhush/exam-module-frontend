import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStructureComponent } from './edit-structure.component';

describe('EditStructureComponent', () => {
  let component: EditStructureComponent;
  let fixture: ComponentFixture<EditStructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditStructureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
