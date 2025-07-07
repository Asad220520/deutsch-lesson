import React from "react";

export default function NotesInput({ notes, setNotes }) {
  return (
    <div className="space-y-1">
      <label className="block font-semibold">Примечания (необязательно)</label>
      <textarea
        placeholder="Комментарии, важные фразы и т.д."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="w-full p-2 border rounded min-h-[100px]"
      />
    </div>
  );
}
