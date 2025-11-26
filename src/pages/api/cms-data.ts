// API route for content delivery (static stub)
// This endpoint provides static content so the app can run without a CMS.
// When you are ready to integrate a CMS, replace the static data below with
// server-side fetches to the CMS (use env vars to keep credentials secret).
import type { NextApiRequest, NextApiResponse } from 'next';

type ApiResponse = {
  homepage: {
    hero: { title: string; subtitle: string };
    blocks: Array<{ id: string; title: string; text: string }>; 
    our_story: { title: string; text: string };
  };
  plans: Array<{ id: string; name: string; price: number; features: string[] }>;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse | { error: string }>
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const data: ApiResponse = {
    homepage: {
      hero: {
        title: 'Kai',
        subtitle: 'Knowledge & Innovation for Everyone',
      },
      blocks: [
        {
          id: 'block1',
          title: 'Help your clients protect their business',
          text:
            'Thorough risk identification combined with strategic proactive management to enhance business resilience and drive sustainable long-term value creation.',
        },
        {
          id: 'block2',
          title: 'What is Kai?',
          text:
            'Aimed at Small & Medium Size Practices. Designed for Small & Medium Size Enterprises. Kai provides their clients with 3 fundamental pillars for a successful practice.',
        },
        {
          id: 'block3_1',
          title: 'Ready-to-use Kit',
          text: 'To build a sustainability consultancy and compliance practice.',
        },
        {
          id: 'block3_2',
          title: 'Data Centre',
          text: 'A mutualised Data Computing and Competencies Centre, to ensure quality and low cost.',
        },
        {
          id: 'block3_3',
          title: 'Trusted Alliance',
          text: 'Reliable and professional experts to share cutting-edge knowledge and provide training.',
        },
      ],
      our_story: {
        title: 'OUR STORY',
        text:
          'Kai is an alliance of highly experienced professionals with more than 80 years of combined expertise in compliance consulting, accounting, auditing, and sustainability. Our multilingual and international team is dedicated to strengthening your practice by providing new skills and competencies aligned with the most recent industry best practices and international standards.',
      },
    },
    plans: [
      { id: 'basic', name: 'Basic', price: 0, features: ['Intro materials', 'Community support'] },
      { id: 'standard', name: 'Standard', price: 49, features: ['All Basic features', 'Weekly webinars'] },
    ],
  };

  // Cache static stub briefly; adjust as needed
  res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');

  return res.status(200).json(data);
}
