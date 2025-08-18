import { NextRequest, NextResponse } from 'next/server'
import OpenAI from "openai";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { content } = body

        if (!content || !content.trim()) {
            return NextResponse.json(
                { error: 'Content is required' },
                { status: 400 }
            )
        }

        // console.log('Received:', content)

        // Check if API key is available
        const apiKey = process.env.OPENAI_API_KEY
        if (!apiKey) {
            console.error('OpenAI API key not found in environment variables')
            return NextResponse.json(
                { error: 'Server configuration error' },
                { status: 500 }
            )
        }

        const client = new OpenAI({ apiKey });

        const aiResponse = await client.responses.create({
            model: "gpt-4.1",
            text: { format: { type: 'json_object' } },

            input: `Imagine your a day planner for a VIP, your client says , "${content.trim()}".
            
            Break this down to tasks in the order of time. Respond in the form of a json array, keep the title simple and very short limiting to 3 words,
{"agenda": [{task : <a simple title of the task> , description : <description of the task>, time: <ideal time of task completion>, priority: <priority of the task> },...]}
            `,
        });

        try {
            // const rawOutput = aiResponse?.choices[0]?.message?.content || '';
            const tasks = JSON.parse(aiResponse.output_text);
            // console.log('Parsed tasks:', tasks);
            return NextResponse.json(tasks, { status: 200 })
        } catch (err) {
            console.error('Failed to parse JSON:', err);
            return NextResponse.json(
                { error: 'Internal server error' },
                { status: 500 }
            )
        }



    } catch (error) {
        console.error('API Error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

// Handle other HTTP methods
export async function GET() {
    return NextResponse.json(
        { error: 'Method not allowed. Use POST instead.' },
        { status: 405 }
    )
}