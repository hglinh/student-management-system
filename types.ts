
export interface Student {
  id: string;
  code: string;
  name: string;
  classId?: string;
  class: string;
  dob: string;
  gender: 'Nam' | 'Nữ';
  status: 'Đang học' | 'Đã nghỉ' | 'Bảo lưu';
  address?: string;
  avatar?: string;
  birthplace?: string;
}

export interface ClassItem {
  id: string;
  name: string;
  studentCount: number;
  teacherId?: string;
  teacher: string;
  status: 'Đang hoạt động' | 'Đã kết thúc' | 'Sắp mở';
}

export interface GradeRow {
  id: number;
  name: string;
  oral: number;
  min15: number;
  period1: number;
  final: number;
  average: number;
}

export interface Notification {
  id: number;
  icon: string;
  color: string;
  text: string;
  time: string;
  title?: string;
  description?: string;
  createdAt?: string;
}

export interface ScheduleRow {
  time: string;
  mon: string;
  tue: string;
  wed: string;
  thu: string;
  fri: string;
  sat: string;
}

export interface Schedule {
  classId: string;
  className: string;
  rows: ScheduleRow[];
}
