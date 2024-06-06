import { useEffect, useState } from 'react'
import WebLLMChatEngine from '../web-llm-chat-engine'
import { Engine } from '@mlc-ai/web-llm'
import { AI, UIState } from '../chat/actions'
import { nanoid } from 'nanoid'
import { useUIState } from 'ai/rsc'
import { ChatMessage } from '@/components/chat-message'
import { UserMessage } from '@/components/stocks/message'

export const useWebLLMChatEngine = () => {
  const [_, setMessages] = useUIState<typeof AI>()

  const [chatEngine] = useState(new WebLLMChatEngine(new Engine()))

  const messageUpdate = (kind: string, text: string, append: boolean) => {
    if (kind == 'init') {
      text = '[System Initialize] ' + text
    }

    setMessages(prevMessages => {
      const id = nanoid()
      const display = (
        <ChatMessage
          message={{
            id,
            role: kind === 'right' ? 'user' : 'assistant',
            content: text
          }}
        />
      )
      if (append) {
        return [...prevMessages, { id, display }]
      } else {
        const msgCopy = [...prevMessages]
        // msgCopy[msgCopy.length - 1] = { kind, text }
        msgCopy[msgCopy.length - 1] = {
          id,
          display: display
        }
        return msgCopy
      }
    })
  }
  const submitUserMessage = async (prompt: string) => {
    setMessages(currentMessages => [
      ...currentMessages,
      {
        id: nanoid(),
        display: <UserMessage>{prompt}</UserMessage>
      }
    ])
    chatEngine.onGenerate(prompt, messageUpdate, () => {})
  }
  return { submitUserMessage }
}
