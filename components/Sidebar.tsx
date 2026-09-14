import Image from "next/image";
import { IconInstagram, IconPlay, IconBehance, IconMail, IconClose } from "./icons";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <aside className={`sidebar${open ? " open" : ""}`} aria-hidden={false}>
      <button className="sidebar-close" onClick={onClose} aria-label="Close menu">
        <IconClose />
      </button>

      <div className="brand">
        {/* <svg className="mark" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="19" stroke="#E8A33D" strokeWidth="1.4" />
          <path d="M20 4 L23 17 L36 20 L23 23 L20 36 L17 23 L4 20 L17 17 Z" fill="#E8A33D" />
        </svg> */}
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <Image
            src="/logo.jpeg"
            alt="SwiftMedia Logo"
            width={100}
            height={100}
            className="object-cover w-full h-full rounded-xl"
          />
        </div>
        <div className="brand-name">
          SwiftMedia
          <span>STUDIO</span>
        </div>
      </div>

      <p className="desc">
        A small collective of friends shooting, filming and designing for brands who&apos;d
        rather stand out than fit in.
      </p>

      <div className="stats">
        <div className="stat">
          <div className="stat-num">34</div>
          <div className="stat-label">Clients served</div>
        </div>
        <div className="stat">
          <div className="stat-num">112</div>
          <div className="stat-label">Projects completed</div>
        </div>
      </div>

      <div className="sidebar-foot">
        <p>Find us elsewhere</p>
        <div className="socials">
          <a href="#" aria-label="Instagram" title="Instagram">
            <IconInstagram />
          </a>
          <a href="#" aria-label="Video channel" title="Video channel">
            <IconPlay />
          </a>
          <a href="#" aria-label="Behance" title="Behance">
            <IconBehance />
          </a>
          <a href="#" aria-label="Email" title="Email">
            <IconMail />
          </a>
        </div>
      </div>
    </aside>
  );
}
