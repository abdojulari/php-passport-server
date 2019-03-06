<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Vote;
use DB;

class VoteController extends Controller

    {
        public function index()
        {
            //$votes = auth()->user()->votes;
             $votes = auth()->user();
             $votes = DB::table('votes')
             ->join('users', 'votes.user_id', '=', 'users.id')
             ->select('votes.id','votes.date_of_birth','votes.voter_ip','votes.flavour', 'users.email','users.first_name','users.last_name')
             ->get();
            if (empty($votes)){
                return response()->json([
                    'success' => false,
                    'message' => 'There is no record presently'
                ], 201);
            }
            return response()->json([
                'success' => true,
                'data' => $votes
            ]);
        }

          // Add the function for retrieving client ip


        public function getClientIps()
            {
                $clientIps = array();
                $ip = $this->server->get('REMOTE_ADDR');
                if (!$this->isFromTrustedProxy()) {
                    return array($ip);
            }
            if (self::$trustedHeaders[self::HEADER_FORWARDED] && $this->headers->has(self::$trustedHeaders[self::HEADER_FORWARDED])) {
                $forwardedHeader = $this->headers->get(self::$trustedHeaders[self::HEADER_FORWARDED]);
                preg_match_all('{(for)=("?\[?)([a-z0-9\.:_\-/]*)}', $forwardedHeader, $matches);
                $clientIps = $matches[3];
                    } elseif (self::$trustedHeaders[self::HEADER_CLIENT_IP] && $this->headers->has(self::$trustedHeaders[self::HEADER_CLIENT_IP])) {
                        $clientIps = array_map('trim', explode(',', $this->headers->get(self::$trustedHeaders[self::HEADER_CLIENT_IP])));
                    }
                        $clientIps[] = $ip; // Complete the IP chain with the IP the request actually came from
                        $ip = $clientIps[0]; // Fallback to this when the client IP falls into the range of trusted proxies
                        foreach ($clientIps as $key => $clientIp) {
                        // Remove port (unfortunately, it does happen)
                        if (preg_match('{((?:\d+\.){3}\d+)\:\d+}', $clientIp, $match)) {
                            $clientIps[$key] = $clientIp = $match[1];
                        }
                        if (IpUtils::checkIp($clientIp, self::$trustedProxies)) {
                            unset($clientIps[$key]);
                        }
                            }
                    // Now the IP chain contains only untrusted proxies and the client IP
                    return $clientIps ? array_reverse($clientIps) : array($ip);
          }
       //find by id
        public function show($id)
        {
             $vote = auth()->user();
             $vote = DB::table('votes')
             ->join('users', 'votes.user_id', '=', 'users.id')
             ->where('votes.id', $id)
             ->select('votes.id','votes.date_of_birth','votes.voter_ip','votes.flavour', 'users.email','users.first_name','users.last_name')
             ->first();
            if (!$vote) {
                return response()->json([
                    'success' => false,
                    'message' => 'Vote with id ' . $id . ' not found'
                ], 400);
            }

            return response()->json([
                'success' => true,
                'data' => $vote
            ], 400);
        }


        //find by user_id
        public function search($id)
        {
             $vote = auth()->user();
             $vote = DB::table('votes')
             ->join('users', 'votes.user_id', '=', 'users.id')
             ->where('votes.user_id', $id)
             ->select('votes.id','votes.date_of_birth','votes.voter_ip','votes.flavour', 'users.email','users.first_name','users.last_name')
             ->get();
            if (!$vote) {
                return response()->json([
                    'success' => false,
                    'message' => 'Vote with id ' . $id . ' not found'
                ], 400);
            }

            return response()->json([
                'success' => true,
                'data' => $vote   //->toArray()
            ], 400);
        }



        public function store(Request $request)
        {
            $this->validate($request, [
                'date_of_birth' => 'nullable|date',
                'flavour' => 'required|string',
            ]);

            $vote = new Vote();
            $vote->date_of_birth = $request->date_of_birth;
            $vote->flavour = $request->flavour;
            $vote->voter_ip = $request->ip();

            if (auth()->user()->votes()->save($vote))
                return response()->json([
                    'success' => true,
                    'data' => $vote->toArray()
                ]);
            else
                return response()->json([
                    'success' => false,
                    'message' => 'Vote could not be added'
                ], 500);
        }

        public function update(Request $request, $id)
        {
            $vote = auth()->user()->votes()->find($id);

            if (!$vote) {
                return response()->json([
                    'success' => false,
                    'message' => 'Vote with id ' . $id . ' not found'
                ], 400);
            }

            $updated = $vote->fill($request->all())->save();

            if ($updated)
                return response()->json([
                    'success' => true
                ]);
            else
                return response()->json([
                    'success' => false,
                    'message' => 'Vote could not be updated'
                ], 500);
        }

        public function destroy($id)
        {
            $vote = auth()->user()->votes()->find($id);

            if (!$vote) {
                return response()->json([
                    'success' => false,
                    'message' => 'Vote with id ' . $id . ' not found'
                ], 400);
            }

            if ($vote->delete()) {
                return response()->json([
                    'success' => true
                ]);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Vote could not be deleted'
                ], 500);
            }
        }
    }
