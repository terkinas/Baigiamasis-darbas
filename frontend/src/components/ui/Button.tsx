"use client"

import { cn } from "@/lib/utils"
import { VariantProps, cva } from "class-variance-authority"
import Link from "next/link"
import React from "react"

const buttonVariants = cva(
    "bg-red-100",
    {
        variants: {
            variant: {
                default: 
                    "text-sm  text-custom-gray-100 bg-custom-green-500 hover:bg-custom-green-500-hovered focus:ring-1 focus:outline-none rounded text-center dark:hover:bg-custom-green-500",
                xs:
                    "text-xs  text-center text-custom-gray-100 bg-custom-green-500 rounded hover:bg-custom-green-500-hovered focus:ring-1 focus:outline-none dark:hover:bg-custom-green-500",
                sm:
                    "text-sm  text-center text-custom-gray-100 bg-custom-green-500 rounded hover:bg-custom-green-500-hovered focus:ring-1 focus:outline-none dark:hover:bg-custom-green-500",
                secondary:  
                    "text-sm   text-custom-gray-400 bg-custom-gray-500 hover:bg-custom-gray-600 focus:ring-1 focus:outline-none rounded text-center dark:bg-custom-gray-600",
            },
            size: {
                default: "px-5 py-2.5",
                xs: "px-3 py-2",
                sm: "px-3 py-2",
            }
        },
        defaultVariants: {
            variant: "default",
            size: "default"
        
        }
    }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, children, href, variant, size, ...props }, ref) => {
      if (href) {
        return (
          <Link
            href={href}
            className={cn(buttonVariants({ variant, size, className }))}
          >
            {children}
          </Link>
        )
      }
      return (
        <button
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          {children}
        </button>
      )
    }
  )
  Button.displayName = 'Button'
  
  export { Button, buttonVariants }