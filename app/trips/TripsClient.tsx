'use client'
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";

import { SafeReservation, SafeUser } from "../types";

interface TripsClientProps {
  reservations: SafeReservation[],
  currentUser?: SafeUser | null,
}

function TripsClient({ reservations, currentUser }: TripsClientProps) {
    const router = useRouter()
    const [deleteId, setDeleteId] = useState('')

    const onCancel = useCallback((id: string) => {
        setDeleteId(id)
        axios.delete(`/api/reservations/${id}`)
        .then(() => {
            toast.success('Reservations cancelled!')
            setDeleteId('')
            router.refresh()
        })
        .catch(err => {
            toast.error(err?.response?.data?.error)
        })
    }, [router])
    return (
        <Container>
            <Heading
                title="My trips"
                subtitle="Where you've been and where you're heading"
            />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-8">
                {reservations.map((reservation: any) => 
                    <ListingCard 
                        key={reservation.id}
                        data={reservation.listing}
                        reservation={reservation}
                        actionId={reservation.id}
                        onAction={onCancel}
                        disabled={deleteId === reservation.id}
                        actionLabel="Cancel reservation"
                        currentUser={currentUser}
                    />
                )}
            </div>
        </Container>
    );
}

export default TripsClient;
