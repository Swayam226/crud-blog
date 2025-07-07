import Link from 'next/link';

export default function Header() {
    return (
        <header className="w-full py-4 border-b border-[#E0D7C6] bg-[#FAF3E0] text-center">
            <nav className="flex justify-center gap-8 font-serif text-lg">
                <Link href="/" className="hover:underline text-[#7B3F00]">Home</Link>
                <Link href="/admin" className="hover:underline text-[#7B3F00]">My Profile</Link>
            </nav>
        </header>
    );
}
