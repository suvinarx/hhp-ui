'use client'

import React, { useEffect, useState } from 'react'
import { Card } from "@/components/ui/card"

const events = [
  "Mary's Place No Child Sleeps Outside: November 16, 2024",
  "Free Health Clinic: Every Tuesday at Seattle Union Gospel Mission",
  "Operation Nightwatch Sock Drive: November 24, 2024 at 12:30 PM",
  "Monthly Food and Supplies Drive: Every Saturday at Pike Place Market",
  "Job Fair: Next Wednesday at Seattle Community Center",
  "Clothing Donation: Ongoing at City Hall",
  "Path with Art Exhibition: October 17 - November 17, 2024",
  "Seattle Homeless Outreach Event: December 14, 2024"
];

export function RunningBanner() {
  const [currentEventIndex, setCurrentEventIndex] = useState(0)
  const [isFlashing, setIsFlashing] = useState(false)

  useEffect(() => {
    const eventTimer = setInterval(() => {
      setCurrentEventIndex((prevIndex) => (prevIndex + 1) % events.length)
      setIsFlashing(true)
      setTimeout(() => setIsFlashing(false), 500) // Flash for 500ms
    }, 5000) // Change event every 5 seconds

    return () => clearInterval(eventTimer)
  }, [])

  return (
    <Card className="w-full bg-[#f9d3c5] p-2 overflow-hidden">
      <div 
        className={`whitespace-nowrap animate-marquee ${isFlashing ? 'animate-flash' : ''}`}
        style={{
          animation: 'marquee 20s linear infinite',
          display: 'inline-block',
        }}
      >
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
