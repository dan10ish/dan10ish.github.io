import FindsClient from "./FindsClient"
import { getTILEntries } from "../../lib/client"

export const revalidate = 300

export default async function FindsPage() {
    const entries = await getTILEntries()
    return <FindsClient entries={entries} />
}
