export class Device {
    constructor(
      public deviceid: string,
      public feature: Record< string, any>,
    ) {}
  }