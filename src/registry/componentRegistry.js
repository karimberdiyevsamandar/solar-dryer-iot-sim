import { SolarPanel, ChargeController, Battery, BMS, Load } from '../components/genericComponents.js';
import { ESP32 } from '../components/ESP32.js';
import { AHT10 } from '../components/AHT10.js';

export function createDefaultComponents() {
  return [
    new SolarPanel({ id: 'solar-1', x: 80, y: 120 }),
    new ChargeController({ id: 'cc-1', x: 300, y: 120 }),
    new Battery({ id: 'bat-1', x: 520, y: 120 }),
    new BMS({ id: 'bms-1', x: 740, y: 120 }),
    new Load({ id: 'load-1', x: 960, y: 120 }),
    new ESP32({ id: 'esp-1', x: 560, y: 340 }),
    new AHT10({ id: 'aht-1', x: 360, y: 360 }),
  ];
}
