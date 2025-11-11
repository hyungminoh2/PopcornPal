/* eslint-disable react/prop-types */
export default function WatchedButton({ onToggle, isActive, watched }) {
  return (
    <button
      className="btn-watched"
      onClick={onToggle}
      style={{ backgroundColor: isActive ? "#5b39c6" : "#6741d9" }}
    >
      {isActive
        ? "🔍 Back to Search"
        : `🎬 ${watched.length > 0 ? watched.length : ""} Watched`}
    </button>
  );
}
