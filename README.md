# React-Hook-Form

- 비제어 컴포넌트 방식으로 렌더링 이슈를 해결
- Provider 아래에서 props drilling 없이 데이터와 상태 사용 가능

<details>
  <summary>Performance?</summary>

- 프록시를 통해 상태를 구독한다.
  - 전체 form을 다시 렌더링하지 않고 개별 input을 구독하고 form 상태를 업데이트할 수 있다.
- 불필요한 연산 감소
- 재렌더링하는 컴포넌트 분리
  - `ref`에서 `register` 함수가 실행되기 때문에 input의 값이 변경될 때 리렌더링이 줄어든다.

</details>

<br />

## Example

```tsx
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  example: string;
  exampleRequired: string;
};

export default function App() {
  /* 1. useForm */
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    {/* 2. handleSubmit */}
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* 3. register */}
      <input {...register("exampleRequired", { required: true })} />
      {/* 4. error  */}
      {errors.exampleRequired && <span>This field is required</span>}
    </form>
  );
}
```

---

## register

- `name`, `onBlur`, `onChange`, `ref`를 반환한다.
  - 별도의 `value`나 `onChange` 메서드 없이 `register`에서 값을 관리한다.
  - 각 필드는 `name`을 unique하게 갖고 있어야한다.

```tsx
<input {...register("firstName")} />
```

<br />

### forwardRef

- `register`가 반환하는 값에 `ref`가 포함되어 있다.
- ref object를 전달하기 위해 컴포넌트를 `forwardRef`로 감싸준다.
- 컴포넌트의 `ref`를 `register`하고 input에 관련 props를 부여한다.

```tsx
// ref가 할당되지 않았기 때문에 제대로 동작하지 않는다
<Input {...register('test')}>
```

#### innerRef

```tsx
const firstName = register("firstName", { required: true });

<Input
  name={firstName.name}
  onChange={firstName.onChange}
  onBlur={firstName.onBlur}
  inputRef={firstName.ref} // inputRef가 아니라 다른 prop 이름으로 설정해도 가능
/>;
```

#### inputRef

```tsx
const Select = React.forwardRef<
  HTMLSelectElement,
  ReturnType<UseFormRegister<IFormValues>>
>(({ onChange, onBlur, name }, ref) => (
  <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
    <option value="20">20</option>
    <option value="30">30</option>
  </select>
));
```

<details>
  <summary>forwardRef 사용시 input의 값이 변하지 않는 이슈</summary>
  <h3>문제 상황</h3>

- 커스텀 input 컴포넌트를 이용해서 부모 컴포넌트에서 `register` 값을 props로 전달하였다.
- input의 validation으로 required를 설정해주어서 input의 값이 비어있는 경우 에러가 발생하도록 되어있다.
- 커스텀 input 컴포넌트에서 input의 값을 인식하지 못해 에러가 발생한다.
- 이미지 첨부

 <h3>원인</h3>

- input 요소에 `forwardRef`가 반환하는 `ref`를 전달해야한다.

```tsx
export const Input = forwardRef<
  HTMLInputElement,
  ReturnType<UseFormRegister<FormInputs>>
>((registerReturnProps, ref) => {
  return (
    <input
      type="text"
      placeholder="Example Input"
      ref={ref}
      {...registerReturnProps}
    />
  );
});

Input.displayName = "Input";
```

- `register`이 반환하는 `ref`가 `forwardRef`가 반환하는 `ref`을 덮어쓰게 된다.

참고로 register이 반환하는 name, onBlur, onChange를 모두 props로 전달해주어야한다.

```tsx
// 아래는 동작하지 않는 코드이다.
// ref만 전달하면 동작하지 않는다.

export const Input = forwardRef<
  HTMLInputElement,
  ReturnType<UseFormRegister<FormInputs>>
>((_, ref) => {
  return <input type="text" placeholder="Example Input" ref={ref} />;
});

Input.displayName = "Input";
```

 <h3>해결방법</h3>

```tsx
export const Input = forwardRef<
  HTMLInputElement,
  ReturnType<UseFormRegister<FormInputs>>
>(({ onChange, onBlur, name }, ref) => {
  return (
    <input
      type="text"
      placeholder="Example Input"
      name={name}
      onChange={onChange}
      onBlur={onBlur}
      ref={ref}
    />
  );
});
```

- 따라서, input 요소에 `registerReturnProps`를 먼저 작성한 후, ref를 전달하면 정상적으로 동작한다.
- 또는 `registerReturnProps`를 deconstruct하여 명시적으로 속성을 전달할 수 있다.
  - 위 코드와 같다.

</details>

<br />

### Controller

- RHF는 기본적은 비제어 컴포넌트와 native HTML input을 활용한다.

  - 유저가 입력한 값의 업데이트를 `setValue` 를 이용해 수동으로 진행해야한다.

  ```tsx
  <Input onTextChange={(value) => setValue('lastChange', value))} />
  ```

- 제어 컴포넌트를 위해 `useController`와 `Controller`를 사용할 수 있다.

- 컴포넌트가 input에 `ref`가 없으면, `Controller` 컴포넌트를 사용할 수 있다.

  - React-Select, AntD, MUI와 같이 외부 controlled 컴포넌트를 사용해야하는 경우
  - 이미 전달받은 ref를 자체적으로 사용하고 있는 컴포넌트인 경우
  - 제어방식으로 value를 관리하는 컴포넌트인 경우

- `Controller` 를 이용해서 컴포넌트를 감싸주면 `register`를 적용한 것처럼 form 요소를 제어할 수 있다.

```tsx
<Controller
  name="test"
  control={control}
  render={({
    field: { onChange, onBlur, value, name, ref },
    fieldState: { invalid, isTouched, isDirty, error },
    formState,
  }) => (
    <Input onBlur={onBlur} onChange={onChange} checked={value} inputRef={ref} />
  )}
/>
```

---

## Validation

- `register`의 두번째 인자로 validation 규칙을 적용할 수 있다.

```tsx
<input {...register("lastName", { pattern: /^[A-Za-z]+$/i })} />
```

- `required`, `min`, `max`, `minLength`, `maxLength`
- `pattern`: 정규식을 이용해서 검사
- `validate`: 커스텀 규칙을 적용

### 에러 처리하기

- RHF는 `errors` 객체를 제공해서 form 안에서 발생한 에러를 확인할 수 있다.
- 위에서 설정한 validation 규칙에 따라 `errors`가 설정된다.
- `errors`를 사용해서 유효성 검사를 진행할 수 있다.

```tsx
export default function App() {
  const {
    register,
    formState: { errors },
  } = useForm<IFormInputs>();

  return (
    <form>
      <input {...register("firstName", { required: true })} />
      {errors.firstName && "First name is required"}
    </form>
  );
}
```

### 에러메시지 보여주기

1. register

- validation rule object에 `message` 속성을 추가해서 `register`을 전달한다.

```tsx
<input {...register('test', { maxLength: { value: 2, message: "error message" } })} /
```

2. errors 객체

- `errors` 객체에서 옵셔널 체이닝을 사용해서 메세지를 보여준다

```tsx
errors.firstName?.message;
```

---

## API

### useForm

#### options

- mode: 폼 제출 전에 validation을 하는 방법
  - onSubmit(default), onChange, onBlur, onTouched, all
- revalidateMode: 폼 제출 후에 validation을 하는 방법

  - onChange(default), onBlur, onSubmit

- value: 폼 값을 업데이트할 반응형 값
- resetOptions: 새로운 값으로 업데이트 되면 폼 상태를 리셋할지에 대한 옵션
- criterialMode: 모든 validation 오류를 한 번에 하나씩 보여준다

### useFormContext

- 깊게 중첩된 구조에서 form context에 접근할 수 있다.
- 부모 컴포넌트를 `FormProvider`로 감싸고 자식 컴포넌트에서 `useFormContext`를 이용해서 context에 접근한다.

```tsx
export default function App() {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <form>
        <NestedInput />
      </form>
    </FormProvider>
  );
}

function NestedInput() {
  const { register } = useFormContext();
  return <input {...register("test")} />;
}
```

### useFormState

- 각 form 상태를 구독할 수 있고, 훅 레벨에 따라 재렌더링을 독립시킬 수 있다.
- 스코프: form 상태 구독에 따라

  - useFormState와 useForm은 서로 영향을 미치지 않는다.

- 크고 복잡한 form에서 재렌더링을 줄일 수 있다.
- 반환되는 formState는 프록시로 감싸져서 렌더링 성능을 향상시키고 특정 상태가 구독되지 않은 경우에는 추가적인 계산을 건너뛴다.
- 구독하기 위해서는 렌더링 전에 deconstruct를 하거나 값을 읽어야한다.

```tsx
export default function App() {
  const { register, handleSubmit, control } = useForm();
  const { dirtyFields } = useFormState({
    control,
  });

  return (
    <form>
      <input {...register("firstName")} placeholder="First Name" />
      {dirtyFields.firstName && <p>Field is dirty.</p>}
    </form>
  );
}
```

### useController

- Controller와 동일한 props와 메서드를 공유한다.
- 재사용 가능한 controlled input에 사용하면 유용하다.

```ts
const {
  field: { onChange, onBlur, value, name, ref },
  fieldState: { invalid, isTouched, isDirty, error },
  formState: { touchedFields, dirtyFields },
} = useController({
  name,
  control,
  rules: { required: true },
});
```

- field

  - onChange: formState를 업데이트한다. setValue나 다른 API를 사용해서 필드를 업데이트하면 안된다.
  - ref: input ref에 ref를 할당하면 폼에서 에러가 발생한 input에 포커스를 줄 수 있다.

- formState

  - isDirty: useForm에서 모든 input의 defaultValues를 제공해야한다. form이 dirty한지 비교하기 위해서 single source of truth를 가질 수 있다.

  ```ts
  const {
    formState: { isDirty, dirtyFields },
    setValue,
  } = useForm({ defaultValues: { test: "" } });

  // isDirty: true
  setValue("test", "change");

  // isDirty: false because there getValues() === defaultValues
  setValue("test", "");
  ```

  - dirtyFields
    - 사용자가 수정한 필드에 대한 객체를 반환한다.
    - isDirty와 마찬가지로 defaultValues를 설정해주어야한다.
    - 전체 폼이 아닌 필드레벨에서 dirty로 표시되기 때문에 전체 폼의 상태를 확인하기 위해서는 isDirty를 사용해야한다.
  - isLoading
    - async defaultValue에서만 사용할 수 있다.

```tsx
function Input({ control, name }) {
  const {
    field,
    fieldState: { invalid, isTouched, isDirty },
    formState: { touchedFields, dirtyFields },
  } = useController({
    name,
    control,
    rules: { required: true },
  });

  return (
    <TextField
      onChange={field.onChange} // form에 value 전송
      onBlur={field.onBlur} // focus되거나 blur되었을 때
      value={field.value} // 현재 input 값 (초기, 업데이트)
      name={field.name}
      inputRef={field.ref} // input ref를 전송해서 input에 에러가 발생했을 때 focus 가능
    />
  );
}
```

- useController의 field에는 register 과정이 포함되어 있다.

```tsx
const { field } = useController({ name: 'test' })

<input {...field} /> // ✅
<input {...field} {...register('test')} /> // ❌ double up the registration

```

- 컴포넌트 당 하나의 useController를 사용하는 것이 좋다. 두개 이상 사용하는 경우에 name을 다르게 설정해주어야한다.
