'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Error Icon */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-orange-500/10 flex items-center justify-center">
                <AlertTriangle className="w-16 h-16 text-orange-500" strokeWidth={1.5} />
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Something Went Wrong
          </h1>

          {/* Description */}
          <p className="text-lg text-slate-400 mb-8 max-w-md mx-auto">
            We encountered an unexpected error while processing your request. Please try again or contact support if the problem persists.
          </p>

          {/* Error Details (only in development) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mb-8 p-4 bg-slate-900 rounded-lg text-left max-w-lg mx-auto">
              <p className="text-xs text-slate-500 mb-2">Error Details (dev only):</p>
              <p className="text-sm text-red-400 font-mono break-all">
                {error.message}
              </p>
              {error.digest && (
                <p className="text-xs text-slate-600 mt-2">Digest: {error.digest}</p>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={reset}
              className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              <RefreshCcw className="w-5 h-5" />
              Try Again
            </motion.button>

            <Link href="/">
              <button className="flex items-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-lg font-semibold hover:bg-slate-700 transition-colors">
                <Home className="w-5 h-5" />
                Go Home
              </button>
            </Link>
          </div>

          {/* Support Link */}
          <div className="mt-12 pt-8 border-t border-slate-800">
            <p className="text-sm text-slate-500 mb-2">Need help?</p>
            <Link 
              href="/contact" 
              className="text-sm text-orange-500 hover:text-orange-400 transition-colors"
            >
              Contact our support team
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
