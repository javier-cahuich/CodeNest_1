import { create } from "zustand";
import { DEFAULT_COURSE_ID, type CourseId } from "@/data/courses";

type CourseState = {
  selectedCourseId: CourseId;
  setSelectedCourseId: (id: CourseId) => void;
};

export const useCourseStore = create<CourseState>((set) => ({
  selectedCourseId: DEFAULT_COURSE_ID,
  setSelectedCourseId: (id) => set({ selectedCourseId: id }),
}));
