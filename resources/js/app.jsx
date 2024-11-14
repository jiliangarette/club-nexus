import "./bootstrap";
import "../css/app.css";
import "../css/global.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { EventBusProvider } from "./EventBus";
import { TooltipProvider } from "./Components/ui/tooltip";
import ConsoleInfo from "./console-info";

const appName = import.meta.env.VITE_APP_NAME || "Nexus";

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) =>
    resolvePageComponent(
      `./Pages/${name}.jsx`,
      import.meta.glob("./Pages/**/*.jsx")
    ),
  setup({ el, App, props }) {
    const root = createRoot(el);

    root.render(
      <EventBusProvider>
        <TooltipProvider>
          <App {...props} />
          <ConsoleInfo />
        </TooltipProvider>
      </EventBusProvider>
    );
  },
  progress: {
    color: "#4B5563",
  },
});
