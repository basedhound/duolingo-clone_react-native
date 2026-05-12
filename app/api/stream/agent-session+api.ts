/**
 * Proxy between the mobile app and the Vision Agent HTTP server.
 *
 * VISION_AGENT_URL is a server-side-only env var — never exposed to the client.
 *
 * POST  /api/stream/agent-session  → start an agent session for a call
 * DELETE /api/stream/agent-session → stop a running agent session
 */

interface StartAgentBody {
  callId: string;
  callType?: string;
}

export async function POST(request: Request): Promise<Response> {
  try {
    const body = (await request.json()) as StartAgentBody;
    const { callId, callType = 'audio_room' } = body;

    if (!callId) {
      return Response.json({ error: 'Missing callId' }, { status: 400 });
    }

    const agentUrl = process.env.VISION_AGENT_URL;
    if (!agentUrl) {
      return Response.json({ error: 'Vision Agent not configured' }, { status: 500 });
    }

    const res = await fetch(`${agentUrl}/calls/${encodeURIComponent(callId)}/sessions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ call_type: callType }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      console.error('[AgentSession] start failed:', res.status, detail);
      return Response.json({ error: 'Failed to start agent' }, { status: 502 });
    }

    const data = (await res.json()) as { session_id: string; call_id: string };
    return Response.json({ sessionId: data.session_id, callId: data.call_id }, { status: 201 });
  } catch (error) {
    console.error('[AgentSession] POST error:', error);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}

export async function DELETE(request: Request): Promise<Response> {
  try {
    const url = new URL(request.url);
    const callId = url.searchParams.get('callId');
    const sessionId = url.searchParams.get('sessionId');

    if (!callId || !sessionId) {
      return Response.json({ error: 'Missing callId or sessionId' }, { status: 400 });
    }

    const agentUrl = process.env.VISION_AGENT_URL;
    if (!agentUrl) {
      // If the agent isn't configured just return success — nothing to stop
      return new Response(null, { status: 204 });
    }

    const res = await fetch(
      `${agentUrl}/calls/${encodeURIComponent(callId)}/sessions/${encodeURIComponent(sessionId)}`,
      { method: 'DELETE' },
    );

    // 404 means the session already ended — treat as success
    if (!res.ok && res.status !== 404) {
      console.error('[AgentSession] stop failed:', res.status);
      return Response.json({ error: 'Failed to stop agent' }, { status: 502 });
    }

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error('[AgentSession] DELETE error:', error);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}
