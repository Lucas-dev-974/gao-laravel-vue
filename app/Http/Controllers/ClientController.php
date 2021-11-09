<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ClientController extends Controller
{

    public function GetClients(Request $request){
        $this->Authenticated($request);
        $clients = User::whereNull('password')->get();
        return response()->json(['clients' => $clients]);
    }
    
    public function Create(Request $request){
        $this->Authenticated($request);
        $validator = Validator::make($request->all(), ['name' => 'string|required']);
        if($validator->fails()) return response()->json(['success' => false, 'message' => 'Veuillez renseigner tout les champs !']);

        $client = User::create(['name' => $request->name]);
        return response()->json(['success' => true, 'client' => $client]);
    }
    
    public function Delete(Request $request, $id){
        $this->Authenticated($request);
        $validator = Validator::make($request->all(), ['id' => 'numeric|required']);
        if(!isset($id) || empty($id)) return response()->json(['success' => false, 'message' => 'Veuillez complété tous les champs']);   

        $user = User::find($id);
        if(!$user)  return response()->json(['success' => false, 'message' => 'L\'ordinateur n\'existe pas ! ']);
        $user->delete();
        return response()->json([$user]);
    }

    public function search(Request $request){
        $this->Authenticated($request);
        $validator = Validator::make($request->all(), ['query_search' => 'required|string']);
        if($validator->fails()) return response()->json(['success' => false]);

        $clients = User::where('name', 'like', '%' . $request->query_search . '%')->get();
        return response()->json(['success' => true, 'clients' => $clients]);
    }
}
