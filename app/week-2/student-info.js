import Link from "next/link";

export default function StudentInfo() {
    const name = "Ethen"


    return (
        <div>
            <p>{name}</p>
            <Link href="https://github.com/EthenM/cprg306-assignments">https://github.com/EthenM/cprg306-assignments</Link>
        </div>
    );
}
