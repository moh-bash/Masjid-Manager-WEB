import { Recitation, Sura } from "./types";
import suras from "@/lib/data/suras.json";

const suraList = suras as unknown as Sura[];

export function getSuraName(number: number): string {
  return suraList.find((s) => s.number === number)?.name ?? `سورة ${number}`;
}

export function formatSessionDate(date: string): string {
  const d = new Date(date);
  return Number.isNaN(d.getTime()) ? date : d.toLocaleDateString("ar");
}

export type ScoreCategory =
  | "EXCELLENT"
  | "VERY_GOOD"
  | "ACCEPTABLE"
  | "NEEDS_IMPROVEMENT";

export interface ScoreInfo {
  label: string;
  className: string;
  category: ScoreCategory;
}

export function scoreInfo(score: number): ScoreInfo {
  if (score >= 90) {
    return {
      label: "ممتاز",
      className: "bg-emerald-50 text-emerald-700",
      category: "EXCELLENT",
    };
  }
  if (score >= 75) {
    return {
      label: "جيد جداً",
      className: "bg-sky-50 text-sky-700",
      category: "VERY_GOOD",
    };
  }
  if (score >= 50) {
    return {
      label: "مقبول",
      className: "bg-amber-50 text-amber-700",
      category: "ACCEPTABLE",
    };
  }
  return {
    label: "يحتاج تحسين",
    className: "bg-red-50 text-red-600",
    category: "NEEDS_IMPROVEMENT",
  };
}

export interface RecitationStats {
  total: number;
  averageScore: number;
  bestScore: number;
  uniqueSuras: number;
  lastRecitationDate: string | null;
}

export function calculateRecitationStats(
  recitations: Recitation[]
): RecitationStats {
  if (recitations.length === 0) {
    return {
      total: 0,
      averageScore: 0,
      bestScore: 0,
      uniqueSuras: 0,
      lastRecitationDate: null,
    };
  }

  const totalScore = recitations.reduce((sum, r) => sum + r.score, 0);
  const bestScore = recitations.reduce((max, r) => Math.max(max, r.score), 0);
  const uniqueSuras = new Set(recitations.map((r) => r.suraNumber)).size;
  const sorted = [...recitations].sort(
    (a, b) => new Date(b.session.date).getTime() - new Date(a.session.date).getTime()
  );

  return {
    total: recitations.length,
    averageScore: Math.round(totalScore / recitations.length),
    bestScore,
    uniqueSuras,
    lastRecitationDate: sorted[0]?.session.date ?? null,
  };
}