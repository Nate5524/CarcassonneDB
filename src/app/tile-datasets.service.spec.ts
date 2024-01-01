import { TestBed } from '@angular/core/testing';

import { TileDatasetsService } from './tile-datasets.service';

describe('TileDatasetsService', () => {
  let service: TileDatasetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TileDatasetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
