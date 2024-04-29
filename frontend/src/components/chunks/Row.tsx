import * as React from "react";

import { cn } from "@/lib/utils";

const Row = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-row justify-center place-items-center", className)}
    {...props}
  />
));
export default Row;
