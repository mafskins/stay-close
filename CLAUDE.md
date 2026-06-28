# Stay Close — Project Context for Claude Code

## What we're building
Stay Close is a Māori-centered friend connection web app. 
It helps people stay meaningfully connected to their whānau 
and mates by remembering important details about their lives 
and nudging them when they haven't connected in a while. 
Prevention through connection, not crisis intervention.

## Two modes
- **Connection mode (normal):** Log friends, add notes about 
their lives (kid names, what they care about, what they're 
doing), get reminders when you haven't spoken in weeks
- **Resource mode (if struggling):** Someone needs help now, 
app shows local counsellors, community groups, activities 
nearby based on their suburb

## Cultural grounding
This is not Western therapy language. It's rooted in 
manaakitanga, aroha, whanaungatanga. Built by Māori, for 
Māori. The app says "your people matter, remember them, stay 
close." Not invasive. Not Big Brother. Just intentional 
connection.

## Who I am
- KingMafe, senior data advisor at Te Puni Kōkiri, 
Wellington NZ
- Half Māori, 13 years public sector experience
- Self-taught: Node.js, JavaScript, HTML, Power BI, 
Power Apps
- Not a developer but I can build. I learn fast. 
Don't over-explain basics.
- I need accountability. If I'm circling instead of 
building, call it out directly.
- Analogies help. Microsoft tools, everyday objects, 
familiar things.
- Direct communication only. No fluff, no padding.

## How to work with me
- Before introducing any new tool, concept, or technology, 
explain what it is in one sentence using an analogy before 
using it. Never assume I know what something is.
- Give me one brick at a time. Small, completable, testable.
- Code first, explanation second.
- After each brick is done I'll report back. Give me 
the next one.
- If I start talking about ideas instead of building, 
push back hard.
- Pressure test my decisions. Don't just agree.
- Goal is shipped, not perfect.

## Documentation and portfolio
- At the end of every build session, summarize what was 
built, what was learned, and what's next.
- At the end of the full project, produce a complete build 
document covering every decision, every concept learned, 
every tool used, and why.
- This becomes portfolio evidence for AI advisory 
job applications.

## Tech stack
- Runtime: Node.js (already installed)
- Framework: Express (already installed)
- Database: better-sqlite3 (already installed)
- Front-end: HTML + vanilla JavaScript
- Editor: VS Code
- Terminal: integrated terminal inside VS Code
- Deployment: Render free tier (free hosting)
- AI layer (later): Claude API for conversation features
- Geospatial (later): OpenStreetMap / free NZ government APIs

## MVP plan — four weeks
**Week 1:** Node.js + Express server running locally, 
SQLite database set up, basic HTML front-end, 
deployed to Render

**Week 2:** Friends list — add a friend, store their name 
and notes (kid names, interests, what's going on in their 
life), view all friends

**Week 3:** Dashboard — "You haven't spoken to Sarah in 
four weeks." Visual, emotional, hit them where it counts. 
Check in button.

**Week 4:** Resource layer — suburb dropdown, shows local 
counsellors, community groups, activities. Free geospatial 
data from NZ government sources.

## First task when we start
Express and better-sqlite3 are already installed. 
Start here:
1. Create server.js — the main server file
2. Create public/index.html — the front-end form
3. Build one HTML form that saves one friend entry 
to SQLite
4. Test it locally in the browser
5. Report back

That's brick one. Nothing else until that's done.

## Important
- PC user, Windows machine
- VS Code installed
- Node.js installed
- Express and better-sqlite3 already installed
- No Microsoft account (can't use Microsoft cloud tools)
- Claude Code is the primary building tool — write files 
directly, run commands, build alongside me
- Don't suggest tools or steps that require paid accounts
- Keep everything free until the product needs to scale