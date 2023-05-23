"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import ReactHookFormDevTool from "@/provider/ReactHookFormDevTool";
import { Input } from "./components/Input";

export default function Demo() {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    control,
  } = useForm<FormInputs>();

  const submitHandler: SubmitHandler<FormInputs> = (data) => console.log(data);

  return (
    <>
      <h1>{isValid ? "✅ Valid" : "❌ Not Valid"}</h1>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Input
          {...register("example", { required: "This is required field" })}
        />
        {errors.example && <p role="alert">{errors.example.message}</p>}
        <button>Submit</button>
      </form>
      <ReactHookFormDevTool control={control} />
    </>
  );
}
