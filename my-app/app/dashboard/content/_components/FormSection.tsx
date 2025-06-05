"use client"
import React from 'react'
import { TEMPLETE } from '../../_components/TempleteSection'
import Image from 'next/image'
import { Button } from '@/components/ui/button';
import { Loader2Icon } from 'lucide-react';

interface PROPS {
  selecteTemplete?: TEMPLETE
  userFormData: (data: any) => void
  loading: boolean
}

function FormSection({ selecteTemplete, userFormData, loading }: PROPS) {
  const [formData, setFormData] = React.useState<any>({});
  console.log('FormSection - Received template:', selecteTemplete);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    userFormData(formData);
  }

  return (
    <div className='p-5 shadow-md border rounded-lg'>
      {!selecteTemplete ? (
        <div className="text-center py-8">
          <h3 className="text-lg font-semibold text-red-600">Template Not Found</h3>
          <p className="text-gray-600 mt-2">
            The template you're looking for doesn't exist or the URL is incorrect.
          </p>
        </div>
      ) : (
        <>
          {/* Template Icon */}
          {selecteTemplete.icon && (
            <div className="mb-4">
              <Image 
                src={selecteTemplete.icon} 
                alt={`${selecteTemplete.name} icon`}
                width={70} 
                height={70}
                className="rounded-lg"
              />
            </div>
          )}
          
          {/* Template Name */}
          <h2 className='font-bold text-2xl mb-2 text-primary'>
            {selecteTemplete.name}
          </h2>
          
          {/* Template Description */}
          <p className='text-gray-600 mb-4'>
            {selecteTemplete.desc}
          </p>
          
          {/* Category Badge */}
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-4">
            {selecteTemplete.category}
          </span>
          
          {/* Form Fields */}
          {selecteTemplete.form && selecteTemplete.form.length > 0 && (
            <form onSubmit={onSubmit} className="mt-6">
              <h3 className="font-semibold mb-3">Form Fields:</h3>
              {selecteTemplete.form.map((field, index) => (
                <div key={index} className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label} {field.required && <span className="text-red-500">*</span>}
                  </label>
                  {field.field === 'input' ? (
                    <input 
                      type="text"
                      name={field.name || `field_${index}`}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder={field.label}
                      required={field.required}
                      onChange={handleInput}
                      disabled={loading}
                    />
                  ) : field.field === 'textarea' ? (
                    <textarea 
                      name={field.name || `field_${index}`}
                      className="w-full p-2 border border-gray-300 rounded-md h-24 focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder={field.label}
                      required={field.required}
                      onChange={handleInput}
                      disabled={loading}
                    />
                  ) : null}
                </div>
              ))}
              <Button 
                type="submit" 
                className="mt-2 w-full py-6 text-white" 
                disabled={loading}
              >
                {loading && <Loader2Icon className='animate-spin mr-2 h-4 w-4' />}
                {loading ? 'Generating...' : 'Generate Content'}
              </Button>
            </form>
          )}
        </>
      )}
    </div>
  )
}

export default FormSection