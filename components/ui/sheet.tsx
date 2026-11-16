'use client';

import * as React from "react"
import { createPortal } from "react-dom"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface SheetContextType {
  open: boolean
  setOpen: (open: boolean) => void
}

const SheetContext = React.createContext<SheetContextType>({
  open: false,
  setOpen: () => {},
})

interface SheetProps {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  defaultOpen?: boolean
}

export function Sheet({ children, open: controlledOpen, onOpenChange, defaultOpen = false }: SheetProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : uncontrolledOpen

  const setOpen = React.useCallback(
    (newOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(newOpen)
      }
      onOpenChange?.(newOpen)
    },
    [isControlled, onOpenChange]
  )

  return (
    <SheetContext.Provider value={{ open, setOpen }}>
      {children}
    </SheetContext.Provider>
  )
}

export function useSheet() {
  return React.useContext(SheetContext)
}

export interface SheetTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

export const SheetTrigger = React.forwardRef<HTMLButtonElement, SheetTriggerProps>(
  ({ className, onClick, children, ...props }, ref) => {
    const { setOpen, open } = useSheet()
    return (
      <button
        ref={ref}
        type="button"
        onClick={(e) => {
          onClick?.(e)
          setOpen(!open)
        }}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {children}
      </button>
    )
  }
)
SheetTrigger.displayName = "SheetTrigger"

export interface SheetCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const SheetClose = React.forwardRef<HTMLButtonElement, SheetCloseProps>(
  ({ className, onClick, children, ...props }, ref) => {
    const { setOpen } = useSheet()
    return (
      <button
        ref={ref}
        type="button"
        onClick={(e) => {
          onClick?.(e)
          setOpen(false)
        }}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {children}
      </button>
    )
  }
)
SheetClose.displayName = "SheetClose"

export interface SheetContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: "top" | "bottom" | "left" | "right"
}

export const SheetContent = React.forwardRef<HTMLDivElement, SheetContentProps>(
  ({ className, children, side = "right", ...props }, ref) => {
    const { open, setOpen } = useSheet()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
      setMounted(true)
    }, [])

    React.useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape" && open) {
          setOpen(false)
        }
      }
      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }, [open, setOpen])

    React.useEffect(() => {
      if (open) {
        document.body.style.overflow = "hidden"
      } else {
        document.body.style.overflow = ""
      }
      return () => {
        document.body.style.overflow = ""
      }
    }, [open])

    if (!open || !mounted) return null

    const sideClasses = {
      top: "inset-x-0 top-0 border-b animate-in slide-in-from-top duration-300",
      bottom: "inset-x-0 bottom-0 border-t animate-in slide-in-from-bottom duration-300",
      left: "inset-y-0 left-0 h-full w-[320px] sm:w-[380px] max-w-[88vw] border-r border-slate-200 animate-in slide-in-from-left duration-300",
      right: "inset-y-0 right-0 h-full w-[320px] sm:w-[380px] max-w-[88vw] border-l border-slate-200 animate-in slide-in-from-right duration-300",
    }

    return createPortal(
      <div className="fixed inset-0 z-[100] flex">
        {/* Full screen backdrop */}
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-slate-950/75 backdrop-blur-xs transition-opacity duration-300 z-[100]"
          aria-hidden="true"
        />

        {/* Sheet panel - 100% solid, fully opaque */}
        <div
          ref={ref}
          className={cn(
            "fixed z-[101] bg-white text-slate-900 shadow-2xl transition ease-in-out flex flex-col h-full max-h-screen overflow-hidden",
            sideClasses[side],
            className
          )}
          {...props}
        >
          <button
            onClick={() => setOpen(false)}
            className="absolute right-3.5 top-3.5 z-20 rounded-lg p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none cursor-pointer"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
          {children}
        </div>
      </div>,
      document.body
    )
  }
)
SheetContent.displayName = "SheetContent"

export const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-1.5 text-left", className)} {...props} />
)
SheetHeader.displayName = "SheetHeader"

export const SheetTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2 ref={ref} className={cn("text-lg font-semibold text-slate-900", className)} {...props} />
  )
)
SheetTitle.displayName = "SheetTitle"

export const SheetDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-slate-500", className)} {...props} />
  )
)
SheetDescription.displayName = "SheetDescription"


