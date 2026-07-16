import type { LucideIcon } from "lucide-react"
import {
  Inbox,
  Star,
  Tag,
  Users,
  Bell,
  MailOpen,
  Flag,
} from "lucide-react"

export type CategoryId =
  | "primary"
  | "important"
  | "promotions"
  | "social"
  | "updates"
  | "starred"
  | "unread"

export interface MailCategory {
  id: CategoryId
  label: string
  description: string
  icon: LucideIcon
}

export const MAIL_CATEGORIES: MailCategory[] = [
  { id: "primary", label: "Primary", description: "Main inbox conversations", icon: Inbox },
  { id: "important", label: "Important", description: "Priority-flagged messages", icon: Flag },
  { id: "promotions", label: "Promotions", description: "Deals, offers & marketing", icon: Tag },
  { id: "social", label: "Social", description: "Updates from social networks", icon: Users },
  { id: "updates", label: "Updates", description: "Receipts, bills & alerts", icon: Bell },
  { id: "starred", label: "Starred", description: "Messages you've starred", icon: Star },
  { id: "unread", label: "Unread Only", description: "Skip messages you've read", icon: MailOpen },
]

export type ReadingModeId = "subject" | "subject-preview" | "full"

export interface ReadingMode {
  id: ReadingModeId
  label: string
  description: string
}

export const READING_MODES: ReadingMode[] = [
  { id: "subject", label: "Subject Only", description: "Read just the subject line" },
  { id: "subject-preview", label: "Subject + Preview", description: "Subject plus a short snippet" },
  { id: "full", label: "Full Email", description: "Read the entire message body" },
]

export interface VoiceOption {
  id: string
  label: string
  accent: string
}

export const VOICE_OPTIONS: VoiceOption[] = [
  { id: "aria", label: "Aria", accent: "US English · Female" },
  { id: "guy", label: "Guy", accent: "US English · Male" },
  { id: "sonia", label: "Sonia", accent: "UK English · Female" },
  { id: "ryan", label: "Ryan", accent: "UK English · Male" },
  { id: "natasha", label: "Natasha", accent: "AU English · Female" },
  { id: "will", label: "Will", accent: "CA English · Male" },
]

export type ScheduleId = "hourly" | "daily" | "weekdays" | "custom"

export interface ScheduleOption {
  id: ScheduleId
  label: string
  description: string
}

export const SCHEDULE_OPTIONS: ScheduleOption[] = [
  { id: "hourly", label: "Hourly", description: "Check for new mail every hour" },
  { id: "daily", label: "Daily", description: "One digest at a set time each day" },
  { id: "weekdays", label: "Weekdays", description: "Monday to Friday mornings only" },
  { id: "custom", label: "Custom time", description: "Pick your own recurring time" },
]

export interface MockEmail {
  id: string
  from: string
  subject: string
  body: string
}

export const MOCK_EMAILS: MockEmail[] = [
  {
    id: "email-1",
    from: "Jordan Blake",
    subject: "Meeting Reminder",
    body: "Your client meeting starts at 2 PM today.",
  },
  {
    id: "email-2",
    from: "Billing Team",
    subject: "Invoice Paid",
    body: "Your payment has been received successfully.",
  },
  {
    id: "email-3",
    from: "Shop Deals",
    subject: "Summer Sale",
    body: "Get 40 percent off all products this weekend.",
  },
]

/** Builds the spoken text for an email based on the selected reading mode. */
export function buildReadingText(email: MockEmail, mode: ReadingModeId): string {
  const preview = email.body.length > 60 ? `${email.body.slice(0, 60).trim()}…` : email.body
  switch (mode) {
    case "subject":
      return `${email.subject}.`
    case "subject-preview":
      return `${email.subject}. ${preview}`
    case "full":
      return `Email from ${email.from}. Subject: ${email.subject}. ${email.body}`
    default:
      return email.subject
  }
}
