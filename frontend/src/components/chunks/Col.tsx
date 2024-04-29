import * as React from "react";

import { cn } from "@/lib/utils";


const Col = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col place-items-center justify-center", className)}
    {...props}
  />
));
export default Col;
