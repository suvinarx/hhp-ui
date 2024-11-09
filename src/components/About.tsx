import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function About() {
  const paragraphs = [
    "HelpingHeartNetwork is a non-profit organization dedicated to addressing the critical issue of homelessness in our communities. Our mission is to empower individuals experiencing homelessness by providing access to essential resources and support services.",
    "Founded by a group of passionate volunteers, HelpingHeartNetwork aims to bridge the gap between those in need and the various assistance programs available. We believe that by creating a centralized platform for information and resources, we can make a significant impact in the lives of homeless individuals and families.",
    "Through our website and community outreach programs, we strive to make a positive difference in the lives of those experiencing homelessness. We believe that everyone deserves a safe place to call home and the opportunity to build a better future.",
    "Join us in our mission to combat homelessness and create a more equitable society for all. Together, we can make a lasting impact and help those in need find hope and stability."
  ]

  const goals = [
    "Provide easy access to information about housing, food, clothing, and employment assistance",
    "Connect individuals with local shelters and support services",
    "Raise awareness about the challenges faced by the homeless community",
    "Advocate for policies that address the root causes of homelessness",
    "Foster a compassionate and inclusive community that supports those in need"
  ]

  const founder = {
    name: "Suhani Sahai",
    title: "Founder & Executive Director",
    bio: "Suhani Sahai has been a passionate advocate for homeless rights for over 15 years. With a background in social work and community organizing, Suhani founded HelpingHeartNetwork to create a centralized platform for resources and support. Her dedication and innovative approach have helped thousands of individuals find housing and stability.",
    imageUrl: "/public/assets/suhani.jpg?height=400&width=400"
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">About Us</h2>
      <div className="grid gap-8">
        {/* Main Content */}
        <Card className="bg-[#FFF5F5]">
          <CardContent className="flex flex-col gap-6 p-6 text-sm md:text-base">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="text-gray-800">
                {paragraph}
              </p>
            ))}
          </CardContent>
        </Card>

        {/* Goals Section */}
        <Card className="bg-[#F0F9FA]">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Our Goals</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="list-disc pl-6 space-y-2">
              {goals.map((goal, index) => (
                <li key={index} className="text-gray-800">
                  {goal}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Founder Section */}
        <Card className="bg-[#FFF5F5]">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Our Founder</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-full md:w-1/3">
                <Image
                  src={founder.imageUrl}
                  alt={founder.name}
                  width={400}
                  height={400}
                  className="rounded-full aspect-square object-cover"
                  priority
                />
              </div>
              <div className="w-full md:w-2/3">
                <h4 className="text-lg font-semibold text-gray-800">{founder.name}</h4>
                <p className="text-gray-600 mb-2">{founder.title}</p>
                <p className="text-gray-800">{founder.bio}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Website Link */}
        <div className="text-center">
          <a
            href="https://www.helpingheartnetwork.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FF9999] hover:text-[#FF7777] transition-colors"
          >
            www.helpingheartnetwork.org
          </a>
        </div>
      </div>
    </div>
  )
}
