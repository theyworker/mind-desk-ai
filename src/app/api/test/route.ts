import { NextRequest, NextResponse } from 'next/server'
import OpenAI from "openai";

export async function GET(request: NextRequest) {
    try {
  
        // console.log('Received:', content)


        const client = new OpenAI({ apiKey: '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' }, );

        const aiResponse = await client.responses.create({
            model: "gpt-4.1",
            text: { format: { type: 'json_object' } },
            input: `Imagine your a day planner for a VIP, your client says , Tomorrow, I’d like to start my day with a workout at the gym around 7 AM, so please make sure I have that hour blocked off. After that, schedule a brief 20-minute check-in with the CFO to review our latest financials. Mid-morning, I’ve got a strategy meeting with the board, so ensure the presentation deck is ready and the meeting room is prepped. For lunch, book something casual with the head of marketing — I want to go over the direction of the new campaign. In the afternoon, block out about 90 minutes for me to review the quarterly investor update. Also, remind me to call the startup founder we spoke to yesterday — sometime late afternoon should be fine. Finally, I have dinner with the Singapore partners, so confirm the reservation and make sure the driver has the details.

            Break this down to tasks in the order of time. Respond in the form of a json array,
{"agenda": [{task : <a simple title of the task> , description : <description of the task>, time: <ideal time of task completion>, priority: <priority of the task> },...]
                }        `,
        });

        try {
            // const rawOutput = aiResponse?.choices[0]?.message?.content || '';
            const tasks = aiResponse;
            console.log('Parsed tasks:', tasks);
        } catch (err) {
            console.error('Failed to parse JSON:', err);
        }

        // For now, we'll just echo back the content
        // Later this can be replaced with AI processing logic

        return NextResponse.json(JSON.parse(aiResponse.output_text), { status: 200 })
    } catch (error) {
        console.error('API Error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

