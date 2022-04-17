import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
  } from '@nestjs/common';
  
  import { DevicesService } from './devices.service';
  
  @Controller('devices')
  export class DevicesController {
    constructor(private readonly devicesService: DevicesService) {}
  
    @Post()
    addDevice(
      @Body('deviceid') devId: string,
      @Body('feature') devFeature: Record<string, any>,
    ) {
      const deviceId = this.devicesService.insertDevice(
        devId,
        devFeature,
      );
      return { id: devId };
    }
  
    @Get()
    getAllDevices() {
      return this.devicesService.getDevices();
    }
  
    @Get(':id')
    getDevice(@Param('id') devId: string) {
        return this.devicesService.getSingleDevice(devId);
    }
  
    @Patch(':id')
    updateDevice(
      @Param('id') devId: string,
      @Body('feature') devFeature: Record<string, any>,
    ) {
      this.devicesService.updateDevice(devId, devFeature);
      return null;
    }
  
    @Delete(':id')
    removeDevice(@Param('id') devId: string) {
        this.devicesService.deleteDevice(devId);
        return null;
    }
  }