import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetBlueprintsComponent } from './get-blueprints.component';

describe('GetBlueprintsComponent', () => {
  let component: GetBlueprintsComponent;
  let fixture: ComponentFixture<GetBlueprintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetBlueprintsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetBlueprintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
