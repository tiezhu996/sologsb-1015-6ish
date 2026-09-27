export type Tone = '平' | '仄' | '中' | '?';
export type MarkTone = '平' | '仄' | '中';

/** ok＝节奏点停顿已标；missing＝节奏点未标停顿（缺句读）；offside＝非节奏点标了停顿（越位）；none＝不涉及 */
export type PauseStatus = 'ok' | 'missing' | 'offside' | 'none';

export interface CharacterMark {
  tone: MarkTone | '?';
  rhyme: string;
  pauseAfter: boolean;
  basis: string;
  note: string;
}

export interface PoemVersion {
  id: string;
  name: string;
  source: string;
  createdAt: string;
  text: string;
  marks: Record<string, CharacterMark>;
  antithesisPairs: AntithesisPair[];
}

export interface AntithesisPair {
  id: string;
  leftLine: number;
  rightLine: number;
  note: string;
}

export interface PoemWorkspace {
  title: string;
  author: string;
  templateId: string;
  versions: PoemVersion[];
  activeVersionId: string;
  updatedAt: string;
}

export interface MeterTemplate {
  id: string;
  name: string;
  summary: string;
  lineCount: number;
  lineLength: number;
  pattern: Tone[];
  rhymeLines: number[];
}

export interface AnalysisCell {
  char: string;
  position: number;
  expected: Tone;
  actual: Tone;
  status: 'correct' | 'variant' | 'error' | 'unknown' | 'neutral';
  message: string;
  pauseStatus: PauseStatus;
  pauseMessage: string;
  mark: CharacterMark;
}

export interface AnalysisLine {
  index: number;
  cells: AnalysisCell[];
  rhymeChars: string[];
  errors: number;
  variants: number;
  pauseIssues: number;
}

export type IssueCategory = 'meter' | 'pause' | 'other';

export interface PoemIssue {
  id: string;
  level: 'error' | 'warning' | 'info';
  category: IssueCategory;
  title: string;
  detail: string;
  line?: number;
  position?: number;
}

export interface CharDiff {
  index: number;
  left: string;
  right: string;
  changed: boolean;
}
