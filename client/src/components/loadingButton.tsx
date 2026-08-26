import React from 'react'

export default function LoadingButton({ className }: { className?: string }) {
    return (
        <span className={className||'h-7 w-7 border-2 border-white border-t-transparent rounded-full animate-spin'}></span>
    )
}
