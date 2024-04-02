import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGenresComponent } from './user-genres.component';

describe('UserGenresComponent', () => {
  let component: UserGenresComponent;
  let fixture: ComponentFixture<UserGenresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserGenresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserGenresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
