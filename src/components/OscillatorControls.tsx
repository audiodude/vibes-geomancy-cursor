import { usePatternStore } from '../store/patternStore';
import type { PatternParameters, Oscillator } from '../store/patternStore';

const OscillatorControls = () => {
  const { oscillators, addOscillator, updateOscillator, removeOscillator } =
    usePatternStore();

  const parameterOptions = [
    { value: 'rotation', label: 'Rotation' },
    { value: 'position', label: 'Position' },
    { value: 'scale', label: 'Scale' },
    { value: 'opacity', label: 'Opacity' },
    { value: 'size', label: 'Size' },
    { value: 'noise', label: 'Noise' },
  ] as const;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-white">Oscillators</h3>
        <button
          onClick={() =>
            addOscillator({
              name: `Oscillator ${oscillators.length + 1}`,
              targetParameter: 'rotation',
              frequency: 1,
              amplitude: 0.5,
              enabled: true,
            })
          }
          className="px-2 py-1 text-sm bg-white/20 hover:bg-white/30 text-white rounded"
        >
          Add Oscillator
        </button>
      </div>

      <div className="space-y-3">
        {oscillators.map((oscillator: Oscillator) => (
          <div
            key={oscillator.id}
            className={`p-3 rounded border transition-colors ${
              oscillator.enabled
                ? 'bg-white/5 border-white/10'
                : 'bg-white/5 border-white/5 opacity-50'
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <input
                type="checkbox"
                checked={oscillator.enabled}
                onChange={(e) =>
                  updateOscillator(oscillator.id, { enabled: e.target.checked })
                }
                className="rounded bg-white/10"
              />
              <input
                type="text"
                value={oscillator.name}
                onChange={(e) =>
                  updateOscillator(oscillator.id, { name: e.target.value })
                }
                className={`flex-1 bg-white/10 text-white px-2 py-1 rounded w-32 ${
                  !oscillator.enabled
                    ? 'opacity-75 cursor-not-allowed'
                    : 'cursor-text'
                }`}
                disabled={!oscillator.enabled}
              />
              <button
                onClick={() => removeOscillator(oscillator.id)}
                className="text-white/60 hover:text-white"
              >
                ×
              </button>
            </div>

            <div className={`space-y-2 ${!oscillator.enabled && 'opacity-75'}`}>
              <div>
                <select
                  value={oscillator.targetParameter}
                  onChange={(e) =>
                    updateOscillator(oscillator.id, {
                      targetParameter: e.target
                        .value as keyof PatternParameters,
                    })
                  }
                  className={`w-full bg-white/10 text-white rounded px-2 py-1 ${
                    !oscillator.enabled
                      ? 'cursor-not-allowed'
                      : 'cursor-pointer'
                  }`}
                  disabled={!oscillator.enabled}
                >
                  {parameterOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-white/60 w-8">freq</span>
                <input
                  type="range"
                  value={oscillator.frequency}
                  min={0.1}
                  max={10}
                  step={0.1}
                  onChange={(e) =>
                    updateOscillator(oscillator.id, {
                      frequency: Number(e.target.value),
                    })
                  }
                  className={`flex-1 [&:disabled]:cursor-default ${
                    !oscillator.enabled ? 'cursor-default' : 'cursor-pointer'
                  }`}
                  disabled={!oscillator.enabled}
                />
                <span className="text-sm text-white/60 w-16">
                  {oscillator.frequency.toFixed(1)} Hz
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-white/60 w-8">amp</span>
                <input
                  type="range"
                  value={oscillator.amplitude}
                  min={0}
                  max={1}
                  step={0.1}
                  onChange={(e) =>
                    updateOscillator(oscillator.id, {
                      amplitude: Number(e.target.value),
                    })
                  }
                  className={`flex-1 [&:disabled]:cursor-default ${
                    !oscillator.enabled ? 'cursor-default' : 'cursor-pointer'
                  }`}
                  disabled={!oscillator.enabled}
                />
                <span className="text-sm text-white/60 w-12">
                  {oscillator.amplitude.toFixed(1)}
                </span>
              </div>
            </div>
          </div>
        ))}

        {oscillators.length === 0 && (
          <div className="text-center py-4 text-white/40 text-sm">
            No oscillators added yet
          </div>
        )}
      </div>
    </div>
  );
};

export default OscillatorControls;
