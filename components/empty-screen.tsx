import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight, IconMediarAI, IconOpenAI } from '@/components/ui/icons'

export function EmptyScreen() {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="flex flex-col gap-2 rounded-lg border bg-background p-8 items-center">
        <IconMediarAI className="size-6 text-primary" />
        <h1 className="text-lg font-semibold">How may I help?</h1>
      </div>
    </div>
  )
}
