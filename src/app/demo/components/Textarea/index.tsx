import { FieldError, ControllerRenderProps } from "react-hook-form";

type TextareaProps = Component<"textarea"> & {
  error?: FieldError;
} & ControllerRenderProps;

export default function Textarea({ error, ...props }: TextareaProps) {
  return (
    <>
      <textarea
        {...props}
        className="p-4 border-[1px] rounded-2xl border-[#E1E1E8] text-base text-[#E1E1E8] resize-none hover:border-[#A9ABB8] hover:text-[#A9ABB8] focus:border-[#858899] focus:text-[#858899] invalid:border-[#FF3C45]"
        aria-invalid={!!error}
      />
      {error && (
        <p role="alert" className="my-2 text-xs text-[#FF3C45]">
          에러:{error?.message}
        </p>
      )}
    </>
  );
}
