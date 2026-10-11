import {
    ArrowRight,
    Globe2,
    LockKeyhole,
    MessageCircle,
    MonitorUp,
    MousePointer2,
    Plus,
    Sparkles,
    Video,
} from "lucide-react";
import { useAppSelector } from "../../app/hooks";
import WorldIllustration from "./WorldIllustration";

export default function RoomDecider({
    onPublic,
    onBrowse,
    onCreate,
}: {
    onPublic: () => void;
    onBrowse: () => void;
    onCreate: () => void;
}) {
    const isLoading = useAppSelector((state) => state.room.isLoading);
    return (
        <>
            <section className="landing-hero">
                <div className="hero-copy">
                    <div className="eyebrow">
                        <span className="status-dot" /> YOUR PEOPLE. YOUR LITTLE
                        WORLD.
                    </div>
                    <h1>
                        A little world.
                        <br />A lot of{" "}
                        <span>
                            connection.
                            <svg viewBox="0 0 370 16" aria-hidden="true">
                                <path d="M3 11 Q160 -4 365 8 M40 15 Q200 2 337 12" />
                            </svg>
                        </span>
                    </h1>
                    <p>
                        Skip the meeting link. Walk into a world where catching
                        up, working together, and just hanging out feel a little
                        more human.
                    </p>
                    <div className="hero-actions">
                        <button
                            className="cave-button primary"
                            onClick={onPublic}
                        >
                            Explore the public room <ArrowRight size={18} />
                        </button>
                        <button
                            className="cave-button secondary"
                            onClick={onCreate}
                        >
                            <Plus size={18} /> Create your own
                        </button>
                    </div>
                    <div className="hero-note">
                        <span className="mini-avatars">
                            {["Nancy", "Ash", "Lucy"].map((name) => (
                                <img
                                    key={name}
                                    src={`/assets/characters/single/${name}_idle_anim_20.png`}
                                    alt=""
                                />
                            ))}
                        </span>
                        <span>
                            No downloads. No sign-ups.
                            <br />
                            <strong>Just you, and good company.</strong>
                        </span>
                    </div>
                </div>
                <div className="hero-art">
                    <div className="art-caption">
                        <span className="status-dot" /> A SPACE TO BE TOGETHER{" "}
                        <span>01 / THE COMMON ROOM</span>
                    </div>
                    <WorldIllustration />
                    <div className="floating-chat">
                        <span className="chat-wave">✦</span> Hey, you made it!{" "}
                        <span>👋</span>
                    </div>
                    <div className="floating-call">
                        <Video size={17} />
                        <span>Closer, even from afar</span>
                        <span className="call-bars">
                            <i />
                            <i />
                            <i />
                        </span>
                    </div>
                    <div className="art-bottom">
                        <MousePointer2 size={14} /> Walk over. Say hello. Stay a
                        while.
                    </div>
                </div>
            </section>
            <section className="room-paths" aria-label="Choose your space">
                <button onClick={onPublic}>
                    <span className="path-icon mint">
                        <Globe2 />
                    </span>
                    <span>
                        <strong>Meet someone new</strong>
                        <small>Drop into the public room</small>
                    </span>
                    <ArrowRight className="path-arrow" size={19} />
                </button>
                <button onClick={onBrowse}>
                    <span className="path-icon peach">
                        <LockKeyhole />
                    </span>
                    <span>
                        <strong>Find your people</strong>
                        <small>Browse and join custom rooms</small>
                    </span>
                    <ArrowRight className="path-arrow" size={19} />
                </button>
                <button onClick={onCreate}>
                    <span className="path-icon lavender">
                        <Plus />
                    </span>
                    <span>
                        <strong>Make yourself at home</strong>
                        <small>Create a space of your own</small>
                    </span>
                    <ArrowRight className="path-arrow" size={19} />
                </button>
            </section>
            <section id="how-it-works" className="features-section">
                <div className="section-intro">
                    <span className="eyebrow">LESS FORMAL. MORE TOGETHER.</span>
                    <h2>
                        More than a call.
                        <br />{" "}A place to <em>hang out.</em>
                    </h2>
                    <p>
                        Pick a character, step inside, and let the conversation
                        find you.
                    </p>
                </div>
                <div className="feature-item">
                    <span className="feature-doodle mint">
                        <MessageCircle size={27} />
                        <Sparkles className="doodle-spark" size={17} />
                    </span>
                    <span className="feature-number">01</span>
                    <h3>Walk up. Catch up.</h3>
                    <p>
                        Conversations happen naturally. Get close to someone to
                        connect with proximity voice and video.
                    </p>
                </div>
                <div className="feature-item">
                    <span className="feature-doodle peach">
                        <LockKeyhole size={27} />
                    </span>
                    <span className="feature-number">02</span>
                    <h3>Your room, your crew.</h3>
                    <p>
                        Bring your friends or your team. Add a password when you
                        want to keep your space just for you.
                    </p>
                </div>
                <div className="feature-item">
                    <span className="feature-doodle lavender">
                        <MonitorUp size={27} />
                    </span>
                    <span className="feature-number">03</span>
                    <h3>Make things together.</h3>
                    <p>
                        Find a cozy office, share your screen, and turn a quick
                        chat into your next great idea.
                    </p>
                </div>
            </section>
            <div className="connection-status" role="status">
                <span
                    className={`status-dot ${isLoading ? "connecting" : ""}`}
                />
                {isLoading
                    ? "Connecting to your world…"
                    : "Your world is ready. Come on in."}
            </div>
        </>
    );
}
