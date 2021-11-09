<?php

namespace App\Http\Controllers;

use App\Models\Attribution;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class AttributionController extends Controller
{
    public function AddAttribution(Request $request){
        $this->Authenticated($request);
        $validator = Validator::make($request->all(), [
            'computerID' =>  'numeric|required',
            'userID'     =>  'numeric|required',
            'horraire'    => 'numeric|required',
            'date'        => 'string|required'
        ]);

        if($validator->fails()) return response()->json(['success' => false, 'message' => 'Des champs sont manquant !']);
        $attribution = Attribution::create([
            'user_id' => $request->userID,
            'computer_id' => $request->computerID,
            'horraire'    => $request->horraire,
            'date'        => $request->date
        ]);
        $attribution->client;
        return response()->json(['success' => true, 'attribution' => $attribution]);
    }

    public function RemoveAttribution(Request $request, $id){
        $this->Authenticated($request);
        if(empty($id)) return response()->json(['success' => false, 'message' => 'Des champs sont manquant !']);

        $attribution = Attribution::find($request->id);
        if(!$attribution) return response()->json(['success' => false, 'message' => 'Une erreur est survenue il s`\'emblerais que cet attribution n\'existe pas !']);
        $attribution->delete();
        return response()->json(["success" => true, 'attribution' => $attribution]);
        
    }
}
