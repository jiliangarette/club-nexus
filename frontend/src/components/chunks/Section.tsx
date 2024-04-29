import * as React from "react";

import { cn } from "@/lib/utils";


const Section = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("border border-red-600", className)}
    {...props}
  />
));
export default Section;
