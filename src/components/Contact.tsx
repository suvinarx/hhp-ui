"use client"

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import Image from 'next/image';
import { useToast } from "@/hooks/use-toast"

interface FormData {
    name: string;
    email: string;
    message: string;
}

const Contact = () => {

    const { toast } = useToast()

    const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                toast({
                    variant: 'success',
                    title: "Message Sent Successfully",
                })
                setFormData({ name: '', email: '', message: '' });
            } else {
                throw new Error('Failed to submit form');
            }
        } catch (error) {
            alert('Error submitting form: ' + (error as Error).message);
        }
    };

    return (
        <div id='contact' className="bg-primary grid grid-cols-1 md:grid-cols-2 justify-center items-center text-white rounded-xl">
            <div className='bg-white flex justify-center items-center h-full'>
                <Image src={'/assets/contact.jpg'} alt={'Contact Us'} width={1000} height={1000} className='object-cover  rounded-t-xl md:rounded-l-xl md:rounded-t-none' />
            </div>
            <div className='p-4 md:p-8'>
                <h2 className="text-xl md:text-2xl font-bold mb-4">Contact Us</h2>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4 w-full">
                        <div className='flex gap-4'>
                            <Input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className='rounded-lg'
                                placeholder='Name'
                                required
                            />
                            <Input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className='rounded-lg'
                                placeholder='Email'
                                required
                            />
                        </div>
                        <div>
                            <Textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className='rounded-lg resize-none h-20'
                                placeholder='Write your message here...'
                                required
                            />
                        </div>
                        <Button type="submit" variant={"secondary"} className='w-full rounded-lg'>Send Message</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Contact