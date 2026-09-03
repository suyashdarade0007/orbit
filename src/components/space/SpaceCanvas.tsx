import { Suspense, lazy, useEffect, useState } from "react";

const Scene = lazy(() => import("./Scene"));

type Props = {
  selected?: string | null;
  onSelect?: (slug: string | null) => void;
  focusOnly?: string | undefined;
  compact?: boolean | undefined;
};

/**
 * Client-only wrapper. The WebGL scene is never imported during SSR.
 */
export function SpaceCanvas({
  selected = null,
  onSelect = () => {},
  focusOnly,
  compact,
}: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-full w-full bg-background" aria-hidden="true" />;
  }

  return (
    <Suspense
      fallback={<div className="h-full w-full bg-background" aria-hidden="true" />}
    >
      <Scene
        selected={selected}
        onSelect={onSelect}
        focusOnly={focusOnly}
        compact={compact}
      />
    </Suspense>
  );
}
