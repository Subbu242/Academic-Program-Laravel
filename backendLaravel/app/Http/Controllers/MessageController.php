<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\studentinstructormessage;

class MessageController extends Controller
{
    //
    public function saveMessage(Request $request)
    {

        $request->validate([
            'sender_id' => 'required|exists:users,id',
            'receiver_id' => 'required|exists:users,id',
            'content' => 'required',
        ]);

        $message = new studentinstructormessage([
            'sender_id' => $request->input('sender_id'),
            'receiver_id' => $request->input('receiver_id'),
            'content' => $request->input('content'),
        ]);

        $message->save();

        return response()->json(['message' => 'Message saved successfully'], 201);
    }

    public function getMessages($senderId, $receiverId)
{
   // Ensure that $senderId and $receiverId are integers
   $senderId = (int)$senderId;
   $receiverId = (int)$receiverId;

   // Retrieve messages along with sender and receiver names
   $messages = studentinstructormessage::where(function ($query) use ($senderId, $receiverId) {
       $query->where('sender_id', $senderId)
             ->where('receiver_id', $receiverId);
   })->orWhere(function ($query) use ($senderId, $receiverId) {
       $query->where('sender_id', $receiverId)
             ->where('receiver_id', $senderId);
   })->orderBy('created_at', 'asc')
     ->with(['sender', 'receiver']) // Eager load sender and receiver relationships
     ->get();

   return response()->json(['messages' => $messages], 200);
}
}
