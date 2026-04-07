export default function NotesSection({ monthLabel, value, onChange }) {
  return (
    <aside className="notes-panel">
      <h2>Notes for {monthLabel}</h2>
      <p>Monthly reminders, tasks, and ideas are saved automatically.</p>
      <textarea
        className="notes-textarea"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Write your notes for this month..."
      />
    </aside>
  );
}
