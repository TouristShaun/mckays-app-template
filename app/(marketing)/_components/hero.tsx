"use client"

import { motion } from "framer-motion"

export function Hero() {
  return (
    <div className="text-center">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl"
      >
        Build Your Meaningful Business
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto"
      >
        Get personalized guidance from MeaningfulPath Bit, your AI companion for
        building a purpose-driven solopreneur business.
      </motion.p>
    </div>
  )
} 