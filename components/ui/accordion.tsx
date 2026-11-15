'use client';

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface AccordionContextType {
  value: string | string[]
  onItemChange: (itemValue: string) => void
  type: "single" | "multiple"
}

const AccordionContext = React.createContext<AccordionContextType>({
  value: "",
  onItemChange: () => {},
  type: "single",
})

interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "single" | "multiple"
  collapsible?: boolean
  defaultValue?: string | string[]
  value?: string | string[]
  onValueChange?: (value: any) => void
}

export function Accordion({
  type = "single",
  collapsible = true,
  defaultValue = "",
  value: controlledValue,
  onValueChange,
  className,
  children,
  ...props
}: AccordionProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState<string | string[]>(defaultValue)
  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : uncontrolledValue

  const onItemChange = React.useCallback(
    (itemValue: string) => {
      if (type === "single") {
        const next = value === itemValue && collapsible ? "" : itemValue
        if (!isControlled) setUncontrolledValue(next)
        onValueChange?.(next)
      } else {
        const currentList = Array.isArray(value) ? value : value ? [value] : []
        const exists = currentList.includes(itemValue)
        const nextList = exists
          ? currentList.filter((v) => v !== itemValue)
          : [...currentList, itemValue]
        if (!isControlled) setUncontrolledValue(nextList)
        onValueChange?.(nextList)
      }
    },
    [type, collapsible, value, isControlled, onValueChange]
  )

  return (
    <AccordionContext.Provider value={{ value, onItemChange, type }}>
      <div className={cn("space-y-3", className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

interface AccordionItemContextType {
  value: string
  isOpen: boolean
}

const AccordionItemContext = React.createContext<AccordionItemContextType>({
  value: "",
  isOpen: false,
})

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

export const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ value, className, children, ...props }, ref) => {
    const { value: selectedValue } = React.useContext(AccordionContext)
    const isOpen = Array.isArray(selectedValue)
      ? selectedValue.includes(value)
      : selectedValue === value

    return (
      <AccordionItemContext.Provider value={{ value, isOpen }}>
        <div
          ref={ref}
          className={cn(
            "rounded-xl border border-slate-200 bg-white transition-all shadow-xs overflow-hidden",
            isOpen && "border-orange-500/50 shadow-md ring-1 ring-orange-500/20",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </AccordionItemContext.Provider>
    )
  }
)
AccordionItem.displayName = "AccordionItem"

export interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const { onItemChange } = React.useContext(AccordionContext)
    const { value, isOpen } = React.useContext(AccordionItemContext)

    return (
      <button
        ref={ref}
        type="button"
        onClick={() => onItemChange(value)}
        className={cn(
          "flex w-full items-center justify-between p-5 text-left font-semibold text-slate-800 transition-all hover:text-orange-600 cursor-pointer",
          isOpen && "text-orange-600 bg-orange-50/40",
          className
        )}
        {...props}
      >
        <span className="text-sm sm:text-base pr-4">{children}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200",
            isOpen && "rotate-180 text-orange-600"
          )}
        />
      </button>
    )
  }
)
AccordionTrigger.displayName = "AccordionTrigger"

export interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className, children, ...props }, ref) => {
    const { isOpen } = React.useContext(AccordionItemContext)

    if (!isOpen) return null

    return (
      <div
        ref={ref}
        className={cn(
          "px-5 pb-5 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100/80 animate-in fade-in-50 duration-200",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
AccordionContent.displayName = "AccordionContent"

