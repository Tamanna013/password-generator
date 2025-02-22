import * as React from "react";
import * as Switch from "@radix-ui/react-switch";

const Toggle = React.forwardRef<
  React.ElementRef<typeof Switch.Root>,
  React.ComponentPropsWithoutRef<typeof Switch.Root>
>(({ className, ...props }, ref) => (
  <Switch.Root
    ref={ref}
    className={`relative inline-flex h-6 w-12 shrink-0 cursor-pointer items-center rounded-full border border-gray-700 bg-gray-900 transition-all data-[state=checked]:bg-pink-500`}
    {...props}
  >
    <Switch.Thumb className="block h-5 w-5 translate-x-0 rounded-full bg-white transition-transform data-[state=checked]:translate-x-6" />
  </Switch.Root>
));

Toggle.displayName = Switch.Root.displayName;

export { Toggle };
