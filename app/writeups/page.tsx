import { getAllWriteups } from "@/lib/mdx";
import WriteupsList from "./WriteupsList";

export const metadata = {
    title: "Write-Ups | CTF Journal",
    description: "Browse detailed CTF write-ups and cybersecurity articles.",
};

export default function WriteupsPage() {
    const writeups = getAllWriteups();
    return <WriteupsList writeups={writeups} />;
}
