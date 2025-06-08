// Replace everything in Header.js with this code

import React from "react";
import "../App.css"; // For shared styles

function Header({
  startPoint,
  setStartPoint,
  destinationPoint,
  setDestinationPoint,
  onFindRoute,
  onReverse,
  routePreference,
  setRoutePreference,
}) {
  const handleReset = () => {
    setStartPoint("");
    setDestinationPoint("");
  };

  return (
    <header className="top-section">
      <div className="main-controls">
        <div className="input-fields">
          <div className="input-group">
            <span className="icon start-icon">●</span>
            <input type="text" placeholder="출발지" value={startPoint} onChange={(e) => setStartPoint(e.target.value)} />
          </div>
          <div className="input-group">
            <span className="icon dest-icon">●</span>
            <input type="text" placeholder="도착지" value={destinationPoint} onChange={(e) => setDestinationPoint(e.target.value)} />
          </div>
        </div>
        <button onClick={onReverse} className="swap-button" title="Swap start and destination">
          ↑↓
        </button>
        <div className="action-buttons">
          <button onClick={handleReset} className="reset-button">
            다시입력
          </button>
          <button onClick={onFindRoute} className="find-route-button">
            길찾기
          </button>
        </div>
      </div>

      <div className="route-options-toggle">
        <button className={routePreference === "comfort" ? "active" : ""} onClick={() => setRoutePreference("comfort")}>
          <strong>쾌적도 순</strong>
          <span>혼잡도, 공기 질 등</span>
        </button>
        <button className={routePreference === "stability" ? "active" : ""} onClick={() => setRoutePreference("stability")}>
          <strong>안정성 순</strong>
          <span>사고 횟수, 연착률 등</span>
        </button>
        <button className={routePreference === "convenience" ? "active" : ""} onClick={() => setRoutePreference("convenience")}>
          <strong>이동 편의성 순</strong>
          <span>편의 시설 이용 경로</span>
        </button>
        <button className={routePreference === "overall" ? "active" : ""} onClick={() => setRoutePreference("overall")}>
          <strong>종합 만족도 순</strong>
          <span>모두 고려한 최적 경로</span>
        </button>
      </div>
    </header>
  );
}

export default Header;
