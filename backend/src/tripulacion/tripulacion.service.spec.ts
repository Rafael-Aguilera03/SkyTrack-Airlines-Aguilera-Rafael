import { Test, TestingModule } from '@nestjs/testing';
import { TripulacionService } from './tripulacion.service';

describe('TripulacionService', () => {
  let service: TripulacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TripulacionService],
    }).compile();

    service = module.get<TripulacionService>(TripulacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
