import { TestBed } from '@angular/core/testing';

import { EstadoPersonaService } from './estado-persona.service';

describe('EstadoPersonaService', () => {
  let service: EstadoPersonaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadoPersonaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
