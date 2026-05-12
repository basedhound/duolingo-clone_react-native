"""
AI Language Teacher — voice-only agent.

Transport : Stream Edge (getstream plugin)
LLM       : OpenAI Realtime (speech-to-speech, no separate STT/TTS needed)

The teacher always speaks English and teaches the language selected by the
TEACH_LANGUAGE env var (default: Spanish).  In HTTP-server mode the mobile
app encodes the target language in the call_id as "<language>:<uuid>" so
each call gets the right teacher automatically.
"""

import os

from dotenv import load_dotenv

from vision_agents.core import Agent, AgentLauncher, Runner, User
from vision_agents.plugins import getstream, openai

load_dotenv()

TEACH_LANGUAGE = os.getenv("TEACH_LANGUAGE", "Spanish")


def _build_instructions(language: str) -> str:
    return (
        f"You are an enthusiastic AI language teacher. "
        f"You always speak English and you are teaching the user {language} through English. "
        f"Keep every reply short — under three sentences. "
        f"Do not use special characters, markdown, or bullet points. "
        f"When the user says something in {language}, gently correct mistakes and praise what is right. "
        f"When the user asks a question in English, answer it and give a useful {language} example. "
        f"Start by welcoming the user and asking what they would like to practise today."
    )


def _language_from_call_id(call_id: str) -> str:
    """Extract language from call_id formatted as '<language>:<uuid>', else use env default."""
    if ":" in call_id:
        candidate = call_id.split(":")[0].strip().capitalize()
        if candidate:
            return candidate
    return TEACH_LANGUAGE


async def create_agent(**kwargs) -> Agent:
    return Agent(
        edge=getstream.Edge(),
        llm=openai.Realtime(
            model="gpt-realtime-1.5",
            voice="marin",
            send_video=False,
        ),
        agent_user=User(name="Teacher", id="language-teacher"),
        instructions=_build_instructions(TEACH_LANGUAGE),
    )


async def join_call(agent: Agent, call_type: str, call_id: str) -> None:
    language = _language_from_call_id(call_id)
    agent.llm.set_instructions(_build_instructions(language))

    call = await agent.create_call(call_type, call_id)
    async with agent.join(call):
        await agent.finish()


if __name__ == "__main__":
    Runner(AgentLauncher(create_agent=create_agent, join_call=join_call)).cli()
