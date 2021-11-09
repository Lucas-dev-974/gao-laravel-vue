<?php

namespace App\Http\Controllers;

use App\Models\Computer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use function PHPUnit\Framework\returnSelf;

class ComputerController extends Controller
{   
    public function GetComputers(Request $request){
        $this->Authenticated($request);
        $validator = Validator::make($request->input(), ['date' => 'required']);
        if($validator->fails()) return response()->json(['success' => false, 'message' => 'date manquante']);

        $computers = Computer::with(['attributions' => function($req) use ($request){
            $req->where('date', '=', $request->date)->with('client');
        }])->get();
        
        return response()->json(['success' => true, 'computers' => $computers]);
    }

    public function CreateComputer(Request $request){
        $this->Authenticated($request);
        $validator = Validator::make($request->all(), ['name' => 'string|required']);
        if($validator->fails()) return response()->json(['success' => false, 'message' => 'Veuillez complété tous les champs']);

        $computer = Computer::create(['name' => $request->name]);
        $computer->attributions;
        foreach($computer->attributions as $attribution) $attribution->client;
        
        return response()->json(['success' => true, 'computer' => $computer]);
    }

    public function Update(Request $request){
        $this->Authenticated($request);

        $validator = Validator::make($request->all(), ['name' => 'string', 'id' => 'numeric|required']);
        if($validator->fails()) return response()->json(['success' => false, 'message' => 'Veuillez complété tous les champs']);
        
        $computer = Computer::find($request->id);
        if(!$computer)  return response()->json(['success' => false, 'message' => 'L\'ordinateur n\'existe pas ! ']);

        if(isset($request->name)){
            $computer->name = $request->name;
        }
        
        $computer->save();
        return response()->json([
            'success' => true,
            'computer' => $computer
        ]);
    }

    public function Delete(Request $request, $id){
        $this->Authenticated($request);  
        if(!isset($id) || empty($id)) return response()->json(['success' => false, 'message' => 'Une erreur est survenue, l\'id de l\'ordinateur est manquant']);
        $computer = Computer::find($request->id);
        if(!$computer)  return response()->json(['success' => false, 'message' => 'L\'ordinateur n\'existe pas ! ']);
        // $computer->delete();
        return response()->json(['success' => $computer->delete()]);
    }
}
