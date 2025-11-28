import Link from "next/link";

export default function NotFound() {
    return (
        <div className="px-6 pt-6 pb-12">
            <div className="space-y-8">
                <div className="block w-full text-left text-[22px] md:text-[28px] leading-[1.1] font-semibold tracking-tight space-y-2">
                    <div>404</div>
                    <div className="text-[16px] md:text-[20px] leading-[1.1] font-medium text-secondary tracking-tight">
                        Page Not Found
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="text-[16px] md:text-[20px] leading-[1.1] font-medium text-secondary tracking-tight">
                        The page you are looking for does not exist.
                    </div>
                    <div className="text-[18px] md:text-[22px] leading-[1.1] font-semibold tracking-tight text-background pt-4 space-x-2">
                        <Link href="/" className="hover:opacity-50 transition-opacity bg-secondary px-3 py-1.5 rounded-lg">
                            Home
                        </Link>
                        <Link href="/finds" className="hover:opacity-50 transition-opacity bg-secondary px-3 py-1.5 rounded-lg">
                            Finds
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
