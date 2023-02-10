import React, { ChangeEvent, KeyboardEvent, useState } from "react";

type EditableSpanPropsType = {
  callback: (newValue: string) => void;
};

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
  const [value, setValue] = useState("");

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const keyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") props.callback(value);
  };

  return (
    <input
      type="text"
      style={{ width: "100px" }}
      onChange={onChangeHandler}
      value={value}
      autoFocus
      onKeyPress={keyPressHandler}
    />
  );
});
