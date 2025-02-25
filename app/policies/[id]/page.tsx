import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock detailed policy data
const policy = {
  id: 1,
  title: "Agricultural Modernization Policy",
  summary: {
    en: "Focuses on modernizing farming practices and improving food security through technology adoption.",
    sn: "Kuwedzera unyanzvi hwekurima nekushandisa nzira dzazvino dzekurima.",
  },
  details: {
    en: {
      objectives: [
        "Increase agricultural productivity through modern farming techniques",
        "Improve food security across all provinces",
        "Support small-scale farmers with technology adoption",
      ],
      implementation:
        "The policy will be implemented in phases over a 5-year period, starting with pilot programs in key agricultural regions.",
      impact: "Expected to benefit over 500,000 farmers and increase crop yields by 40%",
    },
    sn: {
      objectives: [
        "Kuwedzera zvibereko zvekurima kuburikidza nemitoro itsva",
        "Kuwedzera kudya munyika yese",
        "Kubatsira varimi vadiki kushandisa teknoroji itsva",
      ],
      implementation: "Hurongwa uhu huchaitwa mumakore mashanu, kutanga neminda yekuedza munzvimbo dzinonyanya kurima.",
      impact: "Hunofungidzirwa kubatsira varimi vanopfuura 500,000 nekuwedzera goho ne40%",
    },
  },
  category: "Agriculture",
  date: "2024-02-20",
  status: "Active",
}

export default function PolicyDetail({ params }: { params: { id: string } }) {
  return (
    <div className="container py-10">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{policy.title}</CardTitle>
            <CardDescription>
              {policy.category} • Published: {policy.date} • Status: {policy.status}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="english">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="english">English</TabsTrigger>
                <TabsTrigger value="shona">Shona</TabsTrigger>
              </TabsList>
              <TabsContent value="english" className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Summary</h3>
                  <p>{policy.summary.en}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Objectives</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    {policy.details.en.objectives.map((objective, index) => (
                      <li key={index}>{objective}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Implementation</h3>
                  <p>{policy.details.en.implementation}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Expected Impact</h3>
                  <p>{policy.details.en.impact}</p>
                </div>
              </TabsContent>
              <TabsContent value="shona" className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Pfupiso</h3>
                  <p>{policy.summary.sn}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Zvinangwa</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    {policy.details.sn.objectives.map((objective, index) => (
                      <li key={index}>{objective}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Mashandiro</h3>
                  <p>{policy.details.sn.implementation}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Zvatarisirwa</h3>
                  <p>{policy.details.sn.impact}</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

