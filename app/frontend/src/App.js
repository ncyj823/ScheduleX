import "@/App.css";
import { WallCalendar } from "@/components/calendar/WallCalendar";

function App() {
  return (
    <div className="app-container" data-testid="app-container">
      <WallCalendar />
    </div>
  );
}

export default App;
