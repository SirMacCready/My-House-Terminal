import { useState } from 'react';
import { Power } from 'lucide-react';

export function PowerButton() {
  const [isOn, setIsOn] = useState(true);

  return (
    <button
      className={`power-button ${isOn ? '' : 'active'}`}
      onClick={() => setIsOn(!isOn)}
      aria-label="Power toggle"
    >
      <Power size={20} />
    </button>
  );
}
