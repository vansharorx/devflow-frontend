import { useEffect, useRef } from "react";

export default function CustomCursor() {
    const cursorRef = useRef(null);
    const innerRef = useRef(null);

    const isVisible = useRef(false);
    const isHovered = useRef(false);
    const isClicked = useRef(false);
    const isTextTarget = useRef(false);

    useEffect(() => {
        // Disable on touch devices or if user prefers reduced motion
        const isFinePointer = window.matchMedia("(pointer: fine)").matches;
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (!isFinePointer || prefersReducedMotion) {
            return;
        }

        const cursor = cursorRef.current;
        const inner = innerRef.current;
        if (!cursor || !inner) return;

        // Activate custom cursor styling on body
        document.body.classList.add("custom-cursor-active");

        const setDotDefault = () => {
            inner.style.width = "11px";
            inner.style.height = "11px";
            inner.style.backgroundColor = "#111111";
            inner.style.boxShadow = "none";
            inner.style.outline = "none";
            inner.style.border = "2px solid transparent";
        };

        const updateCursorStyles = () => {
            const shouldHide = !isVisible.current || isTextTarget.current;
            cursor.style.opacity = shouldHide ? "0" : "1";

            if (isClicked.current) {
                inner.style.width = "7px";
                inner.style.height = "7px";
                inner.style.backgroundColor = "#111111";
                inner.style.border = "2px solid transparent";
                inner.style.boxShadow = "none";
            } else if (isHovered.current) {
                inner.style.width = "22px";
                inner.style.height = "22px";
                inner.style.backgroundColor = "rgba(255, 230, 0, 0.25)";
                inner.style.border = "2px solid #FFE600";
                inner.style.boxShadow = "none";
            } else {
                setDotDefault();
            }
        };

        const handlePointerMove = (e) => {
            if (e.pointerType === "touch") return;

            // Direct 1:1 hardware synchronization with zero lag or dragging
            cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;

            if (!isVisible.current) {
                isVisible.current = true;
            }

            const target = e.target;
            if (target) {
                const textTarget = Boolean(
                    target.closest(
                        'input[type="text"], input[type="email"], input[type="password"], input[type="search"], input[type="number"], input[type="url"], textarea, [contenteditable="true"]'
                    )
                );
                isTextTarget.current = textTarget;

                const interactive =
                    !textTarget &&
                    Boolean(
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

        const handlePointerEnter = (e) => {
            if (e.pointerType === "touch") return;
            isVisible.current = true;
            cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
            updateCursorStyles();
        };

        window.addEventListener("pointermove", handlePointerMove, { passive: true });
        window.addEventListener("pointerdown", handlePointerDown);
        window.addEventListener("pointerup", handlePointerUp);
        document.documentElement.addEventListener("pointerleave", handlePointerLeave);
        document.documentElement.addEventListener("pointerenter", handlePointerEnter);

        return () => {
            document.body.classList.remove("custom-cursor-active");
            window.removeEventListener("pointermove", handlePointerMove);
            window.removeEventListener("pointerdown", handlePointerDown);
            window.removeEventListener("pointerup", handlePointerUp);
            document.documentElement.removeEventListener("pointerleave", handlePointerLeave);
            document.documentElement.removeEventListener("pointerenter", handlePointerEnter);
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
            ref={cursorRef}
            className="fixed top-0 left-0 pointer-events-none z-[99999] select-none transition-opacity duration-100"
            style={{
                transform: "translate3d(-100px, -100px, 0)",
                opacity: 0,
                willChange: "transform",
            }}
            aria-hidden="true"
        >
            <div
                ref={innerRef}
                style={{
                    width: "11px",
                    height: "11px",
                    borderRadius: "50%",
                    backgroundColor: "#111111",
                    transform: "translate(-50%, -50%)",
                    transition: "width 90ms ease-out, height 90ms ease-out, background-color 90ms ease-out, border 90ms ease-out",
                    willChange: "width, height, background-color",
                    boxShadow: "none",
                    border: "2px solid transparent",
                }}
            />
        </div>
    );
}
