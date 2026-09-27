"use client";

import { Volume2, VolumeX } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useSettingsStore } from "@/stores/settings-store";

/**
 * Mute global persistido na sessão (CA-21).
 */
export function MuteToggle() {
  const isMuted = useSettingsStore((state) => state.isMuted);
  const toggleMute = useSettingsStore((state) => state.toggleMute);

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className="size-10"
      aria-pressed={isMuted}
      aria-label={isMuted ? "Ativar som" : "Silenciar som"}
      onClick={toggleMute}
    >
      {isMuted ? <VolumeX /> : <Volume2 />}
    </Button>
  );
}
