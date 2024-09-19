"use client"

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { useToast } from "@/hooks/use-toast"

interface FeedbackData {
  name: string;
  email: string;
  contactNo: string;
  message: string;
}

const Feedback = ({closeDialog}: {closeDialog: () => void}) => {

  const { toast } = useToast()

  const [formData, setFormData] = useState<FeedbackData>({
    name: '',
    email: '',
    contactNo: '',
    message: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        toast({
          variant: 'success',
          title: "Feedback Sent Successfully",
        })
        setFormData({
          name: '',
          email: '',
          contactNo: '',
          message: ''
        });
        closeDialog();
      } else {
        throw new Error('Failed to submit feedback');
      }
    } catch (error) {
      alert('Error submitting feedback: ' + (error as Error).message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-2 md:space-y-4 w-full">
        <div className='flex gap-2 md:gap-4'>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className='rounded-lg border-primary'
            placeholder='Name'
            required
          />
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className='rounded-lg border-primary'
            placeholder='Email'
            required
          />
        </div>
        <div>
          <Input
            type="text"
            id="contactNo"
            name="contactNo"
            value={formData.contactNo}
            onChange={handleChange}
            className='rounded-lg border-primary'
            placeholder='Contact Number'
            required
          />
        </div>
        <div>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className='rounded-lg resize-none h-20 border-primary'
            placeholder='Write your feedback here...'
            required
          />
        </div>
        <Button type="submit" variant={"default"} className='w-full rounded-lg'>Send Feedback</Button>
      </div>
    </form>
  )
}

export default Feedback