import { useState } from 'react';

interface Device {
  id: string;
  name: string;
  status: boolean;
}

export function DeviceWidget() {
  const [devices, setDevices] = useState<Device[]>([
    { id: '1', name: 'LIVING ROOM LIGHTS', status: true },
    { id: '2', name: 'THERMOSTAT', status: true },
    { id: '3', name: 'SECURITY SYSTEM', status: true },
    { id: '4', name: 'GARAGE DOOR', status: false },
    { id: '5', name: 'FRONT DOOR LOCK', status: true },
    { id: '6', name: 'BEDROOM FAN', status: false },
  ]);

  const toggleDevice = (id: string) => {
    setDevices(devices.map(device =>
      device.id === id ? { ...device, status: !device.status } : device
    ));
  };

  return (
    <div className="widget-border p-4 h-full flex flex-col">
      <h2 className="terminal-header text-xl mb-4">
        DEVICE_CONTROLS<span className="cursor-blink">_</span>
      </h2>

      <div className="space-y-3 flex-1 overflow-y-auto terminal-scrollbar">
        {devices.map((device) => (
          <div key={device.id} className="flex items-center justify-between">
            <div className="terminal-text text-sm flex-1">
              💡 {device.name}
            </div>
            <button
              onClick={() => toggleDevice(device.id)}
              className={`font-mono text-xs px-2 py-1 ${
                device.status ? 'toggle-on' : 'toggle-off'
              }`}
            >
              [{device.status ? '▰▰▰▰' : '    '}] {device.status ? 'ON' : 'OFF'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
