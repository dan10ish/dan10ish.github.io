import FindsClient from "./FindsClient"
import { getTILEntries } from "../../lib/client"

export const revalidate = 60

export default async function FindsPage() {
    const entries = await getTILEntries()
    return <FindsClient entries={entries} />
}
