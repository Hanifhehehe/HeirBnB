'use client'

import Image from "next/image"

interface AvatarProps {
  src: string | null | undefined
}

function Avatar(props: AvatarProps) {
  const {src} = props
  return (
    <Image className="rounded-full" height="30" width="30" alt="Avatar" src={src || `/images/placeholder.jpg`} />
  )
}

export default Avatar