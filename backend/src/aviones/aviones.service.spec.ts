import { Test, TestingModule } from '@nestjs/testing';
import { AvionesService } from './aviones.service';

describe('AvionesService', () => {
  let service: AvionesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AvionesService],
    }).compile();

    service = module.get<AvionesService>(AvionesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
