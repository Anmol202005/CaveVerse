function point(x: number, y: number, z = 0) {
    return `${320 + x - y},${145 + (x + y) * 0.52 - z}`;
}
function Box({
    x,
    y,
    w,
    d,
    h,
    top,
    side = "#d7ac8c",
    front = "#bc8e71",
}: {
    x: number;
    y: number;
    w: number;
    d: number;
    h: number;
    top: string;
    side?: string;
    front?: string;
}) {
    return (
        <g stroke="#24483b" strokeWidth="1.5" strokeLinejoin="round">
            <polygon
                points={`${point(x, y, h)} ${point(x + w, y, h)} ${point(x + w, y + d, h)} ${point(x, y + d, h)}`}
                fill={top}
            />
            <polygon
                points={`${point(x, y + d, h)} ${point(x + w, y + d, h)} ${point(x + w, y + d)} ${point(x, y + d)}`}
                fill={front}
            />
            <polygon
                points={`${point(x + w, y, h)} ${point(x + w, y + d, h)} ${point(x + w, y + d)} ${point(x + w, y)}`}
                fill={side}
            />
        </g>
    );
}

export default function WorldIllustration({
    className = "",
}: {
    className?: string;
}) {
    return (
        <svg
            className={`world-illustration ${className}`}
            viewBox="0 0 650 465"
            role="img"
            aria-label="An illustrated shared room with a couch, a desk, plants, and friends hanging out"
        >
            <defs>
                <pattern
                    id="floor-lines"
                    width="28"
                    height="28"
                    patternUnits="userSpaceOnUse"
                >
                    <path
                        d="M0 0H28V28"
                        fill="none"
                        stroke="#cfb59a"
                        strokeWidth="1"
                    />
                </pattern>
            </defs>
            <ellipse
                cx="327"
                cy="406"
                rx="237"
                ry="28"
                fill="#b9c9b3"
                opacity=".35"
            />
            <path
                d="M62 279L320 145L578 279V304L320 438L62 304Z"
                fill="#cfad8b"
                stroke="#24483b"
                strokeWidth="2"
                strokeLinejoin="round"
            />
            <path
                d="M62 155L320 21L578 155V279L320 145L62 279Z"
                fill="#d8e5d2"
                stroke="#24483b"
                strokeWidth="2"
                strokeLinejoin="round"
            />
            <path
                d="M320 21V145L62 279V155Z"
                fill="#c0d5be"
                stroke="#24483b"
                strokeWidth="2"
            />
            <path
                d="M62 279L320 145L578 279L320 413Z"
                fill="#f1dfc6"
                stroke="#24483b"
                strokeWidth="2"
            />
            <g transform="matrix(1 .52 -1 .52 320 145)">
                <rect width="258" height="258" fill="url(#floor-lines)" />
                <rect
                    x="61"
                    y="74"
                    width="139"
                    height="122"
                    rx="12"
                    fill="#efad96"
                    stroke="#ce8d7a"
                    strokeWidth="2"
                />
                <rect
                    x="68"
                    y="81"
                    width="125"
                    height="108"
                    rx="8"
                    fill="none"
                    stroke="#f6c4ae"
                    strokeWidth="3"
                />
                <path
                    d="M116 101v68m-14-54h28m-28 26h28"
                    stroke="#f5c4ac"
                    strokeWidth="5"
                />
            </g>
            <g stroke="#24483b" strokeWidth="2" strokeLinejoin="round">
                <path d="M104 154L227 90V171L104 235Z" fill="#f5efe0" />
                <path d="M112 158L219 103V166L112 222Z" fill="#b8d8db" />
                <path d="M165 131V195M112 190L219 135" fill="none" />
                <path
                    d="M124 159L147 147M177 166L199 154"
                    stroke="#eef9f5"
                    strokeWidth="5"
                />
                <path d="M397 93L459 126V182L397 150Z" fill="#fcf7e9" />
                <path
                    d="M406 142L421 123L435 154L451 150"
                    fill="#eaa68b"
                    stroke="none"
                />
                <circle cx="442" cy="136" r="7" fill="#edbc67" stroke="none" />
            </g>
            <Box
                x={16}
                y={28}
                w={85}
                d={31}
                h={34}
                top="#efb563"
                side="#c3934b"
                front="#d9a657"
            />
            <Box
                x={16}
                y={25}
                w={85}
                d={9}
                h={56}
                top="#f7ce87"
                side="#d9a657"
                front="#e9b363"
            />
            <Box
                x={16}
                y={28}
                w={11}
                d={36}
                h={43}
                top="#f7ce87"
                side="#d9a657"
                front="#e9b363"
            />
            <Box
                x={90}
                y={28}
                w={11}
                d={36}
                h={43}
                top="#f7ce87"
                side="#d9a657"
                front="#e9b363"
            />
            <Box
                x={35}
                y={36}
                w={23}
                d={18}
                h={38}
                top="#fff0cb"
                side="#ead9b0"
                front="#ead9b0"
            />
            <Box
                x={68}
                y={36}
                w={19}
                d={18}
                h={38}
                top="#fff0cb"
                side="#ead9b0"
                front="#ead9b0"
            />
            <Box
                x={67}
                y={102}
                w={69}
                d={40}
                h={22}
                top="#faf2e3"
                side="#c8a382"
                front="#ddbb9b"
            />
            <g transform="matrix(1 .52 -1 .52 320 123)">
                <rect
                    x="85"
                    y="112"
                    width="23"
                    height="15"
                    rx="1"
                    fill="#719b85"
                />
                <circle
                    cx="121"
                    cy="120"
                    r="5"
                    fill="#faf8ee"
                    stroke="#24483b"
                    strokeWidth="1.5"
                />
            </g>
            <Box
                x={179}
                y={16}
                w={57}
                d={43}
                h={43}
                top="#f5dfbd"
                side="#bc9370"
                front="#d5b38a"
            />
            <Box
                x={187}
                y={22}
                w={31}
                d={5}
                h={74}
                top="#47685b"
                side="#24483b"
                front="#406153"
            />
            <polygon
                points={`${point(190, 28, 69)} ${point(214, 28, 69)} ${point(214, 28, 51)} ${point(190, 28, 51)}`}
                fill="#dce8b8"
            />
            <g transform="matrix(1 .52 -1 .52 320 102)">
                <rect
                    x="188"
                    y="39"
                    width="32"
                    height="12"
                    rx="2"
                    fill="#739283"
                    stroke="#24483b"
                    strokeWidth="1.5"
                />
            </g>
            <Box
                x={187}
                y={75}
                w={32}
                d={28}
                h={24}
                top="#7c9c81"
                side="#476f54"
                front="#628868"
            />
            <Box
                x={189}
                y={96}
                w={28}
                d={6}
                h={48}
                top="#a0bba3"
                side="#476f54"
                front="#628868"
            />
            <Box
                x={25}
                y={199}
                w={38}
                d={34}
                h={32}
                top="#83a78d"
                side="#52785c"
                front="#628868"
            />
            <Box
                x={22}
                y={198}
                w={8}
                d={37}
                h={44}
                top="#a0bba3"
                side="#476f54"
                front="#628868"
            />
            <Box
                x={22}
                y={230}
                w={43}
                d={7}
                h={48}
                top="#a0bba3"
                side="#476f54"
                front="#628868"
            />
            <g stroke="#24483b" strokeWidth="1.5">
                <path d="M536 268l-5 28h-23l-5-28Z" fill="#e59b7d" />
                <ellipse cx="519" cy="268" rx="16" ry="6" fill="#a87557" />
                <path d="M519 270v-62" />
                <path
                    d="M519 244c-36-4-32-33-28-39 20 1 30 21 28 39Z"
                    fill="#668e69"
                />
                <path
                    d="M519 231c30-4 31-28 27-39-18 3-28 17-27 39Z"
                    fill="#86aa7b"
                />
                <path
                    d="M519 217c-14-3-15-27-7-36 12 7 18 21 7 36Z"
                    fill="#a6bc82"
                />
            </g>
            <g stroke="#24483b" strokeWidth="1.5">
                <path d="M124 270l4 19h20l4-19Z" fill="#e59b7d" />
                <ellipse cx="138" cy="270" rx="14" ry="5" fill="#a87557" />
                <path d="M138 269v-31" />
                <ellipse
                    cx="127"
                    cy="246"
                    rx="9"
                    ry="17"
                    transform="rotate(-35 127 246)"
                    fill="#719667"
                />
                <ellipse
                    cx="145"
                    cy="239"
                    rx="9"
                    ry="18"
                    transform="rotate(25 145 239)"
                    fill="#92ad7c"
                />
            </g>
            <g style={{ imageRendering: "pixelated" }}>
                <image
                    href="/assets/characters/single/Nancy_idle_anim_20.png"
                    x="261"
                    y="239"
                    width="49"
                    height="67"
                />
                <image
                    href="/assets/characters/single/Ash_idle_anim_20.png"
                    x="381"
                    y="282"
                    width="49"
                    height="67"
                />
                <image
                    href="/assets/characters/single/Lucy_idle_anim_20.png"
                    x="189"
                    y="316"
                    width="49"
                    height="67"
                />
            </g>
            <g fill="#faf8ee" stroke="#24483b" strokeWidth="1.4">
                <rect x="269" y="215" width="39" height="24" rx="10" />
                <path d="M280 239l-5 6v-8" />
                <rect x="390" y="255" width="39" height="24" rx="10" />
            </g>
            <g fill="#e58d73">
                <circle cx="280" cy="227" r="2" />
                <circle cx="288" cy="227" r="2" />
                <circle cx="296" cy="227" r="2" />
                <path d="M408 265c-8-8-13 4 0 10 13-6 8-18 0-10" />
            </g>
            <g fill="#7b977c">
                <path d="M582 74l3 9 9 3-9 3-3 9-3-9-9-3 9-3Z" />
                <path d="M67 356l2 6 6 2-6 2-2 6-2-6-6-2 6-2Z" />
            </g>
        </svg>
    );
}
