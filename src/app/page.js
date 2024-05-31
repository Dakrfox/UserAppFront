import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <ol>
        <li>
          <Link href="/Login">Login</Link>
        </li>
        <li>
          <Link href="/Register">Register</Link>
        </li>
        <li>
          <Link href="/User">User</Link>
        </li>
      </ol>
      
    </main>
  );
}
