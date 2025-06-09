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
  hasRestroom,
  setHasRestroom,
  hasElevator,
  setHasElevator,
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
        <div className="checkbox-options">
          <label>
            <input type="checkbox" checked={hasRestroom} onChange={(e) => setHasRestroom(e.target.checked)} />
            화장실
          </label>
          <label>
            <input type="checkbox" checked={hasElevator} onChange={(e) => setHasElevator(e.target.checked)} />
            엘리베이터
          </label>
        </div>

        <div className="action-buttons">
          <div className="checkbox-options">
            <label>
              <input type="checkbox" checked={hasRestroom} onChange={(e) => setHasRestroom(e.target.checked)} />
              화장실
            </label>
            <label>
              <input type="checkbox" checked={hasElevator} onChange={(e) => setHasElevator(e.target.checked)} />
              엘리베이터
            </label>
          </div>

          <button onClick={handleReset} className="reset-button">
            다시입력
          </button>
          <button onClick={onFindRoute} className="find-route-button">
            길찾기
          </button>
        </div>
      </div>

      <div className="route-options-toggle">
        <button className={routePreference === "overall" ? "active" : ""} onClick={() => setRoutePreference("overall")}>
          <strong>종합 만족도 순</strong>
          <span>전반적 만족도 고려, 최적 경로 추천</span>
        </button>
        <button className={routePreference === "stability" ? "active" : ""} onClick={() => setRoutePreference("stability")}>
          <strong>안정성 순</strong>
          <span>정시성 높은 경로 추천</span>
        </button>
        <button className={routePreference === "least_time" ? "active" : ""} onClick={() => setRoutePreference("least_time")}>
          <strong>최소 시간 순</strong>
          <span>최소 이동 시간 경로 추천</span>
        </button>
        <button
          className={routePreference === "transfer_convenience" ? "active" : ""}
          onClick={() => setRoutePreference("transfer_convenience")}
        >
          <strong>환승 편의성 순</strong>
          <span>편한 환승 경로 추천</span>
        </button>
        <button className={routePreference === "least_congestion" ? "active" : ""} onClick={() => setRoutePreference("least_congestion")}>
          <strong>최소 혼잡도 순</strong>
          <span>열차 내 최소 혼잡 경로 추천</span>
        </button>
        <button className={routePreference === "comfort" ? "active" : ""} onClick={() => setRoutePreference("comfort")}>
          <strong>쾌적도 순</strong>
          <span>날씨 반영, 쾌적, 청결도 높은 경로</span>
        </button>
      </div>
    </header>
  );
}

export default Header;
