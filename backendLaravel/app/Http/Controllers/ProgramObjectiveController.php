<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\programobjectives;
use App\Models\users;
use App\Models\programs;
use Illuminate\Support\Facades\DB;

class ProgramObjectiveController extends Controller
{
    //
    public function index()
    {
        return programobjectives::all();
    }

    public function show($id)
    {
        $program = programobjectives::find($id);

        if ($program) {
            return response()->json($program);
        } else {
            return response()->json(['message' => 'Program Objective not found'], 404);
        }
    }

    public function add(Request $request)
    {
        $program = programobjectives::create($request->all());
        return response()->json(['message' => 'Program Objective added successfully', 'program' => $program], 201);
    }

    public function update(Request $request, $id)
    {
        $program = programobjectives::find($id);

        if ($program) {
            $request->validate([
                'programName' => 'required',
                'programObjective' => 'required',
                'programDescription' => 'required',
                'CreatedBy' => 'required',
            ]);

            $program->update($request->all());

            return response()->json(['message' => 'Program Objective updated successfully', 'program' => $program]);
        } else {
            return response()->json(['message' => 'Program Objective not found'], 404);
        }
    }

    public function delete($id)
    {
        $program = programobjectives::find($id);

        if ($program) {
            $program->delete();
            return response()->json(['message' => 'Program Objective deleted successfully']);
        } else {
            return response()->json(['message' => 'Program Objective not found'], 404);
        }
    }

    public function getProgramObjectives(Request $request)
    {
        $username = $request['username'] ?? '';
        $PID = $request['PID'] ?? '';
        
        $programObjectives = programobjectives::where('Pid', $PID)->get();

        $programArray = array();
        for($i = 0; $i < sizeof($programObjectives); $i++){
            array_push($programArray, $programObjectives[$i]);
        }

        if ($programArray) {
            return $programArray;
        } else {
            return ['message' => 'No Program Objectives Found'];
        }
    }

    public function getCoordinatorProgramObjectives(Request $request)
    {
        $username = $request['username'] ?? '';
        $uid = users::where('username', $username)->first()['Uid'];
        $PID = programs::where('ProgramCoordinator', $uid)->first()['Pid'];
        
        $programObjectives = programobjectives::where('Pid', $PID)->get();

        $programObjectivesArray = array();
        for($i = 0; $i < sizeof($programObjectives); $i++){
            array_push($programObjectivesArray, $programObjectives[$i]);
        }

        if ($programObjectivesArray) {
            return $programObjectivesArray;
        } else {
            return ['message' => 'No Program Objectives Found'];
        }
    }

    public function addProgramObjective(Request $request)
    {
        $username = $request['username'] ?? '';
        $PID = $request['PID'] ?? '';
        $Objective = $request['Objective'] ?? '';

        $uid = users::where('username', $username)->first()['Uid'];
        $program=DB::insert('INSERT INTO programobjectives (Pid,Objective) VALUES(?,?)',[$PID,$Objective]);

        if ($program==1) {
            return $program;
        } else {
            return ['message' => 'Could not add program objective'];
        }
    }

    public function deleteProgramObjective(Request $request)
    {
        $Objective = $request['Objective'] ?? '';

        $program=DB::delete('DELETE FROM programobjectives WHERE Objective = ?',[$Objective]);

        if ($program==1) {
            return $program;
        } else {
            return ['message' => 'Program objective could not be deleted'];
        }
    }

    public function getAllProgramObjectives()
    {
        $program = programobjectives::get();

        $programArray = array();
        for($i = 0; $i < sizeof($program); $i++){
            array_push($programArray, $program[$i]['Objective']);
        }

        if ($programArray) {
            return $programArray;
        } else {
            return ['message' => 'No Program Objectives Found'];
        }
    }

    public function mapPO(Request $request)
    {
        $username = $request['username'] ?? '';
        $courseName = $request['courseName'] ?? '';
        $PO = $request['PO'] ?? '';

        $uid = users::where('username', $username)->first()['Uid'];
        $course=DB::update('UPDATE course SET programObjective = ? WHERE courseName = ?',[$PO,$courseName]);

        if ($course==1) {
            return $course;
        } else {
            return ['message' => 'Failed mapping program objectives'];
        }
    }
}
