export type Tone = '平' | '仄' | '中' | '?';
export type MarkTone = '平' | '仄' | '中';

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

/** 句读检查结果：ok 合规 / missing 缺句读（该停没停）/ overrun 停顿越位（不该停却停了）/ na 句末不参与检查 */
export type PauseStatus = 'ok' | 'missing' | 'overrun' | 'na';

export interface AnalysisCell {
  char: string;
  position: number;
  expected: Tone;
  actual: Tone;
  status: 'correct' | 'variant' | 'error' | 'unknown' | 'neutral';
  message: string;
  mark: CharacterMark;
  /** 是否为模板节奏点：五言第二字后，七言第二、第四字后（句末不算句中节奏点） */
  rhythmPoint: boolean;
  pauseStatus: PauseStatus;
  pauseMessage: string;
}

export interface AnalysisLine {
  index: number;
  cells: AnalysisCell[];
  rhymeChars: string[];
  errors: number;
  variants: number;
  missingPauses: number;
  overrunPauses: number;
}

/** 问题类别：meter 平仄 / pause 句读 / rhyme 韵部 / other 其他提示 */
export type IssueKind = 'meter' | 'pause' | 'rhyme' | 'other';

export interface PoemIssue {
  id: string;
  level: 'error' | 'warning' | 'info';
  title: string;
  detail: string;
  line?: number;
  position?: number;
  kind?: IssueKind;
  pauseStatus?: 'missing' | 'overrun';
}

export interface CharDiff {
  index: number;
  left: string;
  right: string;
  changed: boolean;
}
