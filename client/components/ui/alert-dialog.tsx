"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/client/components/ui/button"

/* ------------------------------------------------------------------ */
/*  Self-contained Shadcn-style AlertDialog — no Radix dependency     */
/* ------------------------------------------------------------------ */

interface AlertDialogContextValue {
  open: boolean
  setOpen: (v: boolean) => void
}

const AlertDialogContext = React.createContext<AlertDialogContextValue>({
  open: false,
  setOpen: () => {},
})

function AlertDialog({
  children,
  open,
  onOpenChange,
  defaultOpen = false,
}: {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (v: boolean) => void
  defaultOpen?: boolean
}) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
  const isControlled = open !== undefined
  const isOpen = isControlled ? open : internalOpen
  const setOpen = (v: boolean) => {
    if (!isControlled) setInternalOpen(v)
    onOpenChange?.(v)
  }
  return (
    <AlertDialogContext.Provider value={{ open: isOpen, setOpen }}>
      {children}
    </AlertDialogContext.Provider>
  )
}

function AlertDialogTrigger({
  children,
  asChild,
}: {
  children: React.ReactNode
  asChild?: boolean
}) {
  const { setOpen } = React.useContext(AlertDialogContext)
  if (asChild) {
    const child = React.Children.only(children) as React.ReactElement<any>
    return React.cloneElement(child, {
      onClick: (e: React.MouseEvent) => {
        child.props.onClick?.(e)
        setOpen(true)
      },
    })
  }
  return <span onClick={() => setOpen(true)}>{children}</span>
}

function AlertDialogPortal({ children }: { children: React.ReactNode }) {
  const { open } = React.useContext(AlertDialogContext)
  if (!open) return null
  return <>{children}</>
}

function AlertDialogOverlay({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { open, setOpen } = React.useContext(AlertDialogContext)
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />
      <div
        role="alertdialog"
        aria-modal="true"
        className={cn(
          "relative z-50 w-full max-w-md bg-white rounded-xl shadow-2xl border border-slate-200 p-6",
          className
        )}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        {children}
      </div>
    </div>
  )
}

function AlertDialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-2 mb-5", className)} {...props} />
}

function AlertDialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col-reverse sm:flex-row sm:justify-end gap-2 mt-6", className)}
      {...props}
    />
  )
}

function AlertDialogTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2 className={cn("text-base font-bold text-slate-900", className)} {...props} />
  )
}

function AlertDialogDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-sm text-slate-500 leading-relaxed", className)} {...props} />
  )
}

function AlertDialogAction({
  className,
  onClick,
  children,
  variant = "destructive",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "destructive" | "default" }) {
  const { setOpen } = React.useContext(AlertDialogContext)
  return (
    <Button
      variant={variant}
      className={cn(className)}
      onClick={(e) => {
        onClick?.(e as any)
        setOpen(false)
      }}
      {...(props as any)}
    >
      {children}
    </Button>
  )
}

function AlertDialogCancel({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { setOpen } = React.useContext(AlertDialogContext)
  return (
    <Button
      variant="outline"
      className={cn(className)}
      onClick={() => setOpen(false)}
      {...(props as any)}
    >
      {children ?? "Cancel"}
    </Button>
  )
}

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}
