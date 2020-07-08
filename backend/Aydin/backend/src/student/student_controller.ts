import {Router} from 'express';
import {getManager} from 'typeorm';
import {Student} from './student_entity';

const StudentController = Router();

StudentController.post('/', async (req, res) => {
  try {
    const student = new Student();
    student.firstName = req.body.firstName;
    student.lastName = req.body.lastName;
    student.email = req.body.email;
    student.password = req.body.password;
    student.studentId = req.body.studentId;
    const repo = getManager().getRepository(Student);
    await repo.save(student);
    res.sendStatus(201);
  } catch (error) {
    res.send(error);
  }
});
export {StudentController};
