export type PlayerId = string;

export type PlayerProfile = {
  id: PlayerId;
  displayName: string;
  email: string | null;
  isGuest: boolean;
  xp: number;
  avatarId: string;
};

export type QuizModuleId =
  | "score-reading"
  | "rhythm"
  | "scales"
  | "intervals"
  | "harmony";

export type QuizModule = {
  id: QuizModuleId;
  title: string;
  description: string;
  isAvailable: boolean;
  href: string | null;
};

export type AchievementId =
  | "first-hit"
  | "five-correct"
  | "ten-streak"
  | "level-two"
  | "level-three";

export type Achievement = {
  id: AchievementId;
  title: string;
  description: string;
};

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  xp: number;
  avatarId: string;
};
