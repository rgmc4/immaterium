import { useState } from "react";

export function useField(initialValue: any) {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return [onChange, value];
}
