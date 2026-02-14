import { Test, TestingModule } from '@nestjs/testing';
import { VuelosService } from './vuelos.service';

describe('VuelosService', () => {
  let service: VuelosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VuelosService],
    }).compile();

    service = module.get<VuelosService>(VuelosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
