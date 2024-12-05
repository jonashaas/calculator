import Link from 'next/link';
import Image from 'next/image';
import ThemeChanger from './ThemeChanger';
export default function NavBar() {
  return (
    <nav className="navbar bg-base-100 shadow-xl">
      <div className="navbar-start pl-4">
        <Link href="/" className="btn btn-ghost text-2xl"><Image src="/logo.png" alt="Logo" width={32} height={32} /> Inline Calculator</Link>
      </div>
      <div className="navbar-end pr-4">
        <ThemeChanger />
      </div>
    </nav>
  );
}
