<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\assessments;
use App\Models\users;
use App\Models\exams;
use App\Models\userscourse;
use App\Models\course;
use Illuminate\Support\Facades\DB;

class AssessmentController extends Controller
{
    public function scores(Request $request)
    {        
        $username = $request['username'] ?? '';
        $scores = $request['scores'] ?? '';
        $CID = $request['CID'] ?? '';

        $uid = users::where('username', $username)->first()['Uid'];
        // $CID= course::where('courseName', $courseName)->update(['courseContent' => $courseContent]);
        $course=DB::update('UPDATE userscourse SET Score = ? where Uid = ? AND Cid = ?',[$scores,$uid,$CID]);

        if ($course==1) {
            return $course;
        } else {
            return ['message' => 'Score Updation Failed.'];
        }
    }

    public function getScores(Request $request)
    {        
        $username = $request['username'] ?? '';

        $uid = users::where('username', $username)->first()['Uid'];
        $CID= userscourse::where('Uid', $uid)->get();

        $Scores = array();
        for($i = 0; $i < sizeof($CID); $i++){
            array_push($Scores, $CID[$i]['Score']);
        }
       
        if ($Scores) {
            return $Scores;
        } else {
            return ['message' => 'No Scores Found'];
        }
    }

    public function getAllCourseScores(Request $request)
    {        
        $username = $request['username'] ?? '';

        $uid = users::where('username', $username)->first()['Uid'];
        $CID= userscourse::get();

        $Scores = array();
        for($i = 0; $i < sizeof($CID); $i++){
            array_push($Scores, $CID[$i]['Cid'].'&&&'.$CID[$i]['Score']);
        }
       
        if ($Scores) {
            return $Scores;
        } else {
            return ['message' => 'No Scores Found'];
        }
    }

    public function createExam(Request $request)
    {        
        $CID = $request['CID'] ?? '';
        $username = $request['username'] ?? '';
        $question1 = $request['question1'] ?? '';
        $question2 = $request['question2'] ?? '';
        $question3 = $request['question3'] ?? '';
        $question4 = $request['question4'] ?? '';
        $choices1 = $request['options1'] ?? '';
        $choices2 = $request['options2'] ?? '';
        $choices3 = $request['options3'] ?? '';
        $choices4 = $request['options4'] ?? '';
        $answer1 = $request['answer1'] ?? '';
        $answer2 = $request['answer2'] ?? '';
        $answer3 = $request['answer3'] ?? '';
        $answer4 = $request['answer4'] ?? '';

        $uid = users::where('username', $username)->first()['Uid'];
        $Cid= exams::where('Cid', $CID)->get();

        if(sizeof($Cid)>0)
        {
            $course=DB::update('UPDATE exams SET instructorID = ?,question1 = ?,question2 = ?,question3 = ?,question4 = ?,choices1 = ?,choices2 = ?,choices3 = ?,choices4 = ?,answer1 = ?,answer2 = ?,answer3 = ?,answer4 = ? WHERE Cid = ?',[$uid,$question1,$question2,$question3,$question4,$choices1,$choices2,$choices3,$choices4,$answer1,$answer2,$answer3,$answer4,$CID]);
            if ($course==1) {
                return $course;
            } else {
                return ['message' => 'Could not create exam'];
            }
        }
        else
        {
            $course=DB::insert('INSERT INTO exams (Cid,instructorID,question1,question2,question3,question4,choices1,choices2,choices3,choices4,answer1,answer2,answer3,answer4) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[$CID,$uid,$question1,$question2,$question3,$question4,$choices1,$choices2,$choices3,$choices4,$answer1,$answer2,$answer3,$answer4]);
            if ($course==1) {
                return $course;
            } else {
                return ['message' => 'Could not create exam'];
            }
        }
    }

    public function createAssessment(Request $request)
    {     
        $CID = $request['CID'] ?? '';
        $username = $request['username'] ?? '';
        $description = $request['description'] ?? '';
        $points = $request['points'] ?? '';

        $uid = users::where('username', $username)->first()['Uid'];
        $Cid= assessments::where('Cid', $CID)->get();

        if(sizeof($Cid)>0)
        {
            $course=DB::update('UPDATE assessments SET instructorID = ?,description = ?,totalPoints = ? WHERE Cid = ?',[$uid,$description,$points,$CID]);
            if ($course==1) {
                return $course;
            } else {
                return ['message' => 'Could not create assessment'];
            }
        }
        else
        {
            $course=DB::insert('INSERT INTO assessments (Cid,instructorID,description,totalPoints) VALUES(?,?,?,?)',[$CID,$uid,$description,$points]);
            if ($course==1) {
                return $course;
            } else {
                return ['message' => 'Could not create assessment'];
            }
        }
    }

    public function updateGrades(Request $request)
    {     
        $username = $request['student'] ?? '';
        $grade = $request['grade'] ?? '';
        $feedback = $request['feedback'] ?? '';
        $CID=$request['Cid'];

        $uid = users::where('username', $username)->first()['Uid'];

        $course=DB::update('UPDATE userscourse SET Grades = ?, Feedback = ? WHERE Uid = ? AND Cid = ?',[$grade,$feedback,$uid,$CID]);
        if ($course==1) {
            return $course;
        } else {
            return ['message' => 'Could not update grades'];
        }
    }

    public function getExam(Request $request)
    {      
        $CID = $request['CID'] ?? '';
        $exam= exams::where('Cid', $CID)->get();

        if ($exam) {
            return $exam;
        } else {
            return ['message' => 'No Exams Found.'];
        }
    }

    public function allAssessments(Request $request)
    {      
        $username = $request['username'] ?? '';
        $exam= assessments::get();

        $CIDs = array();
        for ($x = 0; $x < sizeof($exam); $x++) {
            array_push($CIDs, $exam[$x]['Cid']);
        }

        $assessment = course::whereIn('Cid', $CIDs)->get();
        $assessmentArray = array();
        for ($x = 0; $x < sizeof($assessment); $x++) {
            array_push($assessmentArray,$exam[$x], $assessment[$x]);
        }

        if ($assessmentArray) {
            return $assessmentArray;
        } else {
            return ['message' => 'No assessements Found.'];
        }
    }

    public function index()
    {
        return assessments::all();
    }

    public function store(Request $request)
    {
        $assessment = new assessments($request->all());
        $assessment->save();
        return response()->json(['message' => 'Assessment added successfully'], 201);
    }

    public function display($id)
    {
        return assessments::find($id);
    }

    public function update(Request $request, $id)
    {
        $assessment = assessments::findOrFail($id);
        $assessment->update($request->all());
        return response()->json(['message' => 'Assessment updated successfully'], 200);
    }

    public function remove($id)
    {
        $assessment = assessments::findOrFail($id);
        $assessment->delete();
        return response()->json(['message' => 'Assessment deleted successfully']);
    }
}
