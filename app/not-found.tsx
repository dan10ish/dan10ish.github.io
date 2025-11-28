import Link from "next/link";

export default function NotFound() {
    return (
        <div className="px-8 pt-8 pb-12 md:px-10 md:pt-10 md:pb-12">
            <div className="space-y-8">
                <div className="block w-full text-left text-[22px] md:text-[28px] leading-[1.1] font-semibold tracking-tight space-y-2">
                    <div>404</div>
                    <div className="text-[16px] md:text-[20px] leading-[1.1] font-medium text-secondary tracking-tight">
                        Page Not Found
                    </div>
                </div>

                <div className="text-[20px] md:text-[22px] leading-[1.1] font-semibold tracking-tight text-primary pt-2 flex gap-3">
                    <Link href="/" className="bg-[var(--border)] hover:ring-[var(--link-blue)] hover:ring-1 hover:text-[var(--link-blue)] transition-opacity px-3.5 py-2 rounded-xl transition-all duration-200">
                        Home
                    </Link>
                    <Link href="/finds" className="bg-[var(--border)] hover:ring-[var(--link-blue)] hover:ring-1 hover:text-[var(--link-blue)] transition-opacity px-3.5 py-2 rounded-xl transition-all duration-200">
                        Finds
                    </Link>
                </div>
            </div>
        </div>
    );
}
