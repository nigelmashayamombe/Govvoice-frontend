"use client"

import { Card } from "@/components/ui/card"

// Mock data for regions
const regions = [
  { name: "Harare", sentiment: 0.8 },
  { name: "Bulawayo", sentiment: 0.6 },
  { name: "Manicaland", sentiment: 0.7 },
  { name: "Mashonaland Central", sentiment: 0.5 },
  { name: "Mashonaland East", sentiment: 0.6 },
  { name: "Mashonaland West", sentiment: 0.4 },
  { name: "Masvingo", sentiment: 0.7 },
  { name: "Matabeleland North", sentiment: 0.5 },
  { name: "Matabeleland South", sentiment: 0.6 },
  { name: "Midlands", sentiment: 0.5 },
]

export function RegionalHeatmap() {
  const getColor = (sentiment: number) => {
    // Convert sentiment (0-1) to a color scale from red to green
    const red = Math.round(255 * (1 - sentiment))
    const green = Math.round(255 * sentiment)
    return `rgb(${red}, ${green}, 0)`
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {regions.map((region) => (
        <Card
          key={region.name}
          className="p-4"
          style={{
            backgroundColor: getColor(region.sentiment),
            color: region.sentiment > 0.5 ? "white" : "black",
          }}
        >
          <h3 className="font-medium text-sm">{region.name}</h3>
          <p className="text-xs mt-1">Sentiment: {Math.round(region.sentiment * 100)}%</p>
        </Card>
      ))}
    </div>
  )
}

