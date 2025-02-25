"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    total: 234,
  },
  {
    name: "Feb",
    total: 345,
  },
  {
    name: "Mar",
    total: 289,
  },
  {
    name: "Apr",
    total: 432,
  },
  {
    name: "May",
    total: 345,
  },
  {
    name: "Jun",
    total: 543,
  },
  {
    name: "Jul",
    total: 489,
  },
  {
    name: "Aug",
    total: 634,
  },
  {
    name: "Sep",
    total: 723,
  },
  {
    name: "Oct",
    total: 642,
  },
  {
    name: "Nov",
    total: 789,
  },
  {
    name: "Dec",
    total: 876,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip />
        <Line type="monotone" dataKey="total" stroke="#006400" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  )
}

