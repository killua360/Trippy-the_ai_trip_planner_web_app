import {NextRequest,NextResponse} from "next/server"
import OpenAI from "openai"
import { aj } from "../arcjet/route";
import { auth, currentUser } from "@clerk/nextjs/server";
export const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

const PROMPT = `
You are an AI Trip Planner agent.

You must collect the following details in STRICT ORDER:

1. origin
2. destination
3. group_size
4. budget
5. duration
6. travel_interests
7. special_requirements

IMPORTANT RULES:

- Always determine which fields are already collected from the conversation history.
- NEVER ask for a field that is already collected.
- ALWAYS ask only for the NEXT missing field in the sequence.
- NEVER skip order.
- NEVER repeat a previous question.
- Ask politely with correct meaning if there is any ambiguity is the user's reply

UI Mapping Rules (VERY STRICT):

If asking:
- group_size → return ui: "groupSize"
- budget → return ui: "budget"
- duration → return ui: "tripDuration"
- When all fields collected → return ui: "final"
- For other questions → return ui: ""

You MUST return JSON only in this format:
{
  "resp": "question text",
  "ui": "budget/groupSize/tripDuration/final"
}
`

const FINAL_PROMPT = `
Generate a travel plan in STRICT JSON format.

IMPORTANT:
- Return ONLY valid JSON
- No markdown
- No explanations
- Keep descriptions short
- Provide only 2 hotels
- Provide only 2 activities per day
- Keep itinerary concise

Output Schema:

{
  "trip_plan": {
    "destination": "string",
    "duration": "string",
    "origin": "string",
    "budget": "string",
    "group_size": "string",

    "hotels": [
      {
        "hotel_name": "string",
        "hotel_address": "string",
        "price_per_night": "string",
        "rating": "number",
        "description": "string"
      }
    ],

    "itinerary": [
      {
        "day": "number",
        "day_plan": "string",

        "activities": [
          {
            "place_name": "string",
            "place_details": "string",
            "ticket_pricing": "string",
            "best_time_to_visit": "string"
          }
        ]
      }
    ]
  }
}
`;

export async function POST(req: NextRequest){
  const {messages, isFinal }=await req.json();
  const user=await currentUser();
  const {has}=await auth();
  const hasPremiumAccess = has({ plan: 'premium_user' });
  console.log("hasPremiumAccess",hasPremiumAccess)
  const decision = await aj.protect(req, { userId:user?.primaryEmailAddress?.emailAddress??'', requested: isFinal?5:0 });
  console.log(decision);
  //@ts-ignore
  if(decision?.reason?.remaining==0 && !hasPremiumAccess){
    return NextResponse.json({
      resp:'No Free Credit Remaining',
      ui: 'limit'
    })
  }

  try{
    const completion = await openai.chat.completions.create({
    model:"openai/gpt-4.1-mini",
    response_format:{type:'json_object'},
    max_tokens:1000, 
    temperature: 0.7, 
    messages: [
        {
          role:'system',
          content:isFinal ? FINAL_PROMPT : PROMPT
        },
      ...messages
    ],
  })
  console.log(completion.choices[0].message);
  const message=completion.choices[0].message;
  return NextResponse.json(JSON.parse(message.content??''));
}
catch(e){
    return NextResponse.json(e);
}
}