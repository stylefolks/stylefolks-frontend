import React, { useState } from 'react';

const useComments = () => {
  const [edit, setEdit] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  const onEdit = () => {
    setEdit((prev) => !prev);
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return {
    state: { edit, value },
    actions: { onEdit, onChange, setValue, setEdit },
  };
};

export default useComments;
