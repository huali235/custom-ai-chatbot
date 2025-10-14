└── 📁app
    └── 📁api
        └── 📁chat
            └── route.ts                    # Main chat endpoint - handles streaming AI responses
        └── 📁conversations
            └── route.ts                    # CRUD operations for conversation history
        └── 📁settings
            └── route.ts                    # User settings (themes, preferences, API keys)
        └── 📁models
            └── route.ts                    # Get available AI models/providers
    └── 📁components
        └── 📁chat
            ├── ChatInterface.tsx           # Main chat container
            ├── ChatMessage.tsx             # Individual message bubble component
            ├── ChatInput.tsx               # Message input field with send button
            └── MessageList.tsx             # Scrollable message container
        └── 📁sidebar
            ├── Sidebar.tsx                 # Main sidebar container
            ├── ConversationList.tsx        # List of previous conversations
            └── ModelSelector.tsx           # Dropdown to switch AI models
        └── 📁settings
            ├── SettingsModal.tsx           # Settings popup/modal
            ├── ThemeSelector.tsx           # Preset theme chooser
            └── BackgroundUploader.tsx      # Background image upload/select
        └── 📁ui
            ├── Button.tsx                  # Reusable button component
            ├── Input.tsx                   # Reusable input component
            ├── Modal.tsx                   # Reusable modal component
            └── Spinner.tsx                 # Loading spinner
    └── 📁lib
        └── 📁ai
            ├── openai.ts                   # OpenAI API client and helpers
            ├── stream-handler.ts           # Unified streaming response handler
            └── types.ts                    # TypeScript types for AI responses
        └── 📁database
            ├── prisma.ts                   # Prisma client instance
            └── queries.ts                  # Database query functions
        └── 📁utils
            ├── theme.ts                    # Theme utilities and presets
            └── helpers.ts                  # General utility functions
    └── 📁hooks
        ├── useChat.ts                      # Custom hook for chat logic
        ├── useConversations.ts             # Custom hook for conversation management
        └── useSettings.ts                  # Custom hook for user settings
    └── 📁types
        └── index.ts                        # Global TypeScript types
    └── 📁styles
        └── themes.css                      # Theme-specific CSS variables
    ├── favicon.ico
    ├── globals.css
    ├── layout.tsx                          # Root layout with theme provider
    └── page.tsx                            # Main chat page
└── 📁prisma
    └── schema.prisma                       # Database schema definition
└── 📁public
    └── 📁backgrounds
        ├── default-1.jpg                   # Default background images
        ├── default-2.jpg
        └── default-3.jpg
└── .env.local                              # Environment variables (API keys)
└── package.json
└── tsconfig.json
└── tailwind.config.ts
└── next.config.js