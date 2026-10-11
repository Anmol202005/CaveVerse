import { useEffect, useRef, useState, type FormEvent } from "react";
import {
    ArrowDown,
    ArrowRight,
    Globe2,
    LockKeyhole,
    MessageCircle,
    Send,
    X,
} from "lucide-react";
import { useAppSelector } from "../app/hooks";
import { GameScene } from "../game/scenes/GameScene";
import phaserGame from "../game/main";

const gameScene = () => phaserGame.scene.keys.GameScene as GameScene;

export default function Chat({
    setShowChat,
}: {
    setShowChat: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const [activeChat, setActiveChat] = useState<"Global" | "OfficeSpecific">(
        "Global",
    );
    const [draft, setDraft] = useState("");
    const focused = useAppSelector((state) => state.chat.focused);
    const officeMessages = useAppSelector(
        (state) => state.chat.officeChatMessages,
    );
    const globalMessages = useAppSelector(
        (state) => state.chat.globalChatMessages,
    );
    const showOfficeChat = useAppSelector((state) => state.chat.showOfficeChat);
    const inputRef = useRef<HTMLInputElement>(null);
    const chatRef = useRef<HTMLDivElement>(null);
    const nearBottom = useRef(true);
    const [newMessages, setNewMessages] = useState(false);
    const messages = activeChat === "Global" ? globalMessages : officeMessages;

    useEffect(() => {
        if (focused) inputRef.current?.focus();
    }, [focused]);
    useEffect(() => {
        setActiveChat(showOfficeChat ? "OfficeSpecific" : "Global");
    }, [showOfficeChat]);
    useEffect(() => {
        if (nearBottom.current && chatRef.current)
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        else setNewMessages(true);
    }, [messages]);
    useEffect(() => {
        nearBottom.current = true;
        setNewMessages(false);
        if (chatRef.current)
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }, [activeChat]);
    useEffect(
        () => () => {
            gameScene()?.enableKeys();
        },
        [],
    );

    const submit = (event: FormEvent) => {
        event.preventDefault();
        const message = draft.trim();
        if (!message) return;
        if (activeChat === "Global")
            gameScene().addNewGlobalChatMessage(message);
        else gameScene().addNewOfficeChatMessage(message);
        nearBottom.current = true;
        setDraft("");
        inputRef.current?.focus();
    };

    return (
        <aside className="room-chat" aria-label="Room chat">
            <header className="chat-header">
                <span className="chat-title-icon">
                    <MessageCircle size={19} />
                </span>
                <div>
                    <span className="room-eyebrow">A LITTLE CONVERSATION</span>
                    <h2>Room chat</h2>
                </div>
                <button
                    className="room-icon-button"
                    aria-label="Close chat"
                    onClick={() => setShowChat(false)}
                >
                    <X size={18} />
                </button>
            </header>
            <div
                className="chat-tabs"
                role="tablist"
                aria-label="Chat channels"
            >
                <button
                    id="global-chat-tab"
                    role="tab"
                    aria-selected={activeChat === "Global"}
                    aria-controls="chat-messages"
                    className={activeChat === "Global" ? "selected" : ""}
                    onClick={() => setActiveChat("Global")}
                >
                    <Globe2 size={15} /> Everyone
                </button>
                {showOfficeChat && (
                    <button
                        id="office-chat-tab"
                        role="tab"
                        aria-selected={activeChat === "OfficeSpecific"}
                        aria-controls="chat-messages"
                        className={
                            activeChat === "OfficeSpecific" ? "selected" : ""
                        }
                        onClick={() => setActiveChat("OfficeSpecific")}
                    >
                        <LockKeyhole size={14} /> This office
                    </button>
                )}
            </div>
            <div className="chat-scope">
                <span className="room-status-dot" />
                {activeChat === "Global"
                    ? "A shared hello for everyone in the room"
                    : "Just the people in your current office"}
            </div>
            <div
                className="chat-scroll"
                id="chat-messages"
                role="tabpanel"
                aria-labelledby={
                    activeChat === "Global"
                        ? "global-chat-tab"
                        : "office-chat-tab"
                }
                ref={chatRef}
                onScroll={() => {
                    const el = chatRef.current;
                    if (el) {
                        nearBottom.current =
                            el.scrollHeight - el.scrollTop - el.clientHeight <
                            65;
                        if (nearBottom.current) setNewMessages(false);
                    }
                }}
            >
                <div className="chat-welcome">
                    <span aria-hidden="true">✦</span>
                    <h3>
                        Good conversations
                        <br />
                        start with a hello.
                    </h3>
                    <p>
                        Share a thought, ask a question,
                        <br />
                        or just say you’re here.
                    </p>
                </div>
                <div
                    className="chat-log"
                    role="log"
                    aria-label={
                        activeChat === "Global"
                            ? "Everyone’s messages"
                            : "Office messages"
                    }
                    aria-live="polite"
                    aria-relevant="additions"
                >
                    {messages.map((msg, i) =>
                        msg.type === "REGULAR_MESSAGE" ? (
                            <div className="chat-message" key={i}>
                                <span
                                    className={`message-avatar avatar-${msg.username.length % 3}`}
                                    aria-hidden="true"
                                >
                                    {msg.username.slice(0, 2).toUpperCase()}
                                </span>
                                <div className="message-content">
                                    <span className="message-name">
                                        {msg.username}
                                    </span>
                                    <p className="message-bubble">
                                        {msg.message}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div
                                className={`chat-event ${msg.type === "PLAYER_LEFT" ? "left" : ""}`}
                                key={i}
                            >
                                <ArrowRight size={12} />
                                <p>
                                    <strong>{msg.username}</strong> ·{" "}
                                    {msg.message}
                                </p>
                            </div>
                        ),
                    )}
                </div>
            </div>
            {newMessages && (
                <button
                    className="new-messages"
                    onClick={() => {
                        nearBottom.current = true;
                        setNewMessages(false);
                        if (chatRef.current)
                            chatRef.current.scrollTop =
                                chatRef.current.scrollHeight;
                    }}
                >
                    <ArrowDown size={13} /> New messages
                </button>
            )}
            <form className="chat-composer" onSubmit={submit}>
                <label className="sr-only" htmlFor="room-chat-input">
                    Message{" "}
                    {activeChat === "Global" ? "everyone" : "this office"}
                </label>
                <div className="composer-field">
                    <input
                        id="room-chat-input"
                        ref={inputRef}
                        placeholder={
                            activeChat === "Global"
                                ? "Say a little hello…"
                                : "Message your office…"
                        }
                        value={draft}
                        onChange={(event) => setDraft(event.target.value)}
                        onFocus={() => gameScene()?.disableKeys()}
                        onBlur={() => gameScene()?.enableKeys()}
                        autoComplete="off"
                    />
                    <button
                        type="submit"
                        className="chat-send"
                        disabled={!draft.trim()}
                        aria-label="Send message"
                    >
                        <Send size={17} />
                    </button>
                </div>
                <span className="composer-note">
                    A little kindness goes a long way.<span>Enter ↵</span>
                </span>
            </form>
        </aside>
    );
}
