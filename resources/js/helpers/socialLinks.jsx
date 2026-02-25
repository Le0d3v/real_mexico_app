import TikTok from "../views/public/TikTok";
import { Facebook, Instagram, Youtube } from "lucide-react";

const styles =
    "hover:text-yellow-400 transition hover:-translate-y-1 cursor-pointer";

const socialLinks = [
    {
        name: "Facebook",
        icon: <Facebook className={styles} />,
        url: "https://www.facebook.com/realdemexico",
    },
    {
        name: "Instagram",
        icon: <Instagram className={styles} />,
        url: "https://www.instagram.com/realdemexico_",
    },
    {
        name: "TikTok",
        icon: <TikTok className={styles} />,
        url: "https://www.tiktok.com/@realdemexico_",
    },
    {
        name: "YouTube",
        icon: <Youtube className={styles} />,
        url: "https://www.youtube.com/@realdemexico",
    },
];

export default socialLinks;
