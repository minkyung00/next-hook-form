import { ControllerRenderProps } from "react-hook-form";

export function Input({ ...props }: ControllerRenderProps) {
  return <input type="text" placeholder="" {...props} />;
}
