import {
  ControllerRenderProps,
  UseControllerProps,
  useController,
} from "react-hook-form";

/**
 * Controller의 render props로 들어가는 Input
 * @param props register가 반환하는 값들
 */
// export function Input({ ...props }: ControllerRenderProps) {
//   return <input type="text" placeholder="" {...props} />;
// }

/**
 * useController 훅을 사용한 Input 컴포넌트
 * @param props name, control, required 등 controller의 props
 */
export function Input(props: UseControllerProps<FormInputs>) {
  const { field } = useController(props);

  return (
    <input type="text" placeholder="" {...field} value={field.value || ""} />
  );
}
