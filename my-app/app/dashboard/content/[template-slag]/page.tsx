"use client"
import React from 'react'
import FormSection from '../_components/FormSection';
import OutputSection from '../_components/OutputSection';
import { TEMPLETE } from '../../_components/TempleteSection'
import Templete from '@/app/(data)/Templete'
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { chatSession } from '@/utils/Aimodel';
import { db } from '@/utils/Db'; // Make sure this path is correct
import { aiOutput } from '@/utils/Schema'; // Make sure this path is correct
import { useUser } from '@clerk/nextjs';

interface PROPS {
  params: {
    'template-slag': string;
  }
}

function CreateNewContent(props: PROPS) {
  const [loading, setLoading] = React.useState(false);
  const [aiOutputText, setAiOutputText] = React.useState('');
  const slug = props.params['template-slag'];
  const { user } = useUser();

  const selecteTemplete: TEMPLETE | undefined = Templete?.find(
    (item) => item.slugs === slug
  );

  const saveInDb = async (formData: any, aiResponse: string) => {
    try {
      const result = await db.insert(aiOutput).values({
        formData: JSON.stringify(formData),
        aiResponse: aiResponse,
        templateSlug: slug,
        createdBy: user?.primaryEmailAddress?.emailAddress || 'anonymous',
        // Remove createdAt to let database handle it with defaultNow()
      })
      .returning();
      
      console.log('Saved to database:', result[0]);
      return result[0];
    } catch (error) {
      console.error('Error saving to database:', error);
      throw error;
    }
  }
  
  const GenerateAicontent = async (formData: any) => {
    try {
      setLoading(true);
      
      const SelectedPrompt = selecteTemplete?.aiprompt || '';
      let Finalprompt = SelectedPrompt;
      
      Object.keys(formData).forEach(key => {
        Finalprompt += ` ${key}: ${formData[key]}`;
      });
      
      console.log('Final prompt:', Finalprompt);
      console.log('Form data received:', formData);
      
      const result = await chatSession.sendMessage(Finalprompt);
      const response = await result.response;
      const aiText = response.text();
      
      console.log('Generated AI content:', aiText);
      setAiOutputText(aiText);
      
      // Save to database
      await saveInDb(formData, aiText);
      
    } catch (error) {
      console.error('Error generating AI content:', error);
      setAiOutputText('Sorry, there was an error generating content. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='p-2'>
      <Link href='/dashboard'>
        <Button className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </Link>
      
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5 p-4 py-2'>
        <FormSection 
          selecteTemplete={selecteTemplete} 
          userFormData={GenerateAicontent} 
          loading={loading}
        />
        <div className='col-span-2'>
          <OutputSection aiOutput={aiOutputText} />
        </div>
      </div>
    </div>
  )
}

export default CreateNewContent