'use client'
import { useRouter } from "next/navigation"
import { SafeListing, SafeUser } from "../types"
import Container from "../components/Container"
import Heading from "../components/Heading"
import ListingCard from "../components/listings/ListingCard"
import { useCallback, useState } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"

interface PropertiesClientProps {
    listings: SafeListing[],
    currentUser?: SafeUser | null
}

function PropertiesClient({listings, currentUser} : PropertiesClientProps) {
    const router = useRouter()
    const [deleteId, setDeleteId] = useState('')

    const onDelete = useCallback((id: string) => {
        setDeleteId(id)
        
        axios.delete(`/api/listings/${id}`)
            .then( () => {
                toast.success('Listing deleted successfully!')
                router.refresh();
            })
            .catch((error) => {
                toast.error(error?.response?.data?.error)
            })
            .finally( () => {
                setDeleteId('')
            })
    },[router])

    return (
      <Container>
        <Heading
          title="Your properties"
          subtitle="Properties you have uploaded."
        />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-8">
            {listings.map((listing: any) => (
                <ListingCard 
                    key={listing.id}
                    data={listing}
                    actionId={listing.id}
                    disabled={deleteId == listing.id}
                    onAction={onDelete}
                    actionLabel="Delete property listing."
                    currentUser={currentUser}
                />
            ))}
        </div>
      </Container>
    );
}

export default PropertiesClient