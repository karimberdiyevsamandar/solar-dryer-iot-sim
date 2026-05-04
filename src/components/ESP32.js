import { BaseComponent } from './BaseComponent.js';

export class ESP32 extends BaseComponent {
  constructor(props) {
    super({
      ...props,
      type: 'esp32',
      label: 'ESP32',
      width: 150,
      height: 84,
      terminals: [{ name: 'i2c', dx: 75, dy: 84 }],
    });
    this.state = { relayOn: false, lastDecision: 'idle' };
  }

  control(sensorData, powerState) {
    const shouldRun = powerState.batterySoc > 25 && sensorData.temperatureC < 65 && sensorData.humidityPct > 20;
    this.state.relayOn = shouldRun;
    this.state.lastDecision = shouldRun ? 'load_enabled' : 'load_disabled';
    return this.state;
  }
}
