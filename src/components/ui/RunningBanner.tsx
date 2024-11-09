'use client'

import React, { useEffect, useState } from 'react'
import { Card } from "@/components/ui/card"

const events = [
  "Food Drive: Saturday at Central Park",
  "Free Health Clinic: Every Tuesday",
  "Job Fair: Next Wednesday at Community Center",
  "Clothing Donation: Ongoing at City Hall"
]

export function RunningBanner() {
  const [currentEventIndex, setCurrentEventIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentEventIndex((prevIndex) => (prevIndex + 1) % events.length)
    }, 5000) // Change event every 5 seconds

    return () => clearInterval(timer)
  }, [])

  return (
    <Card className="w-full bg-[#f9d3c5] p-2 overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee">
        {events.map((event, index) => (
          <span
            key={index}
            className="inline-block px-4 font-semibold"
            aria-live={index === currentEventIndex ? "polite" : "off"}
          >
            {event}
          </span>
        ))}
      </div>
    </Card>
  )
}
