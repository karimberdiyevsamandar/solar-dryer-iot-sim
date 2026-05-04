import { BaseComponent } from './BaseComponent.js';

export class AHT10 extends BaseComponent {
  constructor(props) {
    super({
      ...props,
      type: 'aht10',
      label: 'AHT10 Sensor',
      width: 120,
      height: 64,
      terminals: [{ name: 'i2c', dx: 60, dy: 0 }],
    });
    this.state = { temperatureC: 32, humidityPct: 58 };
    this._phase = 0;
  }

  sample(deltaS) {
    this._phase += deltaS * 0.55;
    this.state.temperatureC = 35 + Math.sin(this._phase) * 3;
    this.state.humidityPct = 55 + Math.cos(this._phase * 0.7) * 10;
    return this.state;
  }
}
