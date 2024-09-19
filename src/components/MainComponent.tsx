'use client'

import React, { useState, useEffect } from 'react'
import { Search, ExternalLink } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Image from 'next/image'
import ResourceCard from './ResourceCard'

const resources = [
  {
    title: 'Shelter',
    description: 'Immediate temporary housing and support for individuals and families experiencing homelessness, providing a safe environment and basic necessities.',
    image: "/assets/shelter.jpg",
    category: "Housing Assistance",
    bgColor: "#f9d3c5"
  },
  {
    title: 'Medical Assistance',
    description: 'Access to essential healthcare services, including medical check-ups, mental health support, and assistance with prescriptions for those in need.',
    image: "/assets/medical-assistance.jpg",
    category: "Medical Assistance",
    bgColor: "#f9d3c5"
  },
  {
    title: 'Advocacy',
    description: 'Support and representation for individuals experiencing homelessness, focusing on their rights and needs.',
    image: "/assets/advocacy.jpg",
    category: "Medical Assistance",
    bgColor: "#c5e1e1"
  },
  {
    title: 'Employment Assistance',
    description: 'Assistance with job searches, resume writing, interview preparation, and connecting individuals with potential employers to support financial independence.',
    image: "/assets/employment-assistance.jpg",
    category: "Employment Assistance",
    bgColor: "#c5e1e1"
  },
]

interface OrganizationData {
  Name: string;
  Category: string;
  Phone: string;
  Address: string;
  City: string;
  Zipcode: string;
  Website: string;
}

const Icon3D = ({ children, color }: { children: React.ReactNode; color: string }) => (
  <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center text-xl shadow-lg transform transition-transform duration-200 hover:scale-110`} style={{
    boxShadow: `0 4px 6px rgba(0, 0, 0, 0.1), inset 0 -4px 4px rgba(0, 0, 0, 0.1), inset 0 4px 4px rgba(255, 255, 255, 0.5)`
  }}>
    {children}
  </div>
)

export default function MainComponent() {
  const [assistanceData, setAssistanceData] = useState<OrganizationData[]>([]);
  const [showDetails, setShowDetails] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');  // For input in the main search bar
  const [filteredResults, setFilteredResults] = useState<OrganizationData[]>([]);  // Filtered results based on search
  const [dialogVisible, setDialogVisible] = useState(false);  // To control dialog visibility
  const [dialogSearchTerm, setDialogSearchTerm] = useState(''); // For search inside the dialog


  useEffect(() => {
    fetch('/data.csv')
      .then(response => response.text())
      .then(data => {
        const parsedData = parseCSV(data);
        setAssistanceData(parsedData);
      });
  }, []);

  const parseCSV = (csvText: string): OrganizationData[] => {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',');
    return lines.slice(1).map(line => {
      const values = line.split(',');
      return headers.reduce((obj: Partial<OrganizationData>, header, index) => {
        obj[header.trim() as keyof OrganizationData] = values[index]?.trim();
        return obj;
      }, {} as Partial<OrganizationData>) as OrganizationData;
    });
  };

  const filteredData = (category: string) => {
    return assistanceData.filter(org => org.Category === category);
  };

  const filteredDialogData = filteredResults.filter(org =>
    org.Category && org.Name.toLowerCase().includes(dialogSearchTerm.toLowerCase())
  );  

  const handleSearchClick = () => {
    const results = assistanceData.filter(org => 
      org.Category && org.Category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredResults(results);
    setDialogVisible(true);  // Show the dialog
  };

  return (
    <>

      <div className="bg-primary flex flex-col p-2 md:p-4 md:flex-row justify-center items-center gap-8 md:gap-16 text-white rounded-xl">

        <div className='flex text-primary mt-4'>
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
            className="pl-6 w-60 h-12 rounded-full border-none bg-background z-10"
          />
          <Button onClick={handleSearchClick} className="bg-[#e8a79f] hover:bg-[#e89589] h-12 -ml-8 rounded-l-none rounded-r-full">
            <Search className="text-white ml-6" />
          </Button>
        </div>

        <Dialog open={dialogVisible} onOpenChange={setDialogVisible}>
          <DialogContent className='max-h-[512px] overflow-scroll'>
            <h2 className="text-xl md:text-2xl font-bold">Search Results</h2>

            <div className='mb-4'>
              <Input
                type="text"
                value={dialogSearchTerm}
                onChange={(e) => setDialogSearchTerm(e.target.value)}
                placeholder="Search within results"
                className="pl-6 w-full h-12 rounded-full border-none bg-background"
              />
            </div>

            <div className="overflow-x-auto">
              {filteredDialogData.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[#e8a79f] hover:bg-[#e8a79f]">
                      <TableHead className="text-white font-bold">Name</TableHead>
                      <TableHead className="text-white font-bold">Phone</TableHead>
                      <TableHead className="text-white font-bold">Address</TableHead>
                      <TableHead className="text-white font-bold">City</TableHead>
                      <TableHead className="text-white font-bold">Zipcode</TableHead>
                      <TableHead className="text-white font-bold">Website</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDialogData.map((org, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{org.Name}</TableCell>
                        <TableCell>{org.Phone}</TableCell>
                        <TableCell>{org.Address}</TableCell>
                        <TableCell>{org.City}</TableCell>
                        <TableCell>{org.Zipcode}</TableCell>
                        <TableCell>
                          {org.Website && (
                            <a href={org.Website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center">
                              Visit <ExternalLink className="ml-1 h-4 w-4" />
                            </a>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <span>No data available</span>
              )}
            </div>
          </DialogContent>
        </Dialog>

        <div className='pt-4 -mb-4 hidden lg:flex'>
          <Image src="/assets/house.png" alt="logo" width={180} height={180} className='w-full h-full' />
        </div>

        <div className="grid grid-cols-2 gap-2">
          {[
            { icon: '🏠', label: 'Housing', color: 'bg-[#f9d3c5]', category: 'Housing Assistance' },
            { icon: '👕', label: 'Clothing', color: 'bg-[#c5e1e1]', category: 'Clothing Assistance' },
            { icon: '🍲', label: 'Food', color: 'bg-[#c5e1e1]', category: 'Food Assistance' },
            { icon: '💼', label: 'Employment', color: 'bg-[#c5e1e1]', category: 'Employment Assistance' },
          ].map((item, index) => (
            <Dialog key={index}>
              <DialogTrigger>
                <div
                  className="bg-primary cursor-pointer flex items-center justify-start p-1 space-x-3 transform transition-transform duration-200 hover:scale-105 w-full"
                  onClick={() => setShowDetails(item.category)}
                >
                  <Icon3D color={item.color}>{item.icon}</Icon3D>
                  <span className="font-bold text-sm">{item.label}</span>
                </div>
              </DialogTrigger>
              <DialogContent className='max-h-[512px] overflow-scroll'>
                <h2 className="text-xl md:text-2xl font-bold">{showDetails}</h2>
                <div className="overflow-x-auto">
                  {showDetails && filteredData(showDetails).length > 0 ? (
                    <Table className=''>
                      <TableHeader>
                        <TableRow className="bg-[#e8a79f] hover:bg-[#e8a79f]">
                          <TableHead className="text-white font-bold">Name</TableHead>
                          <TableHead className="text-white font-bold">Phone</TableHead>
                          <TableHead className="text-white font-bold">Address</TableHead>
                          <TableHead className="text-white font-bold">City</TableHead>
                          <TableHead className="text-white font-bold">Zipcode</TableHead>
                          <TableHead className="text-white font-bold">Website</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody className=''>
                        {filteredData(showDetails).map((org, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{org.Name}</TableCell>
                            <TableCell>{org.Phone}</TableCell>
                            <TableCell>{org.Address}</TableCell>
                            <TableCell>{org.City}</TableCell>
                            <TableCell>{org.Zipcode}</TableCell>
                            <TableCell>
                              {org.Website && (
                                <a href={org.Website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center">
                                  Visit <ExternalLink className="ml-1 h-4 w-4" />
                                </a>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <span>No data available</span>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>

        <div className='-mb-2 flex md:hidden'>
          <Image src="/assets/house.png" alt="logo" width={180} height={180} className='w-full h-full' />
        </div>

      </div>

      <div className='flex flex-col gap-8 justify-center items-start'>
        <h2 className='text-xl md:text-2xl font-bold'>Emergency Resources</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4'>
          {resources.map((resource, index) => (
            <Dialog key={index}>
              <DialogTrigger>
                <ResourceCard title={resource.title} description={resource.description} image={resource.image} category={resource.category} bgColor={resource.bgColor} onClick={setShowDetails} />
              </DialogTrigger>
              <DialogContent className='max-h-[512px] overflow-scroll'>
                <h2 className="text-xl md:text-2xl font-bold">{showDetails}</h2>
                <div className="overflow-x-auto">
                  {showDetails && filteredData(showDetails).length > 0 ? (
                    <Table className=''>
                      <TableHeader>
                        <TableRow className="bg-[#e8a79f] hover:bg-[#e8a79f]">
                          <TableHead className="text-white font-bold">Name</TableHead>
                          <TableHead className="text-white font-bold">Phone</TableHead>
                          <TableHead className="text-white font-bold">Address</TableHead>
                          <TableHead className="text-white font-bold">City</TableHead>
                          <TableHead className="text-white font-bold">Zipcode</TableHead>
                          <TableHead className="text-white font-bold">Website</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody className=''>
                        {filteredData(showDetails).map((org, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{org.Name}</TableCell>
                            <TableCell>{org.Phone}</TableCell>
                            <TableCell>{org.Address}</TableCell>
                            <TableCell>{org.City}</TableCell>
                            <TableCell>{org.Zipcode}</TableCell>
                            <TableCell>
                              {org.Website && (
                                <a href={org.Website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center">
                                  Visit <ExternalLink className="ml-1 h-4 w-4" />
                                </a>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <span>No data available</span>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </>
  )
}