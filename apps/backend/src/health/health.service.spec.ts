import { ServiceUnavailableException } from '@nestjs/common';
import { HealthService } from './health.service.js';
import type { PrismaService } from '../prisma/prisma.service.js';

describe('HealthService', () => {
  const queryRawMock = import.meta.jest.fn();
  const prismaMock = {
    $queryRaw: queryRawMock,
  } as unknown as PrismaService;

  let service: HealthService;

  beforeEach(() => {
    import.meta.jest.clearAllMocks();
    service = new HealthService(prismaMock);
  });

  it('reports liveness without querying the database', () => {
    const result = service.live();

    expect(result.status).toBe('ok');
    expect(result.service).toBe('app-maestria-backend');
    expect(result.timestamp).toBeTruthy();
    expect(queryRawMock).not.toHaveBeenCalled();
  });

  it('reports readiness when PostgreSQL responds', async () => {
    queryRawMock.mockResolvedValueOnce([{ '?column?': 1 }]);

    await expect(service.ready()).resolves.toEqual({
      status: 'ok',
      checks: { database: 'ok' },
    });
  });

  it('returns 503 when PostgreSQL is unavailable', async () => {
    queryRawMock.mockRejectedValueOnce(new Error('database unavailable'));

    await expect(service.ready()).rejects.toBeInstanceOf(ServiceUnavailableException);
  });
});
