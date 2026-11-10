import { useEffect, useRef } from "react";

export default function CustomCursor() {
    const containerRef = useRef(null);
    const dotWrapperRef = useRef(null);
    const ringWrapperRef = useRef(null);
    const dotInnerRef = useRef(null);
    const ringInnerRef = useRef(null);

    const mousePos = useRef({ x: -100, y: -100 });
    const ringPos = useRef({ x: -100, y: -100 });
    const isVisible = useRef(false);
    const isHovered = useRef(false);
    const isClicked = useRef(false);
    const isTextTarget = useRef(false);
    const rafId = useRef(null);

    useEffect(() => {
        // Fallback check: disable on touch devices or if user prefers reduced motion
        const isFinePointer = window.matchMedia("(pointer: fine)").matches;
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (!isFinePointer || prefersReducedMotion) {
            return;
        }

        const container = containerRef.current;
        if (!container) return;

        // Activate custom cursor styling on body
        document.body.classList.add("custom-cursor-active");

        const updateCursorStyles = () => {
            if (!container) return;

            const shouldHide = !isVisible.current || isTextTarget.current;
            container.style.opacity = shouldHide ? "0" : "1";

            if (ringInnerRef.current) {
                if (isClicked.current) {
                    ringInnerRef.current.style.transform = "scale(0.8)";
                    ringInnerRef.current.style.backgroundColor = "rgba(0, 0, 0, 0.25)";
                } else if (isHovered.current) {
                    ringInnerRef.current.style.transform = "scale(1.4)";
                    ringInnerRef.current.style.backgroundColor = "rgba(255, 230, 0, 0.35)";
                } else {
                    ringInnerRef.current.style.transform = "scale(1)";
                    ringInnerRef.current.style.backgroundColor = "transparent";
                }
            }

            if (dotInnerRef.current) {
                if (isClicked.current) {
                    dotInnerRef.current.style.transform = "scale(0.75)";
                } else if (isHovered.current) {
                    dotInnerRef.current.style.transform = "scale(1.25)";
                } else {
                    dotInnerRef.current.style.transform = "scale(1)";
                }
            }
        };

        const handlePointerMove = (e) => {
            // Guard against touch events if pointermove fires with touch
            if (e.pointerType === "touch") return;

            mousePos.current.x = e.clientX;
            mousePos.current.y = e.clientY;

            if (!isVisible.current) {
                isVisible.current = true;
                ringPos.current.x = e.clientX;
                ringPos.current.y = e.clientY;
            }

            const target = e.target;
            if (target) {
                const textTarget = Boolean(
                    target.closest(
                        'input[type="text"], input[type="email"], input[type="password"], input[type="search"], input[type="number"], input[type="url"], textarea, [contenteditable="true"]'
                    )
                );
                isTextTarget.current = textTarget;

                const interactive = !textTarget && Boolean(
                    target.closest(
                        'a, button, [role="button"], input[type="submit"], input[type="button"], select, .neo-btn, .cursor-pointer'
                    )
                );
                isHovered.current = interactive;
            }

            updateCursorStyles();
        };

        const handlePointerDown = (e) => {
            if (e.pointerType === "touch") return;
            isClicked.current = true;
            updateCursorStyles();
        };

        const handlePointerUp = () => {
            isClicked.current = false;
            updateCursorStyles();
        };

        const handlePointerLeave = () => {
            isVisible.current = false;
            updateCursorStyles();
        };

        const handlePointerEnter = () => {
            isVisible.current = true;
            updateCursorStyles();
        };

        // Unified animation frame loop for jitter-free 60/120fps tracking
        const animate = () => {
            const dx = mousePos.current.x - ringPos.current.x;
            const dy = mousePos.current.y - ringPos.current.y;
            ringPos.current.x += dx * 0.28;
            ringPos.current.y += dy * 0.28;

            if (dotWrapperRef.current) {
                dotWrapperRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
            }

            if (ringWrapperRef.current) {
                ringWrapperRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
            }

            rafId.current = requestAnimationFrame(animate);
        };

        window.addEventListener("pointermove", handlePointerMove, { passive: true });
        window.addEventListener("pointerdown", handlePointerDown);
        window.addEventListener("pointerup", handlePointerUp);
        document.documentElement.addEventListener("pointerleave", handlePointerLeave);
        document.documentElement.addEventListener("pointerenter", handlePointerEnter);

        rafId.current = requestAnimationFrame(animate);

        return () => {
            document.body.classList.remove("custom-cursor-active");
            window.removeEventListener("pointermove", handlePointerMove);
            window.removeEventListener("pointerdown", handlePointerDown);
            window.removeEventListener("pointerup", handlePointerUp);
            document.documentElement.removeEventListener("pointerleave", handlePointerLeave);
            document.documentElement.removeEventListener("pointerenter", handlePointerEnter);

            if (rafId.current) {
                cancelAnimationFrame(rafId.current);
            }
        };
    }, []);

    // SSR safety check: do not render cursor markup on touch or reduced motion
    if (typeof window !== "undefined") {
        const isFinePointer = window.matchMedia("(pointer: fine)").matches;
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;
        if (!isFinePointer || prefersReducedMotion) {
            return null;
        }
    }

    return (
        <div
            ref={containerRef}
            className="pointer-events-none select-none transition-opacity duration-150"
            style={{ opacity: 0 }}
            aria-hidden="true"
        >
            {/* Outline Ring (smoothed trailing lerp) */}
            <div
                ref={ringWrapperRef}
                className="fixed top-0 left-0 pointer-events-none z-[99998]"
                style={{
                    transform: "translate3d(-100px, -100px, 0)",
                    willChange: "transform",
                }}
            >
                <div
                    ref={ringInnerRef}
                    className="w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-black shadow-[2px_2px_0px_#000] transition-transform duration-150 ease-out"
                    style={{
                        willChange: "transform",
                    }}
                />
            </div>

            {/* Central Precision Dot (synchronous pointer position) */}
            <div
                ref={dotWrapperRef}
                className="fixed top-0 left-0 pointer-events-none z-[99999]"
                style={{
                    transform: "translate3d(-100px, -100px, 0)",
                    willChange: "transform",
                }}
            >
                <div
                    ref={dotInnerRef}
                    className="w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black transition-transform duration-100 ease-out"
                    style={{
                        willChange: "transform",
                    }}
                />
            </div>
        </div>
    );
}
