export default function NotificationBadge({ count }) {
    if (!count) return null;

    return (
        <span className="border-2 border-black bg-[#FF5E7E] text-black font-mono font-bold text-xs px-2 py-0.5 shadow-[2px_2px_0px_#000] inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-black inline-block"></span>
            {count} NEW
        </span>
    );
}
