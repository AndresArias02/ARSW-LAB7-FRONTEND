import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBlueprintComponent } from './create-blueprint.component';

describe('CreateBlueprintComponent', () => {
  let component: CreateBlueprintComponent;
  let fixture: ComponentFixture<CreateBlueprintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateBlueprintComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateBlueprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
