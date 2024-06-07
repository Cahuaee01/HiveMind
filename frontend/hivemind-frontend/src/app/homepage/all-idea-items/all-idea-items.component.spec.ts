import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllIdeaItemsComponent } from './all-idea-items.component';

describe('AllIdeaItemsComponent', () => {
  let component: AllIdeaItemsComponent;
  let fixture: ComponentFixture<AllIdeaItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllIdeaItemsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllIdeaItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
