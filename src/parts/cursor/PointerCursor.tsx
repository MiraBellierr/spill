import pointerCursor from '/cursors/Pointer.gif';

type PointerCursorProps = {
  position: { x: number; y: number };
  isActive: boolean;
};

export default function PointerCursor({ position, isActive }: PointerCursorProps) {
  const config = {
    width: 32,
    height: 32,
    offsetX: 0,
    offsetY: 0,
    image: pointerCursor
  };

  if (!isActive) return null;

  return (
    <div
      style={{
        position: 'fixed',
        left: `${position.x + config.offsetX}px`,
        top: `${position.y + config.offsetY}px`,
        width: `${config.width}px`,
        height: `${config.height}px`,
        background: `url(${config.image}) no-repeat`,
        backgroundSize: 'contain',
        pointerEvents: 'none',
        zIndex: 9999, // Higher than normal cursor
      }}
    />
  );
}