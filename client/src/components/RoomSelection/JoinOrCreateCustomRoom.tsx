import {
    ArrowLeft,
    ArrowRight,
    DoorOpen,
    LockKeyhole,
    Plus,
    Users,
} from "lucide-react";
import { useAppSelector } from "../../app/hooks";

export type CustomRoom = {
    roomName: string;
    roomId: string;
    hasPassword: boolean;
};

export default function JoinOrCreateCustomRoom({
    onBack,
    onCreate,
    onJoin,
}: {
    onBack: () => void;
    onCreate: () => void;
    onJoin: (room: CustomRoom) => void;
}) {
    const rooms = useAppSelector((state) => state.room.availableRooms);
    const loading = useAppSelector((state) => state.room.isLoading);
    return (
        <section className="room-browser">
            <button className="back-link" onClick={onBack}>
                <ArrowLeft size={16} /> Back to home
            </button>
            <div className="browser-heading">
                <div>
                    <div className="eyebrow">FIND YOUR LITTLE CORNER</div>
                    <h1>Good company starts here.</h1>
                    <p>
                        Join a friend’s space, or make a little world of your
                        own.
                    </p>
                </div>
                <button className="cave-button primary" onClick={onCreate}>
                    <Plus size={18} /> Create a room
                </button>
            </div>
            <div className="browser-toolbar">
                <span>
                    <Users size={17} /> Custom rooms{" "}
                    <span className="room-count">{rooms.length}</span>
                </span>
                <span>
                    <span
                        className={`status-dot ${loading ? "connecting" : ""}`}
                    />
                    {loading ? "Connecting…" : "Updated live"}
                </span>
            </div>
            {rooms.length ? (
                <div className="room-grid">
                    {rooms.map((room, index) => (
                        <article className="browse-room" key={room.roomId}>
                            <div
                                className={`room-art ${["mint", "peach", "lavender"][index % 3]}`}
                            >
                                <DoorOpen size={50} strokeWidth={1.2} />
                                <span>
                                    {room.hasPassword ? (
                                        <LockKeyhole size={16} />
                                    ) : (
                                        <Users size={16} />
                                    )}
                                    {room.hasPassword
                                        ? "Password protected"
                                        : "Open room"}
                                </span>
                            </div>
                            <div className="browse-room-body">
                                <h2>{room.roomName}</h2>
                                <p>
                                    Room ID <code>{room.roomId}</code>
                                </p>
                                <button
                                    className="cave-button secondary"
                                    onClick={() => onJoin(room)}
                                >
                                    Join this room <ArrowRight size={17} />
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            ) : (
                <div className="rooms-empty">
                    <div className="empty-room-art">
                        <DoorOpen size={62} strokeWidth={1.1} />
                        <span className="empty-star">✦</span>
                        <span className="empty-star small">✧</span>
                    </div>
                    <span className="eyebrow">A FRESH START</span>
                    <h2>
                        {loading
                            ? "Finding your people…"
                            : "The next great hangout could be yours."}
                    </h2>
                    <p>
                        {loading
                            ? "We’re connecting to the server to discover available rooms."
                            : "No custom rooms are open yet. Create the first one, invite your crew, and make yourself at home."}
                    </p>
                    <button className="cave-button primary" onClick={onCreate}>
                        <Plus size={18} /> Create the first room
                    </button>
                    <small>
                        With or without a password. Always your space.
                    </small>
                </div>
            )}
            <div className="browser-tip">
                <LockKeyhole size={18} />
                <p>
                    <strong>A little privacy, if you like.</strong> A lock means
                    the host has added a password. Ask them for it before
                    joining.
                </p>
            </div>
        </section>
    );
}
