import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ViewCountProps {
  count: number
}

export function ViewCount({ count }: ViewCountProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Views</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{count.toLocaleString()}</div>
      </CardContent>
    </Card>
  )
}

