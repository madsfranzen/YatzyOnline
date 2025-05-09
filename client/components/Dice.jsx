import Image from 'next/image'
import React from 'react'

export default function Dice({nr}) {
  return (
    <Image src={`/resources/DiceImages/${nr}.svg`} alt={nr} width={50} height={50}   className="rounded-sm"></Image>
  )
}
