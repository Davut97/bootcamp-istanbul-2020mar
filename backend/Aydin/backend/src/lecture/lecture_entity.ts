import {Entity, Column, PrimaryColumn, ManyToOne} from 'typeorm';
import {Course} from '../course/course_entity';
@Entity()
export class Lecture {
  @PrimaryColumn()
  lectureName: string;

  @Column({nullable: false})
  lectureDay: string;
  @Column({nullable: false})
  lectureHour: string;
  @ManyToOne((type) => Course, (course) => course.lectures)
  course: Course;
}
