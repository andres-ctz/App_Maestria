import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service.js';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get('live')
  live(): { status: 'ok'; service: string; timestamp: string } {
    return this.healthService.live();
  }

  @Get('ready')
  ready(): Promise<{ status: 'ok'; checks: { database: 'ok' } }> {
    return this.healthService.ready();
  }
}
