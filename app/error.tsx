'use client'

import { useEffect } from "react"
import EmptyState from "./components/EmptyState"

interface ErrorStateProps {
    error: Error
}

function ErrorState({error} : ErrorStateProps) {
    useEffect(() => {
        console.error(error)
    }, [error])
    return (
        <EmptyState
            title="Uh oh!"
            subtitle="Something went wrong! Please try again."
         />
    )
}

export default ErrorState