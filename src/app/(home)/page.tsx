"use client";

import { motion } from "framer-motion";
import { Pacifico } from "next/font/google";
import Image from "next/image";
import { cn } from "~/lib/utils";
import { handleGetStarted } from "~/server/actions";

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
});

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "border-2 border-white/[0.15] backdrop-blur-[2px]",
            "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]",
          )}
        />
      </motion.div>
    </motion.div>
  );
}

export default function Home() {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#030303]">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.05] via-transparent to-red-500/[0.05] blur-3xl" />

      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient="from-blue-500/[0.15]"
          className="left-[-10%] top-[15%] md:left-[-5%] md:top-[20%]"
        />

        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient="from-red-500/[0.15]"
          className="right-[-5%] top-[70%] md:right-[0%] md:top-[75%]"
        />

        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-blue-500/[0.15]"
          className="bottom-[5%] left-[5%] md:bottom-[10%] md:left-[10%]"
        />

        <ElegantShape
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          gradient="from-red-500/[0.15]"
          className="right-[15%] top-[10%] md:right-[20%] md:top-[15%]"
        />
      </div>

      <nav className="relative z-10 flex w-full items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          <Image
            src="/drive-clone-logo.svg"
            alt="Drive Clone"
            width={24}
            height={24}
          />
          <span className="font-semibold text-white">Drive Clone</span>
        </div>
      </nav>

      <div className="container relative z-10 mx-auto flex flex-grow items-center px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl md:mb-8 md:text-7xl">
              <span className="bg-gradient-to-b from-white to-white/80 bg-clip-text text-transparent">
                Welcome to
              </span>
              <br />
              <span
                className={cn(
                  "bg-gradient-to-r from-blue-400 via-white/90 to-red-400 bg-clip-text px-3 text-transparent",
                  pacifico.className,
                )}
              >
                Drive Clone
              </span>
            </h1>
          </motion.div>

          <motion.div
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <p className="mx-auto mb-8 max-w-xl px-4 text-sm font-light leading-relaxed tracking-wide text-white/30 sm:text-base">
              Your secure, efficient, and user-friendly cloud storage solution.
              Store, sync, and share your files with ease.
            </p>
          </motion.div>

          <motion.div
            custom={3}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <form action={handleGetStarted}>
              <button
                type="submit"
                className="transform rounded-full bg-blue-600 px-6 py-3 font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-blue-700"
              >
                Get Started
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      <footer className="relative z-10 w-full py-4 text-center text-sm text-white/30">
        &copy; {new Date().getFullYear()} Drive Clone. All rights reserved.
      </footer>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80" />
    </div>
  );
}
