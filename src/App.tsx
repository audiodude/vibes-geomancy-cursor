import PatternCanvas from './components/PatternCanvas';
import ControlsPanel from './components/ControlsPanel';

function App() {
  return (
    <div className="flex w-full h-screen bg-black">
      <div className="flex-grow flex-shrink flex-basis-0 relative">
        <PatternCanvas />
      </div>
      <div className="w-80 border-l border-white/10">
        <ControlsPanel />
      </div>
    </div>
  );
}

export default App;
