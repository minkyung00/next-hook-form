import { forwardRef } from "react";
import { UseFormRegister } from "react-hook-form";

export const Input = forwardRef<
  HTMLInputElement,
  ReturnType<UseFormRegister<FormInputs>>
>((registerReturnProps, ref) => {
  return (
    <input
      type="text"
      placeholder="Example Input"
      {...registerReturnProps}
      ref={ref}
    />
  );
});

Input.displayName = "Input";
