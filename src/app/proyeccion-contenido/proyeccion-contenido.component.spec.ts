import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyeccionContenidoComponent } from './proyeccion-contenido.component';

describe('ProyeccionContenidoComponent', () => {
  let component: ProyeccionContenidoComponent;
  let fixture: ComponentFixture<ProyeccionContenidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProyeccionContenidoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProyeccionContenidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
