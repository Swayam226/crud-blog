export default function Footer() {
    return (
        <footer className="mt-10 py-4 text-center text-sm text-[#5F5F5F] border-t border-[#E0D7C6] bg-[#FAF3E0] font-serif">
            © {new Date().getFullYear()} Blog Haven. All rights reserved.
        </footer>
    );
}
