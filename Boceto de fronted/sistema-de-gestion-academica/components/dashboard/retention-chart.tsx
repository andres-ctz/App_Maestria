"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { tendenciaRetencion } from "@/lib/mock-data"

const config = {
  retencion: { label: "Retención (%)", color: "var(--chart-1)" },
} satisfies ChartConfig

export function RetentionChart() {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Tendencia de retención</CardTitle>
        <CardDescription>Porcentaje de postulantes activos por semana del curso preparatorio</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="aspect-auto h-64 w-full">
          <AreaChart data={tendenciaRetencion} margin={{ left: 0, right: 8, top: 8 }}>
            <defs>
              <linearGradient id="fillRetencion" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-retencion)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--color-retencion)" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="semana" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis domain={[80, 100]} tickLine={false} axisLine={false} width={32} tickFormatter={(v) => `${v}%`} />
            <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
            <Area
              dataKey="retencion"
              type="monotone"
              stroke="var(--color-retencion)"
              strokeWidth={2}
              fill="url(#fillRetencion)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
