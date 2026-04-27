import { Bot, Grip, Send, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

interface Position {
  x: number;
  y: number;
}

function getInitialPosition(): Position {
  if (typeof window === "undefined") {
    return { x: 24, y: 24 };
  }

  return {
    x: Math.max(12, window.innerWidth - 390),
    y: Math.max(12, window.innerHeight - 118),
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
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<Position>(getInitialPosition);
  const assistantRef = useRef<HTMLElement | null>(null);
  const dragOffsetRef = useRef<Position>({ x: 0, y: 0 });

  const keepInsideViewport = useCallback(() => {
    const rect = assistantRef.current?.getBoundingClientRect();
    const width = rect?.width ?? (isOpen ? Math.min(340, window.innerWidth - 24) : 54);
    const height = rect?.height ?? (isOpen ? 360 : 54);

    setPosition((currentPosition) => {
      const nextPosition = clampPosition(currentPosition, width, height);
      if (nextPosition.x === currentPosition.x && nextPosition.y === currentPosition.y) {
        return currentPosition;
      }

      return nextPosition;
    });
  }, [isOpen]);

  useEffect(() => {
    keepInsideViewport();
    window.addEventListener("resize", keepInsideViewport);

    return () => window.removeEventListener("resize", keepInsideViewport);
  }, [keepInsideViewport]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    dragOffsetRef.current = {
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    };
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
      return;
    }

    const rect = assistantRef.current?.getBoundingClientRect();
    setPosition(
      clampPosition(
        {
          x: event.clientX - dragOffsetRef.current.x,
          y: event.clientY - dragOffsetRef.current.y,
        },
        rect?.width ?? 54,
        rect?.height ?? 54,
      ),
    );
  };

  return (
    <aside
      ref={assistantRef}
      className={`floating-assistant ${isOpen ? "is-open" : ""}`}
      style={{ left: position.x, top: position.y }}
      aria-label="AI 校准助手"
    >
      {isOpen ? (
        <section className="assistant-panel">
          <div
            className="assistant-panel__handle"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
          >
            <Grip size={16} aria-hidden="true" />
            <span>AI 校准助手</span>
            <button onClick={() => setIsOpen(false)} type="button" aria-label="关闭助手">
              <X size={16} aria-hidden="true" />
            </button>
          </div>
          <div className="assistant-panel__body">
            <p className="assistant-message">
              我可以帮你定位待确认线索、解释证据状态或生成评审追问。
            </p>
            <p className="assistant-message is-user">候选人 B 为什么提示低估风险？</p>
            <p className="assistant-message">
              因为已验证材料集中出现在人才培养、知识沉淀和长期组织贡献，但原评估主要依据显性绩效。
            </p>
          </div>
          <div className="assistant-panel__input">
            <input readOnly value="演示模式，不连接真实对话" />
            <button type="button" aria-label="发送演示消息">
              <Send size={16} aria-hidden="true" />
            </button>
          </div>
        </section>
      ) : (
        <button
          className="assistant-bubble"
          onClick={() => setIsOpen(true)}
          type="button"
          aria-label="打开 AI 校准助手"
        >
          <Bot size={20} aria-hidden="true" />
          <span>AI</span>
        </button>
      )}
    </aside>
  );
}
