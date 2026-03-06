import TikTok from "../views/public/TikTok";
import { Facebook, Instagram, Youtube } from "lucide-react";

const styles =
    "hover:text-yellow-400 transition hover:-translate-y-1 cursor-pointer";

const socialLinks = [
    {
        name: "Facebook",
        icon: <Facebook className={styles} />,
        url: "https://www.facebook.com/RealdeMexicoSAX",
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
];

export default socialLinks;
