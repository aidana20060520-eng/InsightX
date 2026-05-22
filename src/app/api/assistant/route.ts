import { NextRequest } from "next/server";

export const runtime = "edge";

// Mock contextual responses based on prompt keywords. Uses streaming to simulate real LLM behavior.
function pickResponse(prompt: string): string {
  const p = prompt.toLowerCase();

  if (p.includes("project") && (p.includes("risk") || p.includes("health"))) {
    return `Looking at your active projects, here's the health snapshot:\n\n**Critical attention needed:**\n- **API Migration** — 28% health, 4/18 tasks complete, blocked on design review\n- **Project Aurora** — 42% health, 3 tasks overdue, no activity in 5 days\n\n**Performing well:**\n- **Q4 Marketing Refresh** — 92% health, on track for delivery\n- **Customer Onboarding** — 88% health, ahead of schedule\n\n### Recommendation\nI'd suggest prioritizing the design review for API Migration this week — it's blocking 4 dependent tasks and a quick 30-min sync should unblock everything.\n\nWant me to draft a Slack message to your design lead?`;
  }

  if (p.includes("focus") || p.includes("productive")) {
    return `Your **focus score this week is 84/100** — up 6 points from last week.\n\nHere's what's driving that:\n\n1. **Deep work**: 92% — your morning focus blocks are working\n2. **Distractions**: 78% — Slack interruptions reduced by 23%\n3. **Consistency**: 86% — you've stayed on rhythm 6/7 days\n\n### Patterns I noticed\n- Your peak focus window is **9–11 AM** (2.3x more output)\n- Thursdays consistently outperform other weekdays by **38%**\n- Focus drops sharply after 4 PM meetings\n\n### Suggested action\nBlock 9–11 AM as deep work for next week. Want me to set this up automatically?`;
  }

  if (p.includes("week") || p.includes("summary") || p.includes("recap")) {
    return `Here's your **Dec 16–22 weekly recap**:\n\n### Wins\n- Shipped Mobile App v2 ahead of schedule\n- Completed **127 tasks** (+12% vs. last week)\n- Reduced sprint cycle time by **18%**\n- All Q4 OKRs on track\n\n### Numbers\n| Metric | Value | Change |\n| --- | --- | --- |\n| Productivity | 84 | +6 pts |\n| Insights | 84 | +24% |\n| Focus hours | 32h | -2h |\n| Tasks done | 127 | +12% |\n\n### Watch outs\n- Project Aurora needs attention — 3 overdue tasks\n- API Migration blocked on design review\n\nOverall: **a strong week** with clear momentum into next week.`;
  }

  if (p.includes("blocker") || p.includes("blocked") || p.includes("issue")) {
    return `I found **3 active blockers** across your workspace:\n\n1. **API Migration** — Waiting on design review (6 days)\n   - Owner: Maya • Priority: High\n2. **Mobile App v2** — Waiting on App Store approval (2 days)\n   - Owner: Auto • Priority: Medium\n3. **Project Aurora** — No assigned owner (5 days)\n   - Priority: High\n\n### Recommendation\nThe Aurora ownership gap is the most urgent — let's assign it before it slips further. Want me to suggest an owner based on past contributions?`;
  }

  if (p.includes("task") || p.includes("todo") || p.includes("priorit")) {
    return `Based on deadlines and impact, here are your **top 5 priorities** for tomorrow:\n\n1. **Review API Migration design** — unblocks 4 dependent tasks\n2. **Assign owner for Project Aurora** — currently unowned for 5 days\n3. **Customer onboarding QA** — last item before release\n4. **Q4 board prep** — needed by Friday\n5. **1:1 with engineering team** — scheduled for 2 PM\n\n### Quick wins (under 30 min each)\n- Approve 3 pending design tickets\n- Reply to 2 customer feedback threads\n- Update project Aurora status\n\nWant me to add these to your calendar?`;
  }

  // Default response
  return `I'm analyzing your Notion workspace right now. Based on what I'm seeing:\n\n- **127 tasks** completed this week (+12%)\n- **5 active projects** — 3 healthy, 2 at risk\n- **84/100 focus score** — your best week this month\n\n### How I can help\n- Review project health and risks\n- Summarize your week\n- Find blockers and stalled work\n- Suggest priorities for tomorrow\n- Surface patterns in your productivity\n\nWhat would you like to dig into?`;
}

function streamText(text: string, controller: ReadableStreamDefaultController) {
  const encoder = new TextEncoder();
  // Tokenize roughly by word with whitespace preserved
  const tokens = text.split(/(\s+)/);
  let i = 0;

  const interval = setInterval(() => {
    if (i >= tokens.length) {
      clearInterval(interval);
      controller.close();
      return;
    }
    // Send 1-3 tokens per tick for natural rhythm
    const chunk = tokens.slice(i, i + 1 + Math.floor(Math.random() * 2)).join("");
    i += 1 + Math.floor(Math.random() * 2);
    controller.enqueue(encoder.encode(chunk));
  }, 22);
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const lastUserMessage = messages
      ?.filter((m: { role: string }) => m.role === "user")
      ?.pop();
    const prompt = lastUserMessage?.content || "";

    const reply = pickResponse(prompt);

    const stream = new ReadableStream({
      start(controller) {
        streamText(reply, controller);
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to process request" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
