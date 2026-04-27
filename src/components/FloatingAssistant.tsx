import {
  Grip,
  MessageSquareText,
  PanelRightClose,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import type { MouseEvent, PointerEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

interface Position {
  x: number;
  y: number;
}

type AssistantMode = "collapsed" | "open" | "docked";
type DockSide = "left" | "right";

function getInitialMode(): AssistantMode {
  if (typeof window !== "undefined" && window.innerWidth <= 720) {
    return "docked";
  }

  return "collapsed";
}

function getInitialPosition(): Position {
  if (typeof window === "undefined") {
    return { x: 24, y: 24 };
  }

  return {
    x: Math.max(12, window.innerWidth - 178),
    y: Math.max(12, window.innerHeight - 88),
  };
}

function clampPosition(position: Position, width: number, height: number): Position {
  if (typeof window === "undefined") {
    return position;
  }

  return {
    x: Math.min(Math.max(12, position.x), Math.max(12, window.innerWidth - width - 12)),
    y: Math.min(Math.max(12, position.y), Math.max(12, window.innerHeight - height - 12)),
  };
}

export function FloatingAssistant() {
  const [mode, setMode] = useState<AssistantMode>(getInitialMode);
  const [dockSide, setDockSide] = useState<DockSide>("right");
  const [position, setPosition] = useState<Position>(getInitialPosition);
  const assistantRef = useRef<HTMLElement | null>(null);
  const dragOffsetRef = useRef<Position>({ x: 0, y: 0 });
  const dragStartRef = useRef<Position>({ x: 0, y: 0 });
  const draggingRef = useRef(false);
  const draggedRef = useRef(false);

  const keepInsideViewport = useCallback(() => {
    if (mode === "docked") {
      setPosition((currentPosition) => ({
        x: currentPosition.x,
        y: clampPosition({ x: 12, y: currentPosition.y }, 80, 132).y,
      }));
      return;
    }

    const rect = assistantRef.current?.getBoundingClientRect();
    const width = rect?.width ?? (mode === "open" ? 340 : 144);
    const height = rect?.height ?? (mode === "open" ? 360 : 42);

    setPosition((currentPosition) => {
      const nextPosition = clampPosition(currentPosition, width, height);
      if (nextPosition.x === currentPosition.x && nextPosition.y === currentPosition.y) {
        return currentPosition;
      }

      return nextPosition;
    });
  }, [mode]);

  useEffect(() => {
    keepInsideViewport();
    window.addEventListener("resize", keepInsideViewport);

    return () => window.removeEventListener("resize", keepInsideViewport);
  }, [keepInsideViewport]);

  const dockToSide = (side: DockSide) => {
    setDockSide(side);
    setMode("docked");
  };

  const openAssistant = () => {
    setMode("open");
    setPosition((currentPosition) => {
      if (mode !== "docked") {
        return currentPosition;
      }

      const panelWidth = Math.min(340, window.innerWidth - 24);
      return {
        x: dockSide === "right" ? window.innerWidth - panelWidth - 12 : 12,
        y: clampPosition({ x: 12, y: currentPosition.y }, panelWidth, 360).y,
      };
    });
  };

  const closeAssistant = (event?: MouseEvent<HTMLButtonElement>) => {
    event?.stopPropagation();
    setMode("collapsed");
    setPosition((currentPosition) => {
      const rect = assistantRef.current?.getBoundingClientRect();
      return clampPosition(currentPosition, rect?.width ?? 144, 42);
    });
  };

  const beginDrag = (event: PointerEvent<HTMLElement>) => {
    if ("setPointerCapture" in event.currentTarget) {
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    draggingRef.current = true;
    draggedRef.current = false;
    dragStartRef.current = {
      x: event.clientX,
      y: event.clientY,
    };
    dragOffsetRef.current = {
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    };
  };

  const moveDrag = (event: PointerEvent<HTMLElement>) => {
    if (!draggingRef.current || event.buttons === 0) {
      return;
    }

    if (
      "hasPointerCapture" in event.currentTarget &&
      !event.currentTarget.hasPointerCapture(event.pointerId)
    ) {
      return;
    }

    if (
      Math.abs(event.clientX - dragStartRef.current.x) > 4 ||
      Math.abs(event.clientY - dragStartRef.current.y) > 4
    ) {
      draggedRef.current = true;
    }

    if (!draggedRef.current) {
      return;
    }

    const rect = assistantRef.current?.getBoundingClientRect();
    setPosition(
      clampPosition(
        {
          x: event.clientX - dragOffsetRef.current.x,
          y: event.clientY - dragOffsetRef.current.y,
        },
        rect?.width ?? 144,
        rect?.height ?? 42,
      ),
    );
  };

  const endDrag = (event: PointerEvent<HTMLElement>) => {
    draggingRef.current = false;
    if (
      "hasPointerCapture" in event.currentTarget &&
      event.currentTarget.hasPointerCapture(event.pointerId)
    ) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    const rect = assistantRef.current?.getBoundingClientRect();
    const width = rect?.width ?? 144;
    const left = rect?.left ?? position.x;
    if (!draggedRef.current) {
      return;
    }

    if (left <= 24) {
      dockToSide("left");
    } else if (left + width >= window.innerWidth - 24) {
      dockToSide("right");
    }
  };

  const assistantStyle =
    mode === "docked" ? { top: position.y } : { left: position.x, top: position.y };

  return (
    <aside
      ref={assistantRef}
      className={`floating-assistant is-${mode} is-${dockSide}`}
      style={assistantStyle}
      aria-label="AI 校准助手"
    >
      {mode === "docked" ? (
        <button
          className="assistant-dock"
          onClick={openAssistant}
          type="button"
          aria-label="展开校准助手"
        >
          <Sparkles size={15} aria-hidden="true" />
          <span>校准助手</span>
        </button>
      ) : null}

      {mode === "collapsed" ? (
        <button
          className="assistant-pill"
          onClick={() => {
            if (!draggedRef.current) {
              openAssistant();
            }
          }}
          onPointerDown={beginDrag}
          onPointerMove={moveDrag}
          onPointerUp={endDrag}
          type="button"
          aria-label="打开校准助手"
        >
          <MessageSquareText size={16} aria-hidden="true" />
          <span>校准助手</span>
          <i aria-hidden="true" />
        </button>
      ) : null}

      {mode === "open" ? (
        <section className="assistant-panel">
          <div className="assistant-panel__bar">
            <div
              className="assistant-panel__drag"
              onPointerDown={beginDrag}
              onPointerMove={moveDrag}
              onPointerUp={endDrag}
              role="presentation"
            >
              <Grip size={16} aria-hidden="true" />
            </div>
            <span>校准助手</span>
            <button
              onClick={() => dockToSide("right")}
              type="button"
              aria-label="收纳助手"
            >
              <PanelRightClose size={16} aria-hidden="true" />
            </button>
            <button onClick={closeAssistant} type="button" aria-label="关闭助手">
              <X size={16} aria-hidden="true" />
            </button>
          </div>
          <div className="assistant-panel__body">
            <p className="assistant-message">
              我可以帮你定位待确认线索、解释证据状态或生成评审追问。
            </p>
            <p className="assistant-message is-user">候选人 B 的低估风险来源是什么？</p>
            <p className="assistant-message">
              已验证材料集中在人才培养、知识沉淀和长期组织贡献，原评估主要覆盖显性绩效。
            </p>
          </div>
          <div className="assistant-panel__input">
            <input readOnly placeholder="询问材料来源、证据状态或追问建议" />
            <button type="button" aria-label="发送消息">
              <Send size={16} aria-hidden="true" />
            </button>
          </div>
        </section>
      ) : null}
    </aside>
  );
}
