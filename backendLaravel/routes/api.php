<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\ProgramController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\AssessmentController;
use App\Http\Controllers\ExamController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ProgramObjectiveController;

Route::prefix('user')->group(function () {
    Route::post('login', [UserController::class, 'login']);
    Route::post('signup', [UserController::class, 'signup']);
    Route::post('add', [UserController::class, 'add']);
    Route::put('update/{id}', [UserController::class, 'update']);
    Route::get('display/{userid}', [UserController::class, 'display']);
    Route::get('getall', [UserController::class, 'getall']);
    Route::post('delete/{userid}', [UserController::class, 'delete']);
    Route::post('forgotpassword', [UserController::class, 'forgotPassword']);
    Route::post('sendMessage', [UserController::class, 'sendMessage']);
    Route::post('getStudent', [UserController::class, 'getStudent']);
    Route::post('getPCStudent', [UserController::class, 'getPCStudent']);
    Route::post('allStudents', [UserController::class, 'allStudents']);
    Route::post('addStudent', [UserController::class, 'addStudent']);
    Route::post('deleteStudent', [UserController::class, 'deleteStudent']);
    Route::post('courseInstructor', [UserController::class, 'courseInstructor']);
    Route::post('studentInstructor', [UserController::class, 'studentInstructor']);
    Route::post('studentCoordinator', [UserController::class, 'studentCoordinator']);
});
Route::prefix('programs')->group(function () {
    Route::post('add', [ProgramController::class, 'add']);
    Route::get('getall', [ProgramController::class, 'index']);
    Route::delete('delete/{id}', [ProgramController::class, 'delete']);
    Route::put('update/{id}', [ProgramController::class, 'update']);
    Route::post('getPrograms', [ProgramController::class, 'getPrograms']);
    Route::post('getCoordinatorProgram', [ProgramController::class, 'getCoordinatorProgram']);
    Route::post('addProgram', [ProgramController::class, 'addProgram']);
    Route::post('deleteProgram', [ProgramController::class, 'deleteProgram']);
});

Route::post('/course', [CourseController::class, 'course']);
Route::post('/studentCourse', [CourseController::class, 'studentCourse']);
Route::post('/instructorCourse', [CourseController::class, 'instructorCourse']);
Route::post('/instructorCourseContent', [CourseController::class, 'instructorCourseContent']);
Route::post('/updateCourseContent', [CourseController::class, 'updateCourseContent']);
Route::post('/addCourse', [CourseController::class, 'addCourse']);
Route::post('/deleteCourse', [CourseController::class, 'deleteCourse']);
Route::post('/allCourse', [CourseController::class, 'allCourse']);

Route::get('/courses', [CourseController::class, 'index']);
Route::get('/courses/{id}', [CourseController::class, 'display']);
Route::post('/courses', [CourseController::class, 'add']);
Route::put('/courses/{id}', [CourseController::class, 'update']);
Route::delete('/courses/{id}', [CourseController::class, 'delete']);


Route::get('/assessments', [AssessmentController::class, 'index']);
Route::get('/assessments/{id}', [AssessmentController::class, 'display']);
Route::post('/assessments', [AssessmentController::class, 'add']);
Route::put('/assessments/{id}', [AssessmentController::class, 'update']);
Route::delete('/assessments/{id}', [AssessmentController::class, 'delete']);
Route::post('/scores', [AssessmentController::class, 'scores']);
Route::post('/getScores', [AssessmentController::class, 'getScores']);
Route::post('/createExam', [AssessmentController::class, 'createExam']);
Route::post('/createAssessment', [AssessmentController::class, 'createAssessment']);
Route::post('/getExam', [AssessmentController::class, 'getExam']);
Route::post('/updateGrades', [AssessmentController::class, 'updateGrades']);
Route::post('/getAllCourseScores', [AssessmentController::class, 'getAllCourseScores']);
Route::post('/allAssessments', [AssessmentController::class, 'allAssessments']);

Route::prefix('message')->group(function () {
    Route::post('/save', [MessageController::class, 'saveMessage']);
    Route::get('/get/{senderId}/{receiverId}', [MessageController::class, 'getMessages']);
});

Route::prefix('programObjectives')->group(function () {
    Route::post('add', [ProgramObjectiveController::class, 'add']);
    Route::get('getall', [ProgramObjectiveController::class, 'index']);
    Route::delete('delete/{id}', [ProgramObjectiveController::class, 'delete']);
    Route::put('update/{id}', [ProgramObjectiveController::class, 'update']);
    Route::post('getProgramObjectives', [ProgramObjectiveController::class, 'getProgramObjectives']);
    Route::post('getCoordinatorProgramObjectives', [ProgramObjectiveController::class, 'getCoordinatorProgramObjectives']);
    Route::post('addProgramObjective', [ProgramObjectiveController::class, 'addProgramObjective']);
    Route::post('deleteProgramObjective', [ProgramObjectiveController::class, 'deleteProgramObjective']);
    Route::post('getAllProgramObjectives', [ProgramObjectiveController::class, 'getAllProgramObjectives']);
    Route::post('mapPO', [ProgramObjectiveController::class, 'mapPO']);
});
Route::get('/courses', [ExamController::class, 'index']);
Route::get('/courses/{id}', [ExamController::class, 'display']);
Route::post('/courses', [ExamController::class, 'add']);
Route::put('/courses/{id}', [ExamController::class, 'update']);
Route::delete('/courses/{id}', [ExamController::class, 'delete']);


Route::post('sendMessage', [ChatController::class, 'sendMessage']);
Route::post('studentSendMessage', [ChatController::class, 'studentSendMessage']);
Route::post('instructorSendMessage', [ChatController::class, 'instructorSendMessage']);
Route::post('coordinatorSendMessage', [ChatController::class, 'coordinatorSendMessage']);
Route::post('getStudentMessage', [ChatController::class, 'getStudentMessage']);
Route::post('getInstructorMessage', [ChatController::class, 'getInstructorMessage']);
Route::post('getStudentFeedback', [ChatController::class, 'getStudentFeedback']);
Route::post('getPCFeedback', [ChatController::class, 'getPCFeedback']);

