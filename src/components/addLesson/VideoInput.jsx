import React from "react";

export default function VideoInput({ videoUrl, setVideoUrl }) {
  return (
    <div className="space-y-1">
      <label className="block font-semibold">Ссылка на YouTube</label>
      <input
        type="url"
        placeholder="https://youtube.com/..."
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        className="w-full p-2 border rounded"
      />
    </div>
  );
}
