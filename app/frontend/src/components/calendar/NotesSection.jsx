import { BookOpen } from "lucide-react";

export function NotesSection({ notes, onNotesChange, monthName }) {
  return (
    <div className="notes-section" data-testid="notes-section">
      <div className="notes-header">
        <BookOpen size={16} className="notes-icon" />
        <span className="notes-title">Notes - {monthName}</span>
      </div>
      <div className="notes-body">
        <textarea
          className="notes-textarea"
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          placeholder={`Jot down notes for ${monthName}...`}
          data-testid="notes-textarea"
          rows={5}
        />
        <div className="notes-lines">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="notes-line" />
          ))}
        </div>
      </div>
    </div>
  );
}
