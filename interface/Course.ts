export interface Lesson {
    id: number;
    videoUrl: string;
    title: string;
  }
  
export interface Course {
    id: number;
    title: string;
    thumbnailUrl: string;
    lessons: Lesson[];
  }