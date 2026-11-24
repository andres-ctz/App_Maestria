"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

const config = {
  bajo: { label: "Bajo", color: "var(--risk-low)" },
  medio: { label: "Medio", color: "var(--risk-medium)" },
  alto: { label: "Alto", color: "var(--risk-high)" },
} satisfies ChartConfig

export function RiskByProgramChart({
  data,
}: {
  data: { programa: string; bajo: number; medio: number; alto: number }[]
}) {
  return (
    <Card className="min-w-0">
      <CardHeader>
        <CardTitle>Riesgo por programa</CardTitle>
        <CardDescription>Distribución según motor de reglas</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="aspect-auto h-64 w-full">
          <BarChart data={data} layout="vertical" margin={{ left: 0, right: 8 }}>
            <CartesianGrid horizontal={false} />
            <XAxis type="number" hide allowDecimals={false} />
            <YAxis dataKey="programa" type="category" tickLine={false} axisLine={false} width={84} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="bajo" stackId="a" fill="var(--color-bajo)" radius={[4, 0, 0, 4]} />
            <Bar dataKey="medio" stackId="a" fill="var(--color-medio)" />
            <Bar dataKey="alto" stackId="a" fill="var(--color-alto)" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
