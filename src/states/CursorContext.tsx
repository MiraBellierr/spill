import { createContext, useContext, useState, useEffect } from 'react';

type CursorContextType = {
  isCustomCursor: boolean;
  toggleCursor: () => void;
};

const CursorContext = createContext<CursorContextType>({
  isCustomCursor: true,
  toggleCursor: () => {},
});

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [isCustomCursor, setIsCustomCursor] = useState(true);

  // Initialize cursor state on mount
  useEffect(() => {
    if (!isCustomCursor) {
      document.body.style.cursor = 'default';
    } else {
      document.body.style.cursor = 'none';
    }
  }, [isCustomCursor]);

  useEffect(() => {
  // Hide/show system cursor based on preference
  document.body.style.cursor = isCustomCursor ? 'none' : 'default';
  
  // Also hide cursor on all interactive elements when custom cursor is enabled
  const interactiveSelectors = 'a, button, input, [role="button"], [onclick]';
  const interactiveElements = document.querySelectorAll(interactiveSelectors);
  
  interactiveElements.forEach(el => {
    (el as HTMLElement).style.cursor = isCustomCursor ? 'none' : '';
  });

}, [isCustomCursor]);

  const toggleCursor = () => {
    const newValue = !isCustomCursor;
    setIsCustomCursor(newValue);
    
    // Update cursor visibility immediately
    if (newValue) {
      document.body.style.cursor = 'none';
    } else {
      document.body.style.cursor = 'default';
    }
  };

  return (
    <CursorContext.Provider value={{ isCustomCursor, toggleCursor }}>
      {children}
    </CursorContext.Provider>
  );
}

export const useCursor = () => useContext(CursorContext);