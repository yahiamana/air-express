'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Home, ArrowLeft, Package } from 'lucide-react'

export default function NotFound() {
  useEffect(() => {
    document.title = '404 - Page Not Found | Air Express'
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* 404 Icon */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <Package className="w-32 h-32 text-orange-500/20" strokeWidth={1.5} />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl font-bold text-orange-500">404</span>
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Page Not Found
          </h1>

          {/* Description */}
          <p className="text-lg text-slate-400 mb-8 max-w-md mx-auto">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. The package might have been delivered elsewhere.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors"
              >
                <Home className="w-5 h-5" />
                Go Home
              </motion.button>
            </Link>

            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-lg font-semibold hover:bg-slate-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </button>
          </div>

          {/* Quick Links */}
          <div className="mt-12 pt-8 border-t border-slate-800">
            <p className="text-sm text-slate-500 mb-4">You might be looking for:</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link 
                href="/services" 
                className="text-sm text-orange-500 hover:text-orange-400 transition-colors"
              >
                Our Services
              </Link>
              <span className="text-slate-700">•</span>
              <Link 
                href="/about" 
                className="text-sm text-orange-500 hover:text-orange-400 transition-colors"
              >
                About Us
              </Link>
              <span className="text-slate-700">•</span>
              <Link 
                href="/contact" 
                className="text-sm text-orange-500 hover:text-orange-400 transition-colors"
              >
                Contact
              </Link>
              <span className="text-slate-700">•</span>
              <Link 
                href="/commander" 
                className="text-sm text-orange-500 hover:text-orange-400 transition-colors"
              >
                Order Delivery
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
