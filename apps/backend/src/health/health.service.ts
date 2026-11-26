import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class HealthService {
  constructor(private readonly prisma: PrismaService) {}

  live(): { status: 'ok'; service: string; timestamp: string } {
    return {
      status: 'ok',
      service: 'app-maestria-backend',
      timestamp: new Date().toISOString(),
    };
  }

  async ready(): Promise<{ status: 'ok'; checks: { database: 'ok' } }> {
    try {
      await this.prisma.$queryRaw\`SELECT 1\`;
      return { status: 'ok', checks: { database: 'ok' } };
    } catch {
      // No exponer cadenas de conexión ni detalles internos al consumidor de la API.
      throw new ServiceUnavailableException({
        status: 'error',
        checks: { database: 'unavailable' },
      });
    }
  }
}
