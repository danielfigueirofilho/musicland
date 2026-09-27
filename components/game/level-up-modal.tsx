"use client";

import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";

type LevelUpModalProps = {
  level: number;
  onClose: () => void;
};

/**
 * Overlay de “subiu de nível!” (CA-16).
 */
export function LevelUpModal({ level, onClose }: LevelUpModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="level-up-title"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-card text-card-foreground w-full max-w-sm rounded-2xl border p-6 text-center shadow-lg"
      >
        <p className="text-primary text-sm font-semibold tracking-wide uppercase">
          Parabéns
        </p>
        <h2 id="level-up-title" className="font-heading mt-2 text-3xl font-semibold">
          Subiu de nível!
        </h2>
        <p className="text-muted-foreground mt-2 text-base">
          Você alcançou o nível {level}.
        </p>
        <Button type="button" className="mt-6 h-11 w-full" onClick={onClose}>
          Continuar
        </Button>
      </motion.div>
    </div>
  );
}
