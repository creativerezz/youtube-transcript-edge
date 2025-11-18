"use client";

import { useState } from "react";
import { Message, MessageContent, MessageActions, MessageAction, MessageResponse, MessageAttachment, MessageAttachments } from "@/components/ai-elements/message";
import { PromptInput, PromptInputProvider, PromptInputTextarea, PromptInputButton, PromptInputSubmit, PromptInputAttachments, PromptInputSpeechButton } from "@/components/ai-elements/prompt-input";
import { Reasoning, ReasoningTrigger, ReasoningContent } from "@/components/ai-elements/reasoning";
import { ChainOfThought, ChainOfThoughtHeader, ChainOfThoughtStep, ChainOfThoughtContent, ChainOfThoughtSearchResults, ChainOfThoughtSearchResult } from "@/components/ai-elements/chain-of-thought";
import { Tool, ToolHeader, ToolContent, ToolInput, ToolOutput } from "@/components/ai-elements/tool";
import { Confirmation, ConfirmationTitle, ConfirmationRequest, ConfirmationActions, ConfirmationAction, ConfirmationAccepted } from "@/components/ai-elements/confirmation";
import { Plan, PlanHeader, PlanTitle, PlanDescription, PlanContent, PlanTrigger } from "@/components/ai-elements/plan";
import { Queue, QueueSection, QueueSectionTrigger, QueueSectionLabel, QueueList, QueueItem, QueueItemIndicator, QueueItemContent, QueueItemDescription } from "@/components/ai-elements/queue";
import { CodeBlock, CodeBlockCopyButton } from "@/components/ai-elements/code-block";
import { Artifact, ArtifactHeader, ArtifactTitle, ArtifactDescription, ArtifactContent, ArtifactActions, ArtifactAction } from "@/components/ai-elements/artifact";
import { Sources, SourcesTrigger, SourcesContent, Source } from "@/components/ai-elements/sources";
import { Context, ContextTrigger, ContextContent, ContextContentHeader, ContextContentBody, ContextInputUsage, ContextOutputUsage } from "@/components/ai-elements/context";
import { ModelSelector, ModelSelectorTrigger, ModelSelectorContent, ModelSelectorInput, ModelSelectorList, ModelSelectorGroup, ModelSelectorItem, ModelSelectorName } from "@/components/ai-elements/model-selector";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { Loader } from "@/components/ai-elements/loader";
import { Checkpoint, CheckpointIcon, CheckpointTrigger } from "@/components/ai-elements/checkpoint";
import { Conversation, ConversationContent } from "@/components/ai-elements/conversation";
import { Suggestion, Suggestions } from "@/components/ai-elements/suggestion";
import { WebPreview, WebPreviewBody, WebPreviewNavigation, WebPreviewUrl } from "@/components/ai-elements/web-preview";
import { Copy, ThumbsUp, ThumbsDown, RotateCcw, Download, ExternalLink, Play } from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function DemoPage() {
  const [promptValue, setPromptValue] = useState("");
  const [selectedModel, setSelectedModel] = useState("claude-3-5-sonnet");

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">AI Elements Demo</h1>
          <p className="text-muted-foreground">
            A comprehensive showcase of all ai-elements components with responsive layouts
          </p>
        </div>

        {/* Conversation Layout */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold border-b pb-2">Conversation Layout</h2>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Conversation Container</h3>
            <p className="text-sm text-muted-foreground">
              Wrapper for chat-style message layouts with proper spacing and styling
            </p>
            <div className="border rounded-lg p-4 max-h-96 overflow-y-auto">
              <Conversation>
                <ConversationContent>
                  <Message from="user">
                    <MessageContent>
                      How do I center a div with CSS?
                    </MessageContent>
                  </Message>
                  <Message from="assistant">
                    <MessageContent>
                      <MessageResponse>
                        {`There are several ways to center a div:

1. **Flexbox** (Recommended):
\`\`\`css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
\`\`\`

2. **Grid**:
\`\`\`css
.container {
  display: grid;
  place-items: center;
}
\`\`\``}
                      </MessageResponse>
                    </MessageContent>
                  </Message>
                  <Message from="user">
                    <MessageContent>
                      Thanks! What about vertical centering?
                    </MessageContent>
                  </Message>
                  <Message from="assistant">
                    <MessageContent>
                      <MessageResponse>
                        Both methods I showed handle vertical centering automatically. The `align-items: center` in flexbox and `place-items: center` in grid center both horizontally and vertically.
                      </MessageResponse>
                    </MessageContent>
                  </Message>
                </ConversationContent>
              </Conversation>
            </div>
          </div>
        </section>

        {/* Suggestions */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold border-b pb-2">Suggestions</h2>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Suggestion Chips</h3>
            <p className="text-sm text-muted-foreground">
              Quick prompt suggestions for users to get started
            </p>
            <Suggestions>
              <Suggestion
                suggestion="Create a responsive navbar with Tailwind CSS"
                onClick={() => setPromptValue("Create a responsive navbar with Tailwind CSS")}
              />
              <Suggestion
                suggestion="Build a todo app with React hooks"
                onClick={() => setPromptValue("Build a todo app with React hooks")}
              />
              <Suggestion
                suggestion="Make a landing page for a coffee shop"
                onClick={() => setPromptValue("Make a landing page for a coffee shop")}
              />
              <Suggestion
                suggestion="Design a pricing table component"
                onClick={() => setPromptValue("Design a pricing table component")}
              />
            </Suggestions>
          </div>
        </section>

        {/* Web Preview */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold border-b pb-2">Web Preview</h2>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Preview Panel (v0-style)</h3>
            <p className="text-sm text-muted-foreground">
              Browser-like preview frame for displaying generated web content
            </p>
            <div className="h-[500px] border rounded-lg overflow-hidden">
              <WebPreview>
                <WebPreviewNavigation>
                  <WebPreviewUrl
                    placeholder="https://example.com"
                    value="https://example.com/preview"
                  />
                </WebPreviewNavigation>
                <WebPreviewBody>
                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
                    <div className="text-center space-y-4 p-8">
                      <div className="text-6xl">🎨</div>
                      <h2 className="text-2xl font-bold">Preview Panel</h2>
                      <p className="text-muted-foreground max-w-md">
                        This component displays generated content in a browser-like interface.
                        Perfect for v0-style code generation demos.
                      </p>
                    </div>
                  </div>
                </WebPreviewBody>
              </WebPreview>
            </div>
          </div>
        </section>

        {/* Messaging Components */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold border-b pb-2">Messaging Components</h2>

          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">User Message</h3>
              <Message from="user">
                <MessageContent>
                  Tell me about quantum computing and how it differs from classical computing.
                </MessageContent>
                <MessageAttachments>
                  <MessageAttachment
                    data={{
                      filename: "research-paper.pdf",
                      mediaType: "application/pdf",
                      url: "",
                    }}
                  />
                  <MessageAttachment
                    data={{
                      filename: "diagram.png",
                      mediaType: "image/png",
                      url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
                    }}
                  />
                </MessageAttachments>
              </Message>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Assistant Message with Actions</h3>
              <Message from="assistant">
                <MessageContent>
                  <MessageResponse>
                    {`Quantum computing is a revolutionary approach to computation that leverages quantum mechanical phenomena. Here are the key differences:

## Classical vs Quantum Computing

1. **Information Storage**
   - Classical: Bits (0 or 1)
   - Quantum: Qubits (superposition of 0 and 1)

2. **Processing Power**
   - Classical: Linear scaling
   - Quantum: Exponential scaling for certain problems

3. **Applications**
   - Cryptography
   - Drug discovery
   - Optimization problems`}
                  </MessageResponse>
                </MessageContent>
                <MessageActions>
                  <MessageAction tooltip="Copy">
                    <Copy className="h-4 w-4" />
                  </MessageAction>
                  <MessageAction tooltip="Helpful">
                    <ThumbsUp className="h-4 w-4" />
                  </MessageAction>
                  <MessageAction tooltip="Not helpful">
                    <ThumbsDown className="h-4 w-4" />
                  </MessageAction>
                  <MessageAction tooltip="Regenerate">
                    <RotateCcw className="h-4 w-4" />
                  </MessageAction>
                </MessageActions>
              </Message>
            </div>
          </div>
        </section>

        {/* Prompt Input */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold border-b pb-2">Prompt Input</h2>

          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Standard Input with Provider</h3>
              <PromptInputProvider value={promptValue} onValueChange={setPromptValue}>
                <PromptInput>
                  <PromptInputTextarea placeholder="Ask me anything..." />
                  <PromptInputAttachments />
                  <div className="flex items-center gap-2 justify-end">
                    <PromptInputSpeechButton />
                    <PromptInputSubmit>Send</PromptInputSubmit>
                  </div>
                </PromptInput>
              </PromptInputProvider>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Compact Input with Submit Handler</h3>
              <p className="text-sm text-muted-foreground">
                v0-style pattern with onSubmit callback and status indicator
              </p>
              <PromptInput
                className="relative"
                onSubmit={(message) => {
                  console.log("Submitted:", message);
                  alert(`Submitted: ${message.text}`);
                }}
              >
                <PromptInputTextarea
                  className="min-h-[60px] pr-12"
                  placeholder="Type your message..."
                />
                <PromptInputSubmit
                  className="absolute right-1 bottom-1"
                  status="ready"
                />
              </PromptInput>
            </div>
          </div>
        </section>

        {/* AI Reasoning */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold border-b pb-2">AI Reasoning & Thinking</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Reasoning</h3>
              <Reasoning>
                <ReasoningTrigger duration={2340} />
                <ReasoningContent>
                  {`I need to approach this problem systematically:

1. First, identify the core requirements
2. Consider edge cases and constraints
3. Evaluate potential solutions
4. Choose the most efficient approach`}
                </ReasoningContent>
              </Reasoning>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Chain of Thought</h3>
              <ChainOfThought>
                <ChainOfThoughtHeader>Problem Solving Process</ChainOfThoughtHeader>
                <ChainOfThoughtStep status="complete" title="Analyze requirements">
                  <ChainOfThoughtContent>
                    Identified 5 key requirements and 3 constraints
                  </ChainOfThoughtContent>
                </ChainOfThoughtStep>
                <ChainOfThoughtStep status="active" title="Research solutions">
                  <ChainOfThoughtContent>
                    Searching documentation and examples...
                    <ChainOfThoughtSearchResults>
                      <ChainOfThoughtSearchResult>Next.js docs</ChainOfThoughtSearchResult>
                      <ChainOfThoughtSearchResult>React patterns</ChainOfThoughtSearchResult>
                    </ChainOfThoughtSearchResults>
                  </ChainOfThoughtContent>
                </ChainOfThoughtStep>
                <ChainOfThoughtStep status="pending" title="Implement solution" />
              </ChainOfThought>
            </div>
          </div>
        </section>

        {/* Tool Execution */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold border-b pb-2">Tool Execution</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Tool Running</h3>
              <Tool defaultOpen>
                <ToolHeader type="tool-call-web_search" state="input-available" title="web_search" />
                <ToolContent>
                  <ToolInput input={{ query: "latest AI developments 2024", limit: 5 }} />
                </ToolContent>
              </Tool>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Tool Completed</h3>
              <Tool defaultOpen>
                <ToolHeader type="tool-call-calculate" state="output-available" title="calculate" />
                <ToolContent>
                  <ToolInput input={{ expression: "2 + 2 * 5" }} />
                  <ToolOutput output={{ result: 12, steps: ["2 + (2 * 5)", "2 + 10", "12"] }} />
                </ToolContent>
              </Tool>
            </div>
          </div>
        </section>

        {/* Confirmation */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold border-b pb-2">Confirmation</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Pending Confirmation</h3>
              <Confirmation>
                <ConfirmationTitle>Execute system command?</ConfirmationTitle>
                <ConfirmationRequest>
                  <p className="text-sm text-muted-foreground mb-4">
                    The assistant wants to run: <code className="text-xs bg-muted px-1 py-0.5 rounded">npm install react-query</code>
                  </p>
                  <ConfirmationActions>
                    <ConfirmationAction>Approve</ConfirmationAction>
                    <ConfirmationAction variant="outline">Reject</ConfirmationAction>
                  </ConfirmationActions>
                </ConfirmationRequest>
              </Confirmation>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Confirmed</h3>
              <Confirmation>
                <ConfirmationTitle>Execute system command?</ConfirmationTitle>
                <ConfirmationAccepted>
                  Request approved by user
                </ConfirmationAccepted>
              </Confirmation>
            </div>
          </div>
        </section>

        {/* Planning & Queue */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold border-b pb-2">Planning & Task Queue</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Plan</h3>
              <Plan>
                <PlanHeader>
                  <PlanTitle>Implementation Strategy</PlanTitle>
                  <PlanDescription>Breaking down the task into manageable steps</PlanDescription>
                  <PlanTrigger />
                </PlanHeader>
                <PlanContent>
                  {`## Phase 1: Setup
- Initialize project structure
- Configure build tools
- Set up testing framework

## Phase 2: Core Features
- Implement authentication
- Build data models
- Create API endpoints

## Phase 3: Polish
- Add error handling
- Write documentation
- Performance optimization`}
                </PlanContent>
              </Plan>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Task Queue</h3>
              <Queue>
                <QueueSection defaultOpen>
                  <QueueSectionTrigger>
                    <QueueSectionLabel count={1}>In Progress</QueueSectionLabel>
                  </QueueSectionTrigger>
                  <QueueList>
                    <QueueItem>
                      <QueueItemIndicator variant="in-progress" />
                      <QueueItemContent>
                        <QueueItemDescription>
                          Building authentication system
                        </QueueItemDescription>
                      </QueueItemContent>
                    </QueueItem>
                  </QueueList>
                </QueueSection>

                <QueueSection>
                  <QueueSectionTrigger>
                    <QueueSectionLabel count={2}>Completed</QueueSectionLabel>
                  </QueueSectionTrigger>
                  <QueueList>
                    <QueueItem>
                      <QueueItemIndicator variant="completed" />
                      <QueueItemContent>
                        <QueueItemDescription>
                          Set up project structure
                        </QueueItemDescription>
                      </QueueItemContent>
                    </QueueItem>
                    <QueueItem>
                      <QueueItemIndicator variant="completed" />
                      <QueueItemContent>
                        <QueueItemDescription>
                          Configure TypeScript
                        </QueueItemDescription>
                      </QueueItemContent>
                    </QueueItem>
                  </QueueList>
                </QueueSection>
              </Queue>
            </div>
          </div>
        </section>

        {/* Code & Content */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold border-b pb-2">Code & Content Display</h2>

          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Code Block</h3>
              <CodeBlock language="typescript" code={`function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Example usage
console.log(fibonacci(10)); // Output: 55`}>
                <CodeBlockCopyButton />
              </CodeBlock>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Artifact</h3>
              <Artifact>
                <ArtifactHeader>
                  <div className="flex-1">
                    <ArtifactTitle>User Dashboard Component</ArtifactTitle>
                    <ArtifactDescription>
                      React component for displaying user statistics
                    </ArtifactDescription>
                  </div>
                  <ArtifactActions>
                    <ArtifactAction tooltip="Run">
                      <Play className="h-4 w-4" />
                    </ArtifactAction>
                    <ArtifactAction tooltip="Download">
                      <Download className="h-4 w-4" />
                    </ArtifactAction>
                  </ArtifactActions>
                </ArtifactHeader>
                <ArtifactContent>
                  <CodeBlock language="tsx" code={`export function UserDashboard({ user }) {
  return (
    <div className="dashboard">
      <h2>Welcome, {user.name}!</h2>
      <Stats data={user.stats} />
    </div>
  );
}`} />
                </ArtifactContent>
              </Artifact>
            </div>
          </div>
        </section>

        {/* Sources & Context */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold border-b pb-2">Sources & Context</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Sources</h3>
              <Sources>
                <SourcesTrigger count={3} />
                <SourcesContent>
                  <Source
                    name="Next.js Documentation"
                    url="https://nextjs.org/docs"
                    description="Official Next.js documentation and guides"
                  />
                  <Source
                    name="React Patterns"
                    url="https://reactpatterns.com"
                    description="Common React design patterns"
                  />
                  <Source
                    name="TypeScript Handbook"
                    url="https://www.typescriptlang.org/docs/handbook"
                    description="Complete TypeScript language reference"
                  />
                </SourcesContent>
              </Sources>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Context Token Usage</h3>
              <Context
                usedTokens={10600}
                maxTokens={200000}
                usage={{
                  promptTokens: 8500,
                  completionTokens: 2100,
                  totalTokens: 10600,
                }}
                modelId="claude-3-5-sonnet-20241022"
              >
                <ContextTrigger />
                <ContextContent>
                  <ContextContentHeader>Token Usage</ContextContentHeader>
                  <ContextContentBody>
                    <ContextInputUsage />
                    <ContextOutputUsage />
                  </ContextContentBody>
                </ContextContent>
              </Context>
            </div>
          </div>
        </section>

        {/* Model Selector */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold border-b pb-2">Model Selection</h2>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Model Selector</h3>
            <ModelSelector value={selectedModel} onValueChange={setSelectedModel}>
              <ModelSelectorTrigger>
                <ModelSelectorName>{selectedModel}</ModelSelectorName>
              </ModelSelectorTrigger>
              <ModelSelectorContent>
                <ModelSelectorInput placeholder="Search models..." />
                <ModelSelectorList>
                  <ModelSelectorGroup label="Anthropic">
                    <ModelSelectorItem value="claude-3-5-sonnet">
                      Claude 3.5 Sonnet
                    </ModelSelectorItem>
                    <ModelSelectorItem value="claude-3-opus">
                      Claude 3 Opus
                    </ModelSelectorItem>
                  </ModelSelectorGroup>
                  <ModelSelectorGroup label="OpenAI">
                    <ModelSelectorItem value="gpt-4-turbo">
                      GPT-4 Turbo
                    </ModelSelectorItem>
                    <ModelSelectorItem value="gpt-4">
                      GPT-4
                    </ModelSelectorItem>
                  </ModelSelectorGroup>
                </ModelSelectorList>
              </ModelSelectorContent>
            </ModelSelector>
          </div>
        </section>

        {/* Utilities */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold border-b pb-2">Utilities & Effects</h2>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Shimmer Effect</h3>
              <div className="p-4 border rounded-lg">
                <Shimmer>Streaming content with shimmer animation</Shimmer>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Loader</h3>
              <div className="p-4 border rounded-lg flex items-center justify-center">
                <Loader />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Checkpoint</h3>
              <div className="p-4 border rounded-lg">
                <Checkpoint>
                  <CheckpointIcon />
                  <CheckpointTrigger tooltip="Version checkpoint">
                    Checkpoint v1.2.0
                  </CheckpointTrigger>
                </Checkpoint>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-sm text-muted-foreground pt-8 border-t space-y-2">
          <p className="font-semibold">AI Elements Component Library</p>
          <p>
            Built with React, Radix UI, and Tailwind CSS • Designed for AI-native applications
          </p>
          <p className="text-xs">
            Components showcased: Conversation, Suggestions, WebPreview, Message, PromptInput,
            Reasoning, ChainOfThought, Tool, Confirmation, Plan, Queue, CodeBlock, Artifact,
            Sources, Context, ModelSelector, and more
          </p>
        </footer>
      </div>
      </div>
    </TooltipProvider>
  );
}
