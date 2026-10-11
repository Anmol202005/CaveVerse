import { useState, type FormEvent } from "react";
import {
    ArrowLeft,
    ArrowRight,
    Check,
    Eye,
    EyeOff,
    Globe2,
    LoaderCircle,
    LockKeyhole,
    MessageCircle,
    ShieldCheck,
    Video,
    VideoOff,
} from "lucide-react";
import { useAppSelector } from "../../app/hooks";
import store from "../../app/store";
import { setIsLoading } from "../../app/features/room/roomSlice";
import { disconnectFromVideoCall } from "../../app/features/webRtc/webcamSlice";
import phaserGame from "../../game/main";
import { Bootstrap } from "../../game/scenes/Bootstrap";
import videoCalling from "../../game/service/VideoCalling";
import { VideoPlayer } from "../VideoPlayer";
import { WebcamButtons } from "../FloatingActions";
import WorldIllustration from "./WorldIllustration";
import type { CustomRoom } from "./JoinOrCreateCustomRoom";

const characters = ["nancy", "ash", "lucy", "adam"] as const;

export default function RoomSetup({
    mode,
    room,
    onBack,
}: {
    mode: "public" | "create" | "join";
    room?: CustomRoom;
    onBack: () => void;
}) {
    const [character, setCharacter] =
        useState<(typeof characters)[number]>("nancy");
    const [username, setUsername] = useState("");
    const [roomName, setRoomName] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [cameraError, setCameraError] = useState("");
    const [cameraLoading, setCameraLoading] = useState(false);
    const loading = useAppSelector((state) => state.room.isLoading);
    const stream = useAppSelector((state) => state.webcam.myWebcamStream);
    const create = mode === "create";
    const privateRoom = mode === "join";
    const needsPassword = create || (privateRoom && room?.hasPassword);

    const goBack = () => {
        if (stream) store.dispatch(disconnectFromVideoCall());
        onBack();
    };
    const submit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");
        if (!username.trim() || (create && !roomName.trim())) {
            setError(
                create
                    ? "Add your name and a room name to get started."
                    : "Add your name to get started.",
            );
            return;
        }
        const bootstrap = phaserGame.scene.keys.bootstrap as Bootstrap;
        try {
            if (!bootstrap?.network)
                throw new Error(
                    "The world is still loading. Please try again in a moment.",
                );
            if (create)
                await bootstrap.network.createCustomRoom(
                    username.trim(),
                    roomName.trim(),
                    password || null,
                    character,
                );
            else if (privateRoom)
                await bootstrap.network.joinCustomRoom(
                    username.trim(),
                    room!.roomId,
                    password || null,
                    character,
                );
            else
                await bootstrap.network.joinOrCreatePublicRoom(
                    username.trim(),
                    character,
                );
            await bootstrap.launchGame();
        } catch (err) {
            store.dispatch(setIsLoading(false));
            const message = err instanceof Error ? err.message : "";
            setError(
                message.toLowerCase().includes("password")
                    ? "That password didn’t match. Ask the host and try again."
                    : "We couldn’t enter the room. Check your connection and try again.",
            );
        }
    };
    const startCamera = async () => {
        setCameraError("");
        setCameraLoading(true);
        try {
            await videoCalling.getUserMedia();
        } catch {
            setCameraError(
                "Camera or microphone access isn’t available. You can still join without it.",
            );
        } finally {
            setCameraLoading(false);
        }
    };

    return (
        <section className="setup-page">
            <button className="back-link" onClick={goBack}>
                <ArrowLeft size={16} />
                {privateRoom ? "Back to rooms" : "Back to home"}
            </button>
            <div className="setup-layout">
                <aside className="setup-story">
                    <div className="story-kicker">
                        <span className="status-dot" /> A LITTLE SPACE FOR BIG
                        CONNECTIONS
                    </div>
                    <h2>
                        {create ? (
                            <>
                                Your people.
                                <br />{" "}
                                Your own corner.
                            </>
                        ) : (
                            <>
                                Come on in.
                                <br />{" "}
                                Find your people.
                            </>
                        )}
                    </h2>
                    <p>
                        {create
                            ? "For brainstorms, late-night catch-ups, and everything in between. Make a space that feels like you."
                            : "Pick your character and make yourself at home. There’s a whole little world waiting on the other side."}
                    </p>
                    <WorldIllustration />
                    <div className="story-bottom">
                        <MessageCircle size={19} />
                        <span>
                            Real conversations.
                            <br />
                            <strong>A little less distance.</strong>
                        </span>
                        <span className="story-star" aria-hidden="true">
                            ✦
                        </span>
                    </div>
                </aside>
                <div className="setup-form-panel">
                    <div className="setup-breadcrumb">
                        <span className="step-current">
                            01 <span>Make it yours</span>
                        </span>
                        <span className="step-line" />
                        <span>
                            02 <span>Step inside</span>
                        </span>
                    </div>
                    <div className="setup-heading">
                        <span
                            className={`setup-type ${create ? "peach" : "mint"}`}
                        >
                            {create || privateRoom ? (
                                <LockKeyhole size={17} />
                            ) : (
                                <Globe2 size={17} />
                            )}
                            {create
                                ? "YOUR OWN SPACE"
                                : privateRoom
                                  ? "CUSTOM ROOM"
                                  : "THE PUBLIC ROOM"}
                        </span>
                        <h1>
                            {create
                                ? "Make room for your crew."
                                : privateRoom
                                  ? `Join ${room?.roomName ?? "your crew"}`
                                  : "A new hello starts here."}
                        </h1>
                        <p>
                            {create
                                ? "A name, a character, and you’re ready to host."
                                : "Introduce yourself. We’ll take care of the rest."}
                        </p>
                    </div>
                    <form onSubmit={submit} className="setup-form">
                        <fieldset className="character-fieldset">
                            <legend>
                                Choose your character{" "}
                                <span>A little version of you</span>
                            </legend>
                            <div className="character-options">
                                {characters.map((name) => (
                                    <button
                                        key={name}
                                        type="button"
                                        className={`character-option ${character === name ? "selected" : ""}`}
                                        aria-pressed={character === name}
                                        onClick={() => setCharacter(name)}
                                    >
                                        <span className="character-portrait">
                                            <img
                                                src={`/assets/characters/single/${name[0].toUpperCase() + name.slice(1)}_idle_anim_20.png`}
                                                alt=""
                                            />
                                            {character === name && (
                                                <span className="character-check">
                                                    <Check size={11} />
                                                </span>
                                            )}
                                        </span>
                                        <span>{name}</span>
                                    </button>
                                ))}
                            </div>
                        </fieldset>
                        <div className="form-field">
                            <label htmlFor="display-name">Your name</label>
                            <input
                                id="display-name"
                                placeholder="What should we call you?"
                                value={username}
                                required
                                maxLength={32}
                                autoComplete="nickname"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        {create && (
                            <div className="form-field">
                                <label htmlFor="room-name">Room name</label>
                                <input
                                    id="room-name"
                                    placeholder="The cozy corner, Friday hangout…"
                                    required
                                    maxLength={60}
                                    value={roomName}
                                    onChange={(e) =>
                                        setRoomName(e.target.value)
                                    }
                                />
                            </div>
                        )}
                        {needsPassword && (
                            <div className="form-field">
                                <label htmlFor="room-password">
                                    Room password{" "}
                                    {create && <span>Optional</span>}
                                </label>
                                <div className="password-field">
                                    <LockKeyhole size={16} />
                                    <input
                                        id="room-password"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        value={password}
                                        required={!create}
                                        autoComplete={
                                            create
                                                ? "new-password"
                                                : "current-password"
                                        }
                                        placeholder={
                                            create
                                                ? "Leave empty for an open room"
                                                : "Enter the password from your host"
                                        }
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                    <button
                                        type="button"
                                        aria-label={
                                            showPassword
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    >
                                        {showPassword ? (
                                            <EyeOff size={17} />
                                        ) : (
                                            <Eye size={17} />
                                        )}
                                    </button>
                                </div>
                                {create && (
                                    <small>
                                        Only people with the password can enter
                                        a protected room.
                                    </small>
                                )}
                            </div>
                        )}
                        <div className="camera-check">
                            <div className="camera-label">
                                <Video size={18} />
                                <span>
                                    <strong>Camera & microphone</strong>
                                    <small>
                                        Optional. You can turn them on inside.
                                    </small>
                                </span>
                            </div>
                            {stream ? (
                                <div className="camera-preview">
                                    <VideoPlayer
                                        stream={stream}
                                        muted
                                        className="preview-video"
                                    />
                                    <WebcamButtons
                                        shouldShowDisconnectButton={false}
                                    />
                                    <button
                                        type="button"
                                        className="back-link"
                                        onClick={() =>
                                            store.dispatch(
                                                disconnectFromVideoCall(),
                                            )
                                        }
                                    >
                                        <VideoOff size={15} /> Turn off preview
                                    </button>
                                </div>
                            ) : (
                                <button
                                    className="camera-button"
                                    type="button"
                                    onClick={startCamera}
                                    disabled={cameraLoading}
                                >
                                    {cameraLoading ? (
                                        <LoaderCircle
                                            size={15}
                                            className="animate-spin"
                                        />
                                    ) : (
                                        <Video size={15} />
                                    )}{" "}
                                    Test camera
                                </button>
                            )}
                        </div>
                        {cameraError && (
                            <p className="form-message" role="status">
                                {cameraError}
                            </p>
                        )}
                        {error && (
                            <p className="form-error" role="alert">
                                {error}
                            </p>
                        )}
                        <button
                            className="cave-button primary submit-room"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <LoaderCircle
                                        size={18}
                                        className="animate-spin"
                                    />{" "}
                                    Connecting…
                                </>
                            ) : (
                                <>
                                    {create
                                        ? "Create room & step inside"
                                        : "Join room & say hello"}
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                        <div className="setup-reassurance">
                            <ShieldCheck size={14} /> No account needed. Just
                            good company.
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
