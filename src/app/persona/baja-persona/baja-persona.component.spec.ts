import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BajaPersonaComponent } from './baja-persona.component';

describe('BajaPersonaComponent', () => {
  let component: BajaPersonaComponent;
  let fixture: ComponentFixture<BajaPersonaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BajaPersonaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BajaPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
