<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\programs;
use App\Models\users;
use Illuminate\Support\Facades\DB;

class ProgramController extends Controller
{
    public function index()
    {
        return programs::all();
    }

    public function show($id)
    {
        $program = programs::find($id);

        if ($program) {
            return response()->json($program);
        } else {
            return response()->json(['message' => 'Program not found'], 404);
        }
    }

    public function add(Request $request)
    {
        $program = programs::create($request->all());
        return response()->json(['message' => 'Program added successfully', 'program' => $program], 201);
    }

    public function update(Request $request, $id)
    {
        $program = programs::find($id);

        if ($program) {
            $request->validate([
                'programName' => 'required',
                'programObjective' => 'required',
                'programDescription' => 'required',
                'CreatedBy' => 'required',
            ]);

            $program->update($request->all());

            return response()->json(['message' => 'Program updated successfully', 'program' => $program]);
        } else {
            return response()->json(['message' => 'Program not found'], 404);
        }
    }

    public function delete($id)
    {
        $program = programs::find($id);

        if ($program) {
            $program->delete();
            return response()->json(['message' => 'Program deleted successfully']);
        } else {
            return response()->json(['message' => 'Program not found'], 404);
        }
    }

    public function getPrograms()
    {
        $program = programs::get();

        $programArray = array();
        for($i = 0; $i < sizeof($program); $i++){
            array_push($programArray, $program[$i]);
        }

        if ($programArray) {
            return $programArray;
        } else {
            return ['message' => 'No Programs Found'];
        }
    }

    public function getCoordinatorProgram(Request $request)
    {
        $username = $request['username'] ?? '';
        
        $uid = users::where('username', $username)->first()['Uid'];
        $program = programs::where('ProgramCoordinator', $uid)->get();

        $programArray = array();
        for($i = 0; $i < sizeof($program); $i++){
            array_push($programArray, $program[$i]);
        }

        if ($programArray) {
            return $programArray;
        } else {
            return ['message' => 'No Programs Found'];
        }
    }

    public function addProgram(Request $request)
    {
        $username = $request['username'] ?? '';
        $ProgramName = $request['ProgramName'] ?? '';
        $ProgramCode = $request['ProgramCode'] ?? '';
        $College = $request['College'] ?? '';

        $uid = users::where('username', $username)->first()['Uid'];
        $program=DB::insert('INSERT INTO programs (ProgramCoordinator,ProgramCode,ProgramName,College) VALUES(?,?,?,?)',['7',$ProgramCode,$ProgramName,$College]);

        if ($program==1) {
            return $program;
        } else {
            return ['message' => 'Could not add program'];
        }
    }

    public function deleteProgram(Request $request)
    {
        $ProgramName = $request['ProgramName'] ?? '';

        $program=DB::delete('DELETE FROM programs WHERE ProgramName = ?',[$ProgramName]);

        if ($program==1) {
            return $program;
        } else {
            return ['message' => 'Program could not be deleted'];
        }
    }

}
