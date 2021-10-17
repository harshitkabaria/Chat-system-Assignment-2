import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdduserComponent } from './adduser.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AdduserComponent', () => {
  let component: AdduserComponent;
  let fixture: ComponentFixture<AdduserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      
      imports: [RouterTestingModule],
      declarations: [ AdduserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdduserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
