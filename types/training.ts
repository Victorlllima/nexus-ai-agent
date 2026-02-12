export type TrainingType = 'text' | 'url' | 'youtube' | 'document';

export interface TrainingData {
  id: string;
  agent_id: string;
  type: TrainingType;
  content: string;
  metadata: TrainingMetadata;
  created_at: string;
}

export type TrainingMetadata =
  | TextTrainingMetadata
  | UrlTrainingMetadata
  | YoutubeTrainingMetadata
  | DocumentTrainingMetadata;

export interface TextTrainingMetadata {
  image_url?: string;
  image_size?: number;
}

export interface UrlTrainingMetadata {
  url: string;
  crawl: boolean;
  update_frequency: 'never' | 'daily' | 'weekly' | 'monthly';
  last_updated: string;
  pages_scraped?: number;
}

export interface YoutubeTrainingMetadata {
  video_url: string;
  duration: number; // em segundos
  title?: string;
  channel?: string;
}

export interface DocumentTrainingMetadata {
  filename: string;
  size: number;
  chunk_index?: number;
  total_chunks?: number;
  page_range?: string;
  file_type: 'pdf' | 'docx' | 'txt';
}

export interface TrainingUpload {
  type: TrainingType;
  content?: string;
  file?: File;
  url?: string;
  metadata?: Partial<TrainingMetadata>;
}
