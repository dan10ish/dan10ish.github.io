import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-dvh flex items-center justify-center px-8 py-12 md:px-10">
            <div className="w-full max-w-md">
                <div className="space-y-8">
                    <div className="block w-full text-left text-[22px] md:text-[28px] leading-[1.1] font-semibold tracking-tight space-y-2">
                        <div>404</div>
                        <div className="text-[16px] md:text-[20px] leading-[1.1] font-medium text-secondary tracking-tight">
                            Page Not Found
                        </div>
                    </div>

                    <div className="pt-2 flex gap-3">
                        <Link
                            prefetch
                            href="/"
                            className="inline-flex items-center gap-2 px-5 py-2.5 text-[15px] font-medium rounded-full bg-[var(--button-bg)] text-[var(--foreground)] hover:bg-[var(--button-bg-hover)] transition-all duration-200 group"
                        >
                            <span>Home</span>
                            <svg
                                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                        <Link
                            prefetch
                            href="/finds"
                            className="inline-flex items-center gap-2 px-5 py-2.5 text-[15px] font-medium rounded-full bg-[var(--button-bg)] text-[var(--foreground)] hover:bg-[var(--button-bg-hover)] transition-all duration-200 group"
                        >
                            <span>Finds</span>
                            <svg
                                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
