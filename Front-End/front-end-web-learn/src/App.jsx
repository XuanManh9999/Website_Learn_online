import React, { useEffect } from "react";
import AppRoutes from "./routes";
import ScrollToTop from "./config/ScrollToTop";
function App() {
  return (
    <div className="scrollable-content">
      <AppRoutes />
    </div>
  );
}

export default App;
