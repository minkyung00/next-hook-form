"use client";

import { DevTool } from "@hookform/devtools";
import { DevtoolUIProps } from "@hookform/devtools/dist/devToolUI";

export default function ReactHookFormDevTool({ control }: DevtoolUIProps) {
  return <DevTool control={control} placement="top-right" />;
}
