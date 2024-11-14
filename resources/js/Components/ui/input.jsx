import * as React from "react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef(
  ({ className, type = "text", isFocused = false, ...rest }, ref) => {
    const internalRef = ref || useRef();

    useEffect(() => {
      if (isFocused && internalRef.current) {
        internalRef.current.focus();
      }
    }, [isFocused]);

    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={internalRef}
        {...rest}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
