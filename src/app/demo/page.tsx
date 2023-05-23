"use client";

import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

import ReactHookFormDevTool from "@/provider/ReactHookFormDevTool";
import FormCard from "./components/FormCard";
import { QUESTIONS } from "./constants/questions";
import { QUESTION_TEXTAREA_ERROR_MESSAGE } from "./constants/formErrorMessage";

type Inputs = {
  background: string;
  problem: string;
  behavior: string;
  result: string;
};

export default function QuestionForm() {
  const methods = useForm<Inputs>();
  const { handleSubmit, control } = methods;
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {QUESTIONS.map((question) => (
          <Controller
            key={question.id}
            name={question.id}
            control={control}
            rules={{ required: QUESTION_TEXTAREA_ERROR_MESSAGE }}
            render={({ field }) => (
              <FormCard key={question.id} {...question} {...field} />
            )}
          />
        ))}
        <button>제출</button>
      </form>
      <ReactHookFormDevTool control={control} />
    </FormProvider>
  );
}
