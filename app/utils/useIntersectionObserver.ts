import { useEffect, useRef, useState } from "react";

export function useIntersectionObserver<T extends HTMLElement>(
  options: IntersectionObserverInit & { once?: boolean } = {},
) {
  const [isIntersecting, setIntersecting] = useState(false);
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const target = ref.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersecting(true);
          if (options.once) {
            observer.disconnect();
          }
        } else if (!options.once) {
          setIntersecting(false);
        }
      },
      options,
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [options.once, options.root, options.rootMargin, options.threshold]);

  return { ref, isIntersecting } as const;
}
