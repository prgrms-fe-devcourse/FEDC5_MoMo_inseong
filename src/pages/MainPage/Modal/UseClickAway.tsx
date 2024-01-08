import { MutableRefObject, useEffect, useRef } from 'react';

interface UseEventHandlerProps {
  (event: MouseEvent | TouchEvent): void;
}

const useClickAway = (
  handler: UseEventHandlerProps,
): MutableRefObject<HTMLElement | null> => {
  const ref = useRef<HTMLElement | null>(null);
  const savedHandler = useRef<UseEventHandlerProps>(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleEvent: EventListener = (event) => {
      if (!element.contains(event.target as Node)) {
        savedHandler.current(event as MouseEvent | TouchEvent);
      }
    };

    const events = ['mousedown', 'touchstart'];

    for (const eventName of events) {
      document.addEventListener(eventName, handleEvent);
    }

    return () => {
      for (const eventName of events) {
        document.removeEventListener(eventName, handleEvent);
      }
    };
  }, []);

  return ref;
};

export default useClickAway;
