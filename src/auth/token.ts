import { cookies } from "next/headers"

export async function getToken() {
    const cookie = await cookies()
    return cookie.get('CASHTRACKER_TOKEN')?.value
}