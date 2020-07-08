import {Router} from 'express';
import {getManager} from 'typeorm';
import {Lecturer} from './lecturer_entity';
import {Course} from '../course/course_entity';
import {Student} from '../student/student_entity';
const LecturerController = Router();

LecturerController.post('/', async (req, res) => {
  try {
    const lecturer = new Lecturer();
    lecturer.firstName = req.body.firstName;
    lecturer.lastName = req.body.lastName;
    lecturer.email = req.body.email;
    lecturer.password = req.body.password;
    const repo = getManager().getRepository(Lecturer);
    await repo.save(lecturer);
    res.sendStatus(201);
  } catch (error) {
    res.send(error);
  }
});
LecturerController.put('/course', async (req, res) => {
  try {
    const courseRepo = getManager().getRepository(Course);
    const studentRepo = getManager().getRepository(Student);
    const course = await courseRepo.findOne({
      where: {
        CourseId: req.query.courseId,
      },
    });
    const student = await studentRepo.findOne({
      where: {
        studentId: req.body.studentId,
      },
    });
    course.students = [student];
    await courseRepo.save(course);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(204);
  }
});
export {LecturerController};
