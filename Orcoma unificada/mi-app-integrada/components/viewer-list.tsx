import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Person {
  nombre: string
  apellido: string
}

interface ViewerListProps {
  people: Person[]
}

export function ViewerList({ people }: ViewerListProps) {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Video Viewers</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <div className="space-y-4">
            {people.map((person, index) => (
              <div key={index} className="flex items-center">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {person.nombre} {person.apellido}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

