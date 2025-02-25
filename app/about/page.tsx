import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Globe } from "lucide-react"

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Mission Section */}
      <section className="py-12 md:py-24 lg:py-32 bg-[#006400] text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Mission</h1>
            <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              GovVoice is dedicated to bridging the urban-rural divide in governance through innovative communication
              channels. We believe in empowering every citizen to participate in the democratic process, regardless of
              their location or technological access.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter text-center mb-8">Our Team</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Leadership</CardTitle>
                <CardDescription>Executive Team</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li>
                    <h3 className="font-semibold">Sarah Moyo</h3>
                    <p className="text-sm text-muted-foreground">Chief Executive Officer</p>
                  </li>
                  <li>
                    <h3 className="font-semibold">John Banda</h3>
                    <p className="text-sm text-muted-foreground">Chief Technology Officer</p>
                  </li>
                  <li>
                    <h3 className="font-semibold">Grace Mutasa</h3>
                    <p className="text-sm text-muted-foreground">Chief Operations Officer</p>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Technical Team</CardTitle>
                <CardDescription>Development & Support</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li>
                    <h3 className="font-semibold">David Ncube</h3>
                    <p className="text-sm text-muted-foreground">Lead Developer</p>
                  </li>
                  <li>
                    <h3 className="font-semibold">Mary Chigumba</h3>
                    <p className="text-sm text-muted-foreground">UX Designer</p>
                  </li>
                  <li>
                    <h3 className="font-semibold">Peter Dube</h3>
                    <p className="text-sm text-muted-foreground">System Administrator</p>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Community Team</CardTitle>
                <CardDescription>Outreach & Support</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li>
                    <h3 className="font-semibold">Ruth Shumba</h3>
                    <p className="text-sm text-muted-foreground">Community Manager</p>
                  </li>
                  <li>
                    <h3 className="font-semibold">Tom Makoni</h3>
                    <p className="text-sm text-muted-foreground">Rural Liaison</p>
                  </li>
                  <li>
                    <h3 className="font-semibold">Jane Tandi</h3>
                    <p className="text-sm text-muted-foreground">Support Lead</p>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Get in touch with us</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <p>123 Main Street, Harare, Zimbabwe</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <p>+263 XX XXX XXXX</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <p>contact@govvoice.co.zw</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4" />
                  <p>www.govvoice.co.zw</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Support Hours</CardTitle>
                <CardDescription>When you can reach us</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold">Office Hours</h3>
                  <p className="text-sm text-muted-foreground">
                    Monday - Friday: 8:00 AM - 5:00 PM
                    <br />
                    Saturday: 9:00 AM - 1:00 PM
                    <br />
                    Sunday: Closed
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold">24/7 Services</h3>
                  <p className="text-sm text-muted-foreground">
                    SMS Feedback: Always Available
                    <br />
                    Chatbot: Always Available
                    <br />
                    Emergency Support: Always Available
                  </p>
                </div>
                <Button className="w-full">
                  <Mail className="mr-2 h-4 w-4" /> Send us a Message
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

