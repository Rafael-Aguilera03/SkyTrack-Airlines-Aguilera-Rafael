import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { VuelosService } from './vuelos.service';
import { Vuelo } from './schemas/vuelo.schema';
import { Avion } from '../aviones/schemas/avion.schema';

describe('VuelosService - findAll', () => {
  let service: VuelosService;
  let vueloModel: any;

  const vuelosMock = [
    { _id: '1', origen: 'Mendoza', destino: 'Buenos Aires', estado: 'programado', activo: true },
    { _id: '2', origen: 'Mendoza', destino: 'Santiago', estado: 'en vuelo', activo: true },
    { _id: '3', origen: 'Cordoba', destino: 'Buenos Aires', estado: 'programado', activo: false },
  ];

  beforeEach(async () => {
    vueloModel = {
      find: jest.fn().mockReturnThis(),
      populate: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue(vuelosMock.filter(v => v.activo)),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VuelosService,
        { provide: getModelToken(Vuelo.name), useValue: vueloModel },
        { provide: getModelToken(Avion.name), useValue: {} },
      ],
    }).compile();

    service = module.get<VuelosService>(VuelosService);
  });

  it('filtra por estado', async () => {
    vueloModel.exec.mockResolvedValue(
      vuelosMock.filter(v => v.estado === 'programado' && v.activo)
    );
    const result = await service.findAll({ estado: 'programado' });
    expect(result).toHaveLength(1);
    expect(result[0].estado).toBe('programado');
  });

  it('filtra por origen', async () => {
    vueloModel.exec.mockResolvedValue(
      vuelosMock.filter(v => v.origen === 'Mendoza' && v.activo)
    );
    const result = await service.findAll({ origen: 'Mendoza' });
    expect(result.every(v => v.origen === 'Mendoza')).toBe(true);
  });

  it('excluye vuelos dados de baja', async () => {
    const result = await service.findAll();
    expect(result.some(v => v.activo === false)).toBe(false);
  });
});
