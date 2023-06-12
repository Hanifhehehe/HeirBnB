import getCurrentUser from "../actions/getCurrentUser"
import getListings from "../actions/getListings"
import ClientOnly from "../components/ClientOnly"
import EmptyState from "../components/EmptyState"
import PropertiesClient from "./PropertiesClient"


async function Page() {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        <ClientOnly>
            <EmptyState 
                title="Unauthorized"
                subtitle="Please login to continue."
            />
        </ClientOnly>
    }
    
    const listings = await getListings({
        userId: currentUser?.id,
    })
    
    if (listings.length === 0) {
        <ClientOnly>
            <EmptyState 
                title="No properties found!"
                subtitle="Looks like you have not uploaded any properties my lord."
            />
        </ClientOnly>
    }

    return (
        <ClientOnly>
            <PropertiesClient
                listings={listings}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default Page