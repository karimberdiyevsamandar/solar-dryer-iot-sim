export class PowerModel {
  constructor() {
    this.state = {
      irradianceWm2: 820,
      panelPowerW: 0,
      controllerOutputW: 0,
      batterySoc: 62,
      batteryVoltage: 12.4,
      bmsOutputW: 0,
      loadDemandW: 220,
      loadServedW: 0,
    };
    this.t = 0;
  }

  step(deltaS, relayOn) {
    this.t += deltaS;
    const s = this.state;

    s.irradianceWm2 = 700 + Math.sin(this.t * 0.1) * 250;
    s.panelPowerW = Math.max(0, s.irradianceWm2 * 0.55);
    s.controllerOutputW = s.panelPowerW * 0.93;

    const availableW = s.controllerOutputW + (s.batterySoc > 20 ? 260 : 0);
    s.loadServedW = relayOn ? Math.min(s.loadDemandW, availableW) : 0;
    s.bmsOutputW = s.loadServedW;

    const netBatteryW = s.controllerOutputW - s.loadServedW;
    s.batterySoc = Math.max(0, Math.min(100, s.batterySoc + (netBatteryW / 14000) * deltaS * 100));
    s.batteryVoltage = 11.4 + (s.batterySoc / 100) * 1.4;

    return s;
  }
}
