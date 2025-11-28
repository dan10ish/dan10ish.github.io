import Link from "next/link";

export default function NotFound() {
    return (
        <div className="px-6 pt-6 pb-12 md:px-8 md:pt-8 md:pb-12">
            <div className="space-y-8">
                <div className="block w-full text-left text-[22px] md:text-[28px] leading-[1.1] font-semibold tracking-tight space-y-2">
                    <div>404</div>
                    <div className="text-[16px] md:text-[20px] leading-[1.1] font-medium text-secondary tracking-tight">
                        Page Not Found
                    </div>
                </div>

                <div className="text-[22px] md:text-[24px] leading-[1.1] font-semibold tracking-tight text-primary pt-4 flex gap-3">
                    <Link href="/" className="hover:opacity-80 transition-opacity bg-[var(--border)] px-3.5 py-2 rounded-lg">
                        Home
                    </Link>
                    <Link href="/finds" className="hover:opacity-80 transition-opacity bg-[var(--border)] px-3.5 py-2 rounded-lg">
                        Finds
                    </Link>
                </div>
            </div>
        </div>
    );
}
