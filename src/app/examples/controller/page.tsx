"use client";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import ReactHookFormDevTool from "@/provider/ReactHookFormDevTool";
import { Input } from "./components/Input";

export default function Demo() {
  const {
    handleSubmit,
    formState: { isValid, errors },
    control,
  } = useForm<FormInputs>();

  const submitHandler: SubmitHandler<FormInputs> = (data) => console.log(data);

  return (
    <>
      <h1>{isValid ? "✅ Valid" : "❌ Not Valid"}</h1>
      <form onSubmit={handleSubmit(submitHandler)}>
        {/* <Controller
          name="example"
          control={control}
          rules={{ required: "답변을 작성해주세요!" }}
          render={({ field }) => <Input {...field} />}
        /> */}
        <Input
          name="example"
          control={control}
          rules={{ required: "답변을 작성해주세요!" }}
        />
        {errors.example && <p role="alert">{errors.example.message}</p>}
        <button>Submit</button>
      </form>
      <ReactHookFormDevTool control={control} />
    </>
  );
}
