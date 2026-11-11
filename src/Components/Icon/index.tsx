import type { ReactNode, SVGProps } from "react";

export type IconName =
  | "arrow-right"
  | "bell"
  | "chevron-down"
  | "clock"
  | "copy"
  | "external-link"
  | "home"
  | "inbox"
  | "link"
  | "scissors"
  | "search"
  | "settings"
  | "trash";

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
}

const paths: Record<IconName, ReactNode> = {
  "arrow-right": (
    <>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  bell: (
    <>
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
      <path d="M10 21h4" />
    </>
  ),
  "chevron-down": <path d="m6 9 6 6 6-6" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  copy: (
    <>
      <rect width="12" height="12" x="9" y="9" rx="2" />
      <path d="M15 9V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h4" />
    </>
  ),
  "external-link": (
    <>
      <path d="M15 3h6v6" />
      <path d="m10 14 11-11" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </>
  ),
  home: (
    <>
      <path d="m3 11 9-8 9 8" />
      <path d="M5 10v10h14V10" />
      <path d="M9 20v-6h6v6" />
    </>
  ),
  inbox: (
    <>
      <path d="M4 4h16l2 10v6H2v-6L4 4Z" />
      <path d="M2 14h5l2 3h6l2-3h5" />
    </>
  ),
  link: (
    <>
      <path d="M10 13a5 5 0 0 0 7.07.07l2-2A5 5 0 0 0 12 4l-1.15 1.15" />
      <path d="M14 11a5 5 0 0 0-7.07-.07l-2 2A5 5 0 0 0 12 20l1.15-1.15" />
    </>
  ),
  scissors: (
    <>
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="m8.7 7.3 12.1 10.4M8.7 16.7l4.1-3.5M14.5 10.5l6.3-5.2" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19 15a2 2 0 0 0 .4 2.1l-2.3 2.3A2 2 0 0 0 15 19a2 2 0 0 0-1.4 1.5V21h-3.2v-.5A2 2 0 0 0 9 19a2 2 0 0 0-2.1.4l-2.3-2.3A2 2 0 0 0 5 15a2 2 0 0 0-1.5-1.4H3v-3.2h.5A2 2 0 0 0 5 9a2 2 0 0 0-.4-2.1l2.3-2.3A2 2 0 0 0 9 5a2 2 0 0 0 1.4-1.5V3h3.2v.5A2 2 0 0 0 15 5a2 2 0 0 0 2.1-.4l2.3 2.3A2 2 0 0 0 19 9a2 2 0 0 0 1.5 1.4h.5v3.2h-.5A2 2 0 0 0 19 15Z" />
    </>
  ),
  trash: (
    <>
      <path d="M3 6h18M8 6V4h8v2m3 0-1 15H6L5 6M10 11v5m4-5v5" />
    </>
  ),
};

export default function Icon({ name, size = 24, ...props }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      {...props}
    >
      <g
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        {paths[name]}
      </g>
    </svg>
  );
}
