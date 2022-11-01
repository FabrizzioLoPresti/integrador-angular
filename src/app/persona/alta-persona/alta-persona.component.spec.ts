import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaPersonaComponent } from './alta-persona.component';

describe('AltaPersonaComponent', () => {
  let component: AltaPersonaComponent;
  let fixture: ComponentFixture<AltaPersonaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaPersonaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltaPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
