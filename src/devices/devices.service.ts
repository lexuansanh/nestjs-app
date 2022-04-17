import { Injectable, NotFoundException } from '@nestjs/common';

import { Device } from './devices.model';

@Injectable()
export class DevicesService {
  private devices: Device[] = [];

  insertDevice(deviceid: string, feature: Record<string, any>) {
    const newdevice = new Device(deviceid, feature);
    this.devices.push(newdevice);
    console.log(newdevice)
    return deviceid;
  }

  getDevices() {
    return [...this.devices];
  }

  getSingleDevice(deviceid: string) {
    const device = this.findDevice(deviceid)[0];
    return { ...device };
  }

  updateDevice(deviceid: string, feature: Record<string, any>) {
    const [device, index] = this.findDevice(deviceid);
    const updatedDevice = { ...device };
    if (feature) {
      updatedDevice.feature = feature;
    }
    this.devices[index] = updatedDevice;
  }

  deleteDevice(deviceId: string) {
      const index = this.findDevice(deviceId)[1];
      this.devices.splice(index, 1);
  }

  private findDevice(deviceid: string): [Device, number] {
    const deviceIndex = this.devices.findIndex(dev => dev.deviceid === deviceid);
    const device = this.devices[deviceIndex];
    if (!device) {
      throw new NotFoundException('Could not find device.');
    }
    return [device, deviceIndex];
  }
}