"""
AI Language Teacher — voice-only agent.

Transport : Stream Edge (getstream plugin)
LLM       : OpenAI Realtime (speech-to-speech, no separate STT/TTS needed)

The teacher always speaks English and teaches the language set in the Stream
call's custom data (packed by the Expo API route from the lesson record).
Falls back to the TEACH_LANGUAGE env var if custom data is absent.
"""

import os

from dotenv import load_dotenv

from vision_agents.core import Agent, AgentLauncher, Runner, User
from vision_agents.plugins import getstream, openai

load_dotenv()

TEACH_LANGUAGE = os.getenv("TEACH_LANGUAGE", "Spanish")
AGENT_USER_ID = "language-teacher"


# ── Instruction builders ───────────────────────────────────────────────────────

def _default_instructions(language: str) -> str:
    return (
        f"You are an enthusiastic AI language teacher. "
        f"You always speak English and you are teaching the user {language} through English. "
        f"Keep every reply short — under three sentences. "
        f"Do not use special characters, markdown, or bullet points. "
        f"When the user says something in {language}, gently correct mistakes and praise what is right. "
        f"When the user asks a question in English, answer it and give a useful {language} example. "
        f"Start by welcoming the user and asking what they would like to practise today."
    )


def _instructions_from_custom(custom: dict) -> str:
    """Build a rich instruction string from the lesson custom data packed by the Expo API route."""
    ai_teacher = custom.get("aiTeacher") or {}
    language_name = custom.get("languageName") or TEACH_LANGUAGE

    system_prompt: str = ai_teacher.get("systemPrompt") or ""
    lesson_context: str = ai_teacher.get("lessonContext") or ""
    topics: list = ai_teacher.get("topicsToCover") or []
    goals: list = custom.get("goals") or []
    vocabulary: list = custom.get("vocabulary") or []
    phrases: list = custom.get("phrases") or []

    parts: list[str] = []

    if system_prompt:
        parts.append(system_prompt)
    else:
        parts.append(_default_instructions(language_name))

    if lesson_context:
        parts.append(f"LESSON CONTEXT: {lesson_context}")

    if topics:
        parts.append("TOPICS TO COVER:\n" + "\n".join(f"- {t}" for t in topics))

    if goals:
        parts.append("LESSON GOALS:\n" + "\n".join(f"- {g}" for g in goals))

    if vocabulary:
        vocab_str = ", ".join(
            f"{v['word']} = {v['translation']}"
            for v in vocabulary[:12]
            if isinstance(v, dict) and v.get("word") and v.get("translation")
        )
        if vocab_str:
            parts.append(f"KEY VOCABULARY: {vocab_str}")

    if phrases:
        phrase_str = "; ".join(
            f"{p['phrase']} ({p['translation']})"
            for p in phrases[:8]
            if isinstance(p, dict) and p.get("phrase") and p.get("translation")
        )
        if phrase_str:
            parts.append(f"KEY PHRASES: {phrase_str}")

    parts.append(
        "Keep replies short — under three sentences. "
        "Do not use markdown, bullet points, or special characters."
    )

    return "\n\n".join(parts)


# ── Agent factory & join logic ─────────────────────────────────────────────────

async def create_agent(**kwargs) -> Agent:
    return Agent(
        edge=getstream.Edge(),
        llm=openai.Realtime(
            model="gpt-realtime-1.5",
            voice="marin",
            send_video=False,
        ),
        agent_user=User(name="AI Teacher", id=AGENT_USER_ID),
        instructions=_default_instructions(TEACH_LANGUAGE),
    )


async def join_call(agent: Agent, call_type: str, call_id: str) -> None:
    # get_or_create fetches the existing call created by the Expo API route
    call = await agent.create_call(call_type, call_id)

    # Read the lesson context packed into the call's custom data
    try:
        response = await call.get()
        custom: dict = (
            (response.data.call.custom or {})
            if response.data and response.data.call
            else {}
        )
    except Exception:
        custom = {}

    instructions = _instructions_from_custom(custom)
    agent.llm.set_instructions(instructions)

    async with agent.join(call):
        await agent.finish()


if __name__ == "__main__":
    Runner(AgentLauncher(create_agent=create_agent, join_call=join_call)).cli()
