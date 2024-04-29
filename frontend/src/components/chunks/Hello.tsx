import { cn } from "@/lib/utils";
import * as React from "react";

const Hello = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col place-items-center justify-center h-screen w-screen font-dahlia text-7xl bg-primary text-secondary",
      className
    )}
    {...props}
  />
));
export default Hello;
