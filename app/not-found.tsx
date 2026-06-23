import Link from "next/link";

export default function NotFound() {
    return (
        <div className="px-6 pt-6 pb-12 md:px-8 md:pt-8 md:pb-12">
            <div className="space-y-8">
                <div className="block w-full text-left text-[15px] leading-snug font-semibold tracking-tight space-y-2">
                    <div>404</div>
                    <div className="text-[13px] leading-snug font-medium text-secondary tracking-tight">
                        Page Not Found
                    </div>
                </div>

                <div className="text-[13px] leading-snug font-medium tracking-tight pt-4">
                    <Link href="/" className="hover:opacity-80 transition-opacity bg-[var(--border)] px-3 py-1.5 rounded-md">
                        Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
