import { useFormContext, ControllerRenderProps } from "react-hook-form";

import Textarea from "../Textarea";

export default function FormCard({
  id,
  title,
  description,
  chipText,
  placeholder,
  required,
  maxLength,
  ...controllerRenderProps
}: FormCard & ControllerRenderProps) {
  const { getFieldState } = useFormContext();
  const { error } = getFieldState(id);

  return (
    <section className="p-8 border-2">
      <h2>{title}</h2>
      <p>{description}</p>
      <p>{chipText}</p>
      <Textarea
        error={error}
        placeholder={placeholder}
        {...controllerRenderProps}
      />
      <p>{maxLength}</p>
    </section>
  );
}
