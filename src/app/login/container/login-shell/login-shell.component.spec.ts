import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginShellComponent } from './login-shell.component';

describe('LoginShellComponent', () => {
  let component: LoginShellComponent;
  let fixture: ComponentFixture<LoginShellComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginShellComponent]
    });
    fixture = TestBed.createComponent(LoginShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
