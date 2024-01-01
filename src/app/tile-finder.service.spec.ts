import { TestBed } from '@angular/core/testing';

import { TileFinderService } from './tile-finder.service';

describe('TileFinderService', () => {
  let service: TileFinderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TileFinderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
