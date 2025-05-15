<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\exams;

class ExamController extends Controller
{
    public function index()
    {
        return exams::all();
    }

    public function display($id)
    {
        $exam = exams::find($id);

        if ($exam) {
            return response()->json($exam);
        } else {
            return response()->json(['message' => 'Exams not found'], 404);
        }
    }

    public function add(Request $request)
    {
     
        $exam = exams::create($request->all());

        return response()->json(['message' => 'Exam created successfully', 'course' => $exam], 201);
    }

    public function update(Request $request, $id)
    {
        $exam = exams::find($id);

        if ($exam) {
         
            $exam->update($request->all());

            return response()->json(['message' => 'Course updated successfully', 'course' => $exam]);
        } else {
            return response()->json(['message' => 'Course not found'], 404);
        }
    }

    public function delete($id)
    {
        $exam = exams::find($id);

        if ($exam) {
            $exam->delete();
            return response()->json(['message' => 'Course deleted successfully']);
        } else {
            return response()->json(['message' => 'Course not found'], 404);
        }
    }
}
