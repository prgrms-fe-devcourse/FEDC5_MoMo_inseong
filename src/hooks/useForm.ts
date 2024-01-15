import { ChangeEvent, FormEvent, useState } from 'react';

interface IError {
  value?: string;
}
const useForm = ({
  initialState,
  onSubmit,
  validate,
}: {
  initialState: { inputValue: string };
  onSubmit: () => Promise<void>;
  validate: (values: string) => object;
}) => {
  const [values, setValues] = useState(initialState.inputValue);
  const [errors, setErrors] = useState({} as IError);

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    const newErrors = validate ? validate(values) : {};
    if (Object.keys(newErrors).length === 0) {
      await onSubmit();
    }
    setErrors(newErrors);
    setIsLoading(false);
  };

  return {
    values,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
