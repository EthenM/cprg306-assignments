import Link from "next/link";

export const metadata = {
  title: "CPRG 306: Home"
}

export default function Home() {
  return (
    <main>
      <h1>CPRG 306: Web Development 2 - Assignments</h1>

      <ul>
        <li><Link href="./week-2">Week-2 Assignment</Link></li>

        <li><Link href="./week-3">Week-3 Assignment</Link></li>
        
        <li><Link href="./week-4">Week-4 Assignment</Link></li>

        <li><Link href="./week-5">Week-5 Assignment</Link></li>
      </ul>
    </main>
  );
}
