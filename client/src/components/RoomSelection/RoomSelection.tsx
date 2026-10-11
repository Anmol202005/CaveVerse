import { useState } from "react";
import { ArrowUpRight, Mountain } from "lucide-react";
import RoomDecider from "./RoomDecider";
import JoinOrCreateCustomRoom, {
    type CustomRoom,
} from "./JoinOrCreateCustomRoom";
import RoomSetup from "./RoomSetup";
import "./lobby.css";

type View = "home" | "public" | "rooms" | "create" | "join";

export default function RoomSelection() {
    const [view, setView] = useState<View>("home");
    const [room, setRoom] = useState<CustomRoom>();
    return (
        <div className="cave-lobby">
            <header className="lobby-header">
                <button
                    className="brand"
                    onClick={() => setView("home")}
                    aria-label="CaveVerse home"
                >
                    <span className="brand-mark">
                        <Mountain size={23} strokeWidth={2.4} />
                    </span>
                    Cave<span>Verse</span>
                </button>
                <nav aria-label="Main navigation">
                    <a href="#how-it-works" onClick={() => setView("home")}>
                        How it works
                    </a>
                    {view === "home" && (
                        <a
                            className="github-link"
                            href="https://github.com/Anmol202005/caveverse"
                            target="_blank"
                            rel="noreferrer"
                        >
                            GitHub <ArrowUpRight size={14} />
                        </a>
                    )}
                    <button
                        className="nav-cta"
                        onClick={() => setView("create")}
                    >
                        Create a room <ArrowUpRight size={15} />
                    </button>
                </nav>
            </header>
            <main>
                {view === "home" && (
                    <RoomDecider
                        onPublic={() => setView("public")}
                        onBrowse={() => setView("rooms")}
                        onCreate={() => setView("create")}
                    />
                )}
                {view === "rooms" && (
                    <JoinOrCreateCustomRoom
                        onBack={() => setView("home")}
                        onCreate={() => setView("create")}
                        onJoin={(selected) => {
                            setRoom(selected);
                            setView("join");
                        }}
                    />
                )}
                {(view === "public" ||
                    view === "create" ||
                    view === "join") && (
                    <RoomSetup
                        key={view + (room?.roomId ?? "")}
                        mode={view}
                        room={room}
                        onBack={() =>
                            setView(view === "join" ? "rooms" : "home")
                        }
                    />
                )}
            </main>
            <footer className="lobby-footer">
                <span>A small world, made for real connection.</span>
                <span>
                    Made with a little pixel magic{" "}
                    <span aria-hidden="true">✦</span>
                </span>
            </footer>
        </div>
    );
}
