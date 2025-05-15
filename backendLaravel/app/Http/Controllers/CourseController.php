<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\course;
use App\Models\users;
use App\Models\userscourse;
use Illuminate\Support\Facades\DB;


class CourseController extends Controller
{
    public function course(Request $request)
    {
        $username = $request['username'] ?? '';
        $instructor = $request['instructor'] ?? '';

        
        $uid = users::where('username', $username)->first()['Uid'];
        $iid = users::where('username', $instructor)->first()['Uid'];
        $CID=Course::where('instructorID', $iid)->get();

        $CIDarray = array();
        for($i = 0; $i < sizeof($CID); $i++){
            array_push($CIDarray, $CID[$i]['Cid']);
        }

        $course = UsersCourse::where('Uid', $uid)
                    ->whereIn('Cid', $CIDarray)
                    ->get();

        $courseArray = array();
        for($i = 0; $i < sizeof($course); $i++){
            $courseName=Course::where('Cid', $course[$i]['Cid'])->get();
            array_push($courseArray, $courseName[0]['courseName']);
        }
        
        if ($courseArray) {
            return response()->json($courseArray);
        } else {
            return ['message' => 'Course not found'];
        }
    }

    public function studentCourse(Request $request)
    {
        $username = $request['username'] ?? '';

        $uid = users::where('username', $username)->first()['Uid'];
        $CID=userscourse::where('Uid', $uid)->get();

        $CIDarray = array();
        for($i = 0; $i < sizeof($CID); $i++){
            array_push($CIDarray, $CID[$i]['Cid']);
        }

        $course = Course::whereIn('Cid', $CIDarray)->get();
        $courseNamesArray = array();
        for($i = 0; $i < sizeof($course); $i++){
            array_push($courseNamesArray, $course[$i]['courseName']);
        }
       
        if ($courseNamesArray) {
            return $courseNamesArray;
        } else {
            return ['message' => 'No Courses Registered'];
        }
    }

    public function instructorCourse(Request $request)
    {
        $username = $request['username'] ?? '';

        $uid = users::where('username', $username)->first()['Uid'];
        $CID= course::where('instructorID', $uid)->get();

        $courseNamesArray = array();
        for($i = 0; $i < sizeof($CID); $i++){
            array_push($courseNamesArray, $CID[$i]['courseName']);
        }
       
        if ($courseNamesArray) {
            return $courseNamesArray;
        } else {
            return ['message' => 'No Courses Registered'];
        }
    }

    public function instructorCourseContent(Request $request)
    {
        $username = $request['username'] ?? '';

        $uid = users::where('username', $username)->first()['Uid'];
        $CID= course::where('instructorID', $uid)->get();

        $courseNamesArray = array();
        for($i = 0; $i < sizeof($CID); $i++){
            array_push($courseNamesArray, $CID[$i]['courseName']."&&&".$CID[$i]['courseContent']);
        }
       
        if ($courseNamesArray) {
            return $courseNamesArray;
        } else {
            return ['message' => 'No Courses Registered'];
        }
    }

    public function updateCourseContent(Request $request)
    {
        $username = $request['username'] ?? '';
        $courseContent = $request['courseContent'] ?? '';
        $courseName = $request['courseName'] ?? '';

        $uid = users::where('username', $username)->first()['Uid'];
        // $CID= course::where('courseName', $courseName)->update(['courseContent' => $courseContent]);
        $course=DB::update('UPDATE course SET courseContent = ? where courseName = ?',[$courseContent,$courseName]);

        if ($course==1) {
            return $course;
        } else {
            return ['message' => 'Course Content Updation Failed. Please check Course name and course content'];
        }
    }

    public function addCourse(Request $request)
    {
        $username = $request['username'] ?? '';
        $courseName = $request['courseName'] ?? '';
        $courseCode = $request['courseCode'] ?? '';

        $uid = users::where('username', $username)->first()['Uid'];
        $course=DB::insert('INSERT INTO course (courseCode,courseName,courseContent,programObjective,instructorID,programID) VALUES(?,?,?,?,?,?)',[$courseCode,$courseName,'','',$uid,'1']);

        if ($course==1) {
            return $course;
        } else {
            return ['message' => 'Course could not be added'];
        }
    }

    public function deleteCourse(Request $request)
    {
        $courseName = $request['course'] ?? '';

        $course=DB::delete('DELETE FROM course WHERE courseName = ?',[$courseName]);

        if ($course==1) {
            return $course;
        } else {
            return ['message' => 'Course could not be deleted'];
        }
    }

    public function allCourse(Request $request)
    {
        $course = Course::get();
        
        $courseArray = array();
        for($i = 0; $i < sizeof($course); $i++){
            array_push($courseArray, $course[$i]['courseName']);
        }

        if ($courseArray) {
            return $courseArray;
        } else {
            return ['message' => 'No Courses Found'];
        }
    }

    public function index()
    {
        return Course::all();
    }

    public function display($id)
    {
        $course = Course::find($id);

        if ($course) {
            return response()->json($course);
        } else {
            return response()->json(['message' => 'Course not found'], 404);
        }
    }

    public function add(Request $request)
    {
     
        $course = Course::create($request->all());

        return response()->json(['message' => 'Course added successfully', 'course' => $course], 201);
    }

    public function update(Request $request, $id)
    {
        $course = Course::find($id);

        if ($course) {
         
            $course->update($request->all());

            return response()->json(['message' => 'Course updated successfully', 'course' => $course]);
        } else {
            return response()->json(['message' => 'Course not found'], 404);
        }
    }

    public function delete($id)
    {
        $course = Course::find($id);

        if ($course) {
            $course->delete();
            return response()->json(['message' => 'Course deleted successfully']);
        } else {
            return response()->json(['message' => 'Course not found'], 404);
        }
    }
}
