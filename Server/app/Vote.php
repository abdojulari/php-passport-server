<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Vote extends Model
{
    protected $fillable =[
      'date_of_birth','flavour', 
    ];


    protected $flavour = ['English Toffee', 'Thai Coconut','Mexican Jalapeño'];

    public function get_flavour()
    {
        return $this->flavour;

    }


    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
    //    'voter_ip',
    ];
}
