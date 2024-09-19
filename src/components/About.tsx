import React from 'react'

const para1 = "Help Homeless People (HHP) is a non-profit organization dedicated to addressing the critical issue of homelessness in our communities. Our mission is to empower individuals experiencing homelessness by providing access to essential resources and support services."
const para2 = "Founded by a group of passionate volunteers, HHP aims to bridge the gap between those in need and the various assistance programs available. We believe that by creating a centralized platform for information and resources, we can make a significant impact in the lives of homeless individuals and families."

const goal1 = "Provide easy access to information about housing, food, clothing, and employment assistance"
const goal2 = "Connect individuals with local shelters and support services"
const goal3 = "Raise awareness about the challenges faced by the homeless community"
const goal4 = "Advocate for policies that address the root causes of homelessness"
const goal5 = "Foster a compassionate and inclusive community that supports those in need"

const para3 = "Through our website and community outreach programs, we strive to make a positive difference in the lives of those experiencing homelessness. We believe that everyone deserves a safe place to call home and the opportunity to build a better future."
const para4 = "Join us in our mission to combat homelessness and create a more equitable society for all. Together, we can make a lasting impact and help those in need find hope and stability."

const About = () => {
    return (
        <div id='about' className="flex flex-col gap-4">
            <h2 className="text-xl md:text-2xl font-bold">About Us</h2>
            <div className="flex flex-col gap-2 text-xs md:text-base">
                <p>{para1}</p>

                <p>{para2}</p>

                <h3 className='text-lg font-semibold'>Our Goals</h3>
                <ul className='md:list-disc'>
                    <li>{goal1}</li>
                    <li>{goal2}</li>
                    <li>{goal3}</li>
                    <li>{goal4}</li>
                    <li>{goal5}</li>
                </ul>

                <p>{para3}</p>

                <p>{para4}</p>
            </div>
        </div>
    )
}

export default About