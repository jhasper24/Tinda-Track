import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function StatsCard({ title, value }: { title: string; value: string }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="font-bold text-2xl">{value}</div>
      </CardContent>
    </Card>
  )
}
