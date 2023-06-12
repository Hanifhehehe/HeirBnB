import getCurrentUser from "../actions/getCurrentUser"
import getReservations from "../actions/getReservations"
import ClientOnly from "../components/ClientOnly"
import EmptyState from "../components/EmptyState"
import ReservationClient from "./ReservationClient"

async function ReservationsPage() {
    const currentUser = await getCurrentUser()
    
    if (!currentUser) {
        <ClientOnly>
            <EmptyState title="Unauthorized" subtitle="Please login" />
        </ClientOnly>
    }

    const reservations = await getReservations({
        authorId: currentUser?.id
    })

    if (reservations.length == 0) {
        return (
            <ClientOnly>
                <EmptyState title="No reservations found" subtitle="It looks like you have no reservation on your properties for now" />
            </ClientOnly>
        )
    }
    return (
        <ClientOnly>
            <ReservationClient
                reservations={reservations}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default ReservationsPage