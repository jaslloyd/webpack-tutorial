import React from "react";
import "./index.css";
import "./app.css";

const App = () => {
  const welcomeMessage: string = "Hello from React, Webpack and Typescript...";

  return (
    <div>
      <h1>{welcomeMessage}</h1>
    </div>
  );
};
export default App;
