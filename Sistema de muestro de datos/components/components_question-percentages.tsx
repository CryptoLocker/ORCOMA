import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface QuestionPercentagesProps {
  goodPercentage: number
  badPercentage: number
}

export function QuestionPercentages({ goodPercentage, badPercentage }: QuestionPercentagesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Question Quality</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Good Questions</span>
            <span className="text-sm font-medium">{goodPercentage.toFixed(1)}%</span>
          </div>
          <Progress value={goodPercentage} className="h-2" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Bad Questions</span>
            <span className="text-sm font-medium">{badPercentage.toFixed(1)}%</span>
          </div>
          <Progress value={badPercentage} className="h-2" />
        </div>
      </CardContent>
    </Card>
  )
}

