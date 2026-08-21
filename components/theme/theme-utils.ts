export type ThemeMode = "light" | "dark";

export function getResolvedTheme(mode: ThemeMode): boolean {
  return mode === "dark";
}

export function applyTheme(mode: ThemeMode, event?: React.MouseEvent) {
  if (typeof window === "undefined") return;

  const targetDark = mode === "dark";

  const updateDOM = () => {
    if (targetDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", mode);
  };

  // Circular view transition animation if supported
  const doc = document as any;
  if (
    !doc.startViewTransition ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    updateDOM();
    return;
  }

  const x = event ? event.clientX : window.innerWidth / 2;
  const y = event ? event.clientY : window.innerHeight / 2;
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  );

  const transition = doc.startViewTransition(() => {
    updateDOM();
  });

  transition.ready?.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ];
    document.documentElement.animate(
      {
        clipPath: targetDark ? clipPath : [...clipPath].reverse(),
      },
      {
        duration: 400,
        easing: "cubic-bezier(0.4, 0, 0.2, 1)",
        pseudoElement: targetDark
          ? "::view-transition-new(root)"
          : "::view-transition-old(root)",
      }
    );
  });
}
