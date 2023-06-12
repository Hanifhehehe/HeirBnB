import EmptyState from "../components/EmptyState"
import ClientOnly from "../components/ClientOnly"
import FavoritesClient from "./FavoritesClient"

import getCurrentUser from "../actions/getCurrentUser"
import getFavoriteListings from "../actions/getFavoriteListings"

async function Page() {
    const listings = await getFavoriteListings()
    const currentUser = await getCurrentUser()

    if (listings.length == 0) {
        return (
            <ClientOnly>
                <EmptyState title="No favorites found" subtitle="Looks like you have no favorite listings." />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <FavoritesClient
                currentUser={currentUser}
                listings={listings}
            />
        </ClientOnly>
    )
}

export default Page