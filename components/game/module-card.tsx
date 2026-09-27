import Link from "next/link";
import { Lock, Play } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { QuizModule } from "@/types";

type ModuleCardProps = {
  module: QuizModule;
};

/**
 * Card de módulo de quiz no dashboard e na lista.
 */
export function ModuleCard({ module }: ModuleCardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{module.title}</CardTitle>
        <CardDescription>{module.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {module.isAvailable && module.href ? (
          <Button asChild className="h-11 w-full sm:w-auto">
            <Link href={module.href}>
              <Play />
              Jogar
            </Link>
          </Button>
        ) : (
          <p className="text-muted-foreground flex items-center gap-2 text-sm">
            <Lock className="size-4" aria-hidden="true" />
            Em breve
          </p>
        )}
      </CardContent>
    </Card>
  );
}
