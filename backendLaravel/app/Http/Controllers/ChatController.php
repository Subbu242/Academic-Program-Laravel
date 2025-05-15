<?php

namespace App\Http\Controllers;
use App\Events\NewMessage;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Course;
use App\Models\users;
use App\Models\studentcoordinatormessage;
use App\Models\studentinstructormessage;
use App\Models\userscourse;
use Illuminate\Support\Facades\DB;

class ChatController extends Controller
{
    public function sendMessage(Request $request)
    {        
        $username = $request['username'] ?? '';
        $instructor = $request['instructor'] ?? '';
        $message = $request['message'] ?? '';
        
        $uid = users::where('username', $username)->first()['Uid'];
        $iid = users::where('username', $instructor)->first()['Uid'];
        $message=DB::insert('INSERT INTO studentinstructormessage (studentID,instructorID,message,unread,senderID) VALUES(?,?,?,?,?)',[$uid,$iid,$message,"true",$uid]);

        if ($message==1) {
            return $message;
        } else {
            return ['message' => 'Could not send message'];
        }
    }

    public function studentSendMessage(Request $request)
    {  
        $username = $request['username'] ?? '';
        $coordinator = $request['coordinator'] ?? '';
        $message = $request['message'] ?? '';

        
        $uid = users::where('username', $username)->first()['Uid'];
        $cid = users::where('username', $coordinator)->first()['Uid'];
        $message=DB::insert('INSERT INTO studentcoordinatormessage (studentID,coordinatorID,message,unread,senderID) VALUES(?,?,?,?,?)',[$uid,$cid,$message,"true",$uid]);

        if ($message==1) {
            return $message;
        } else {
            return ['message' => 'Could not send message'];
        }
    }

    public function instructorSendMessage(Request $request)
    {  
        $instructor = $request['instructorUsername'] ?? '';
        $message = $request['message'] ?? '';
        $student = $request['student'] ?? '';

        
        $iid = users::where('username', $instructor)->first()['Uid'];
        $sid = users::where('username', $student)->first()['Uid'];
        $message=DB::insert('INSERT INTO studentinstructormessage (studentID,instructorID,message,unread,senderID) VALUES(?,?,?,?,?)',[$sid,$iid,$message,"true",$iid]);

        if ($message==1) {
            return $message;
        } else {
            return ['message' => 'Could not send message'];
        }
    }

    public function coordinatorSendMessage(Request $request)
    {  
        $coordinator = $request['instructorUsername'] ?? '';
        $message = $request['message'] ?? '';
        $student = $request['student'] ?? '';

        $uid = users::where('username', $coordinator)->first()['Uid'];
        $sid = users::where('username', $student)->first()['Uid'];
        $message=DB::insert('INSERT INTO studentcoordinatormessage (studentID,coordinatorID,message,unread,senderID) VALUES(?,?,?,?,?)',[$sid,$uid,$message,"true",$uid]);

        if ($message==1) {
            return $message;
        } else {
            return ['message' => 'Could not send message'];
        }
    }

    public function getStudentMessage(Request $request)
    {  
        $username = $request['username'] ?? '';
        $unread='true';
        
        $uid = users::where('username', $username)->first()['Uid'];
        $message = studentinstructormessage::where('studentID', $uid)->get();

        $messagesArray = array();
        for($i = 0; $i < sizeof($message); $i++){
            $sid = users::where('Uid', $message[$i]['senderID'])->get();
            array_push($messagesArray, $message[$i]['message'].",".$sid[0]['username']);
        }

        if ($messagesArray) {
            return $messagesArray;
        } else {
            return ['message' => 'No messages Found'];
        }
    }

    public function getInstructorMessage(Request $request)
    {  
        $username = $request['username'] ?? '';
        $unread='true';
        
        $uid = users::where('username', $username)->first()['Uid'];
        $message = studentinstructormessage::where('instructorID', $uid)->get();

        $messagesArray = array();
        for($i = 0; $i < sizeof($message); $i++){
            $sid = users::where('Uid', $message[$i]['senderID'])->get();
            array_push($messagesArray, $message[$i]['message'].",".$sid[0]['username']);
        }

        if ($messagesArray) {
            return $messagesArray;
        } else {
            return ['message' => 'No messages Found'];
        }
    }

    public function getStudentFeedback(Request $request)
    {  
        $username = $request['username'] ?? '';
        $unread='true';
        
        $uid = users::where('username', $username)->first()['Uid'];
        $message = studentcoordinatormessage::where('studentID', $uid)->get();

        $messagesArray = array();
        for($i = 0; $i < sizeof($message); $i++){
            $sid = users::where('Uid', $message[$i]['senderID'])->get();
            array_push($messagesArray, $message[$i]['message'].",".$sid[0]['username']);
        }

        if ($messagesArray) {
            return $messagesArray;
        } else {
            return ['message' => 'No messages Found'];
        }
    }

    public function getPCFeedback(Request $request)
    {  
        $username = $request['username'] ?? '';
        $unread='true';
        
        $uid = users::where('username', $username)->first()['Uid'];
        $message = studentcoordinatormessage::where('coordinatorID', $uid)->get();

        $messagesArray = array();
        for($i = 0; $i < sizeof($message); $i++){
            $sid = users::where('Uid', $message[$i]['senderID'])->get();
            array_push($messagesArray, $message[$i]['message'].",".$sid[0]['username']);
        }

        if ($messagesArray) {
            return $messagesArray;
        } else {
            return ['message' => 'No messages Found'];
        }
    }
}
