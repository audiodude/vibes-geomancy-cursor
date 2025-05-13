import { motion } from 'framer-motion';
import { useState } from 'react';
import { usePatternStore } from '../store/patternStore';
import type { PatternParameters } from '../store/patternStore';
import OscillatorControls from './OscillatorControls';

type ControlType = 'select' | 'range' | 'color';

interface Control {
  label: string;
  type: ControlType;
  value: PatternParameters[keyof PatternParameters];
  min?: number;
  max?: number;
  step?: number;
  options?: string[];
  onChange: (value: PatternParameters[keyof PatternParameters]) => void;
}

const ControlsPanel = () => {
  const [activeTab, setActiveTab] = useState<'parameters' | 'oscillators'>(
    'parameters',
  );
  const {
    shape,
    size,
    rotation,
    scale,
    position,
    opacity,
    color,
    density,
    spacing,
    symmetry,
    noise,
    complexity,
    numShapes,
    setParameter,
    resetParameters,
  } = usePatternStore();

  const controls: Control[] = [
    {
      label: 'Shape',
      type: 'select',
      value: shape,
      options: ['circle', 'square', 'triangle', 'hexagon'],
      onChange: (value) =>
        setParameter('shape', value as PatternParameters['shape']),
    },
    {
      label: 'Size',
      type: 'range',
      value: size,
      min: 10,
      max: 200,
      onChange: (value) => setParameter('size', value as number),
    },
    {
      label: 'Rotation',
      type: 'range',
      value: rotation,
      min: 0,
      max: Math.PI * 2,
      step: 0.1,
      onChange: (value) => setParameter('rotation', value as number),
    },
    {
      label: 'Scale',
      type: 'range',
      value: scale,
      min: 0.1,
      max: 2,
      step: 0.1,
      onChange: (value) => setParameter('scale', value as number),
    },
    {
      label: 'Position',
      type: 'range',
      value: position,
      min: 0,
      max: Math.PI * 2,
      step: 0.1,
      onChange: (value) => setParameter('position', value as number),
    },
    {
      label: 'Opacity',
      type: 'range',
      value: opacity,
      min: 0,
      max: 1,
      step: 0.1,
      onChange: (value) => setParameter('opacity', value as number),
    },
    {
      label: 'Color',
      type: 'color',
      value: color,
      onChange: (value) => setParameter('color', value as string),
    },
    {
      label: 'Density',
      type: 'range',
      value: density,
      min: 1,
      max: 20,
      onChange: (value) => setParameter('density', value as number),
    },
    {
      label: 'Spacing',
      type: 'range',
      value: spacing,
      min: 5,
      max: 100,
      onChange: (value) => setParameter('spacing', value as number),
    },
    {
      label: 'Symmetry',
      type: 'range',
      value: symmetry,
      min: 1,
      max: 12,
      onChange: (value) => setParameter('symmetry', value as number),
    },
    {
      label: 'Noise',
      type: 'range',
      value: noise,
      min: 0,
      max: 1,
      step: 0.1,
      onChange: (value) => setParameter('noise', value as number),
    },
    {
      label: 'Complexity',
      type: 'range',
      value: complexity,
      min: 1,
      max: 10,
      onChange: (value) => setParameter('complexity', value as number),
    },
    {
      label: 'Number of Shapes',
      type: 'range',
      value: numShapes,
      min: 1,
      max: 60,
      onChange: (value) => setParameter('numShapes', value as number),
    },
  ];

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      className="h-full bg-white/5 p-6 overflow-y-auto"
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Controls</h2>
          <button
            onClick={resetParameters}
            className="px-3 py-1 text-sm bg-white/20 hover:bg-white/30 text-white rounded"
          >
            Reset
          </button>
        </div>

        <div className="flex space-x-2 border-b border-white/10">
          <button
            onClick={() => setActiveTab('parameters')}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'parameters'
                ? 'text-white border-b-2 border-white'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Parameters
          </button>
          <button
            onClick={() => setActiveTab('oscillators')}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'oscillators'
                ? 'text-white border-b-2 border-white'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Oscillators
          </button>
        </div>

        <div className="space-y-4">
          {activeTab === 'parameters' ? (
            controls.map((control) => (
              <div key={control.label} className="space-y-2">
                <label className="block text-sm font-medium text-white">
                  {control.label}
                </label>
                {control.type === 'select' ? (
                  <select
                    value={control.value as string}
                    onChange={(e) => control.onChange(e.target.value)}
                    className="w-full bg-white/10 text-white rounded px-3 py-2"
                  >
                    {control.options?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : control.type === 'color' ? (
                  <input
                    type="color"
                    value={control.value as string}
                    onChange={(e) => control.onChange(e.target.value)}
                    className="w-full h-10 bg-transparent"
                  />
                ) : (
                  <input
                    type="range"
                    value={control.value as number}
                    min={control.min}
                    max={control.max}
                    step={control.step || 1}
                    onChange={(e) => control.onChange(Number(e.target.value))}
                    className="w-full"
                  />
                )}
              </div>
            ))
          ) : (
            <OscillatorControls />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ControlsPanel;
