import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "./components/ui/theme-provider.tsx";
import "./styles/index.css";
import "./styles/global.css";
import Pages from "./router.tsx";

const RenderThis = () => {
  return (
    <>
      <React.StrictMode>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <Pages />
        </ThemeProvider>
      </React.StrictMode>
    </>
  );
};

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement!);
root.render(<RenderThis />);
