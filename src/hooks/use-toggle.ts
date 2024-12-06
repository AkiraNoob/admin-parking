import { useCallback, useState } from 'react';

export default function useToggle(initialMode?: boolean) {
  const [open, setOpen] = useState(initialMode || false);

  const toggle = useCallback(() => setOpen((prev) => !prev), [setOpen]);

  return [open, toggle] as const;
}
