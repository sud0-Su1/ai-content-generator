// app/api/history/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/utils/Db';
import { aiOutput } from '@/utils/Schema';
import { desc } from 'drizzle-orm';
import { currentUser } from '@clerk/nextjs/server';

export async function GET(request: NextRequest) {
  try {
    // Get the authenticated user
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Fetch history from database, ordered by creation date (newest first)
    const history = await db
      .select()
      .from(aiOutput)
      .orderBy(desc(aiOutput.createdAt))
      .limit(50); // Limit to last 50 entries

    return NextResponse.json(history);
  } catch (error) {
    console.error('Error fetching history:', error);
    return NextResponse.json(
      { error: 'Failed to fetch history' },
      { status: 500 }
    );
  }
}