<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\programs;
use Illuminate\Http\Request;
use App\Models\users;
use App\Models\course;
use App\Models\userscourse;
use App\Models\faculty;
use App\Models\academic;
use App\Mail\AccountCreatedMail;
use App\Mail\ForgotPassword;
use App\Mail\SendMessage;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function signup(Request $request)
    {
        $email=$request->input('email');
        $user = users::where('email', $email)->first();

        // Check if a user with the given email already exists
        if ($user) {
            return (['message' => 'User with this email already exists']);
        }
        
        
        // $user = new users($request->all());
        // $user->save();
        DB::insert('INSERT INTO users (email,username,password,role) VALUES(?,?,?,?)',[$request->input('email'),$request->input('username'),$request->input('password'),$request->input('role')]);
        return ['message' => 'User added successfully'];
    }
    public function show($id)
    {
        return users::find($id);
    }
    public function getAll()
    {
        return users::all();
    }
    public function update(Request $request, $id)
    {
        $user = users::findOrFail($id);
        $user->update($request->all());
        return $user;
    }
    public function destroy($id)
    {
        $user = users::findOrFail($id);
        $user->delete();

        return response()->json(['message' => 'User deleted successfully']);
    }
    public function forgotPassword(Request $request)
    {
        // Find the user
        $user = users::where('email', $request->input('email'))->first();

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        
        //  Mail::to($user->email)->send(new ForgotPassword($user));

        return response()->json(['message' => 'Password reset email sent'],200);
    }
    
    public function login(Request $request)
    {
        $username = $request->input('username');
        $password = $request->input('password');
        $user = users::where('username', $username)->first();

        if (!$user) {
            return ['message' => 'User not found'];
        }

        if ($user->password === $password) {
            return $user;
        } else {
            return (['message' => 'Invalid password']);
        }
    }

    public function getStudent(Request $request)
    {
        $username = $request['username'] ?? '';
        $uid = users::where('username', $username)->first()['Uid'];
        $CID = course::where('instructorID', $uid)->get();

        $CidArray = array();
        for($i = 0; $i < sizeof($CID); $i++){
            array_push($CidArray, $CID[$i]['Cid']);
        }
        $student = DB::table('userscourse as UC')
                ->select('U.username', 'UC.Cid', 'UC.Score')
                ->join('users as U', 'U.Uid', '=', 'UC.Uid')
                ->whereIn('UC.Cid', $CidArray)
                ->get();
        return $student;
       
        if ($student) {
            return $student ;
        } else {
            return ['message' => 'No students found for instructor'];
        }
    }

    public function getPCStudent(Request $request)
    {
        $username = $request['username'] ?? '';
        $uid = users::where('username', $username)->first()['Uid'];
        $pid = programs::where('ProgramCoordinator', $uid)->first()['Pid'];
        $CID = course::where('ProgramID', $pid)->get();

        $CidArray = array();
        for($i = 0; $i < sizeof($CID); $i++){
            array_push($CidArray, $CID[$i]['Cid']);
        }
        
        $student =  DB::table('userscourse as UC')
                    ->select('U.username')
                    ->join('users as U', 'U.Uid', '=', 'UC.Uid')
                    ->whereIn('UC.Cid', $CidArray)
                    ->distinct()
                    ->get();
        return $student;
       
        if ($student) {
            return $student ;
        } else {
            return ['message' => 'No students found for program coordinator'];
        }
    }

    public function allStudents(Request $request)
    {
        $role = $request['role'] ?? '';
        $student = users::where('role', $role)->get();

        $studentArray = array();
        for($i = 0; $i < sizeof($student); $i++){
            array_push($studentArray, $student[$i]['username']);
        }
       
        if ($studentArray) {
            return $studentArray ;
        } else {
            return ['message' => 'No students found.'];
        }
    }

    public function addStudent(Request $request)
    {
        $username = $request['username'] ?? '';
        $studentName = $request['studentName'] ?? '';
        $studentEmail = $request['studentEmail'] ?? '';
        $studentPassword = $request['studentPassword'] ?? '';
        $role = $request['role'] ?? '';
        
        $student=DB::insert('INSERT INTO users (email,username,password,role) VALUES(?,?,?,?)',[$studentEmail,$studentName,$studentPassword,$role]);

        if ($student==1) {
            return $student ;
        } else {
            return ['message' => 'Could not add Student.'];
        }
    }

    
    public function deleteStudent(Request $request)
    {
        $username = $request['student'] ?? '';
        $role = $request['role'] ?? '';
        
        $student=DB::delete('DELETE FROM users WHERE username = ? and role = ?',[$username,$role]);

        if ($student==1) {
            return $student ;
        } else {
            return ['message' => 'Could not delete Student.'];
        }
    }

    public function courseInstructor(Request $request)
    {
        $CID = $request['CID'] ?? '';
        $instructor = course::where('Cid', $CID)->first()['instructorID'];
        $instructorName = users::where('Uid', $instructor)->get();

        $instructorArray = array();
        for($i = 0; $i < sizeof($instructorName); $i++){
            array_push($instructorArray, $instructorName[$i]);
        }
        
        if ($instructorArray) {
            return $instructorArray;
        } else {
            return ['message' => 'Could not create Assessment'];
        }
    }

    public function studentInstructor(Request $request)
    {
        $username = $request['username'] ?? '';
        $unread='true';

        $user = users::where('username', $username)->first()['Uid'];
        $cid = userscourse::where('Uid', $user)->get();

        $CIDs = array();
        for($i = 0; $i < sizeof($cid); $i++){
            array_push($CIDs, $cid[$i]['Cid']);
        }

        $instructorName = course::whereIn('Cid', $CIDs)->get();

        $instructorArray = array();
        for($i = 0; $i < sizeof($instructorName); $i++){
            array_push($instructorArray, $instructorName[$i]['instructorID']);
        }

        $instructor = users::whereIn('Uid', $instructorArray)->get();
        $instructorsArray = array();
        for($i = 0; $i < sizeof($instructor); $i++){
            array_push($instructorsArray, $instructor[$i]['username']);
        }

        
        if ($instructorsArray) {
            return $instructorsArray;
        } else {
            return ['message' => 'No Instructor Found'];
        }
    }

    public function studentCoordinator(Request $request)
    {
        $username = $request['username'] ?? '';
        $unread='true';

        $user = users::where('username', $username)->first()['Uid'];
        $cid = userscourse::where('Uid', $user)->get();

        $CIDs = array();
        for($i = 0; $i < sizeof($cid); $i++){
            array_push($CIDs, $cid[$i]['Cid']);
        }
        
        $programID = course::whereIn('Cid', $CIDs)->first()['ProgramID'];

        // $programIDArray = array();
        // for($i = 0; $i < sizeof($programID); $i++){
        //     array_push($programIDArray, $programID[$i]['ProgramID']);
        // }

        $programCoordinator = programs::where('Pid', $programID)->first()['ProgramCoordinator'];
        $coordinator = users::where('Uid', $programCoordinator)->get();
        $coordinatorArray = array();
        for($i = 0; $i < sizeof($coordinator); $i++){
            array_push($coordinatorArray, $coordinator[$i]['username']);
        }

        
        if ($coordinatorArray) {
            return $coordinatorArray;
        } else {
            return ['message' => 'No Instructor Found'];
        }
    }
}
