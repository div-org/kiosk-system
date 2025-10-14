<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Request;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'firstname',
        'lastname',
        'email',
        'password',
        'company_id',
        'unique_id',
        'pin_code',
        'role_id'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    protected static function boot()
    {
        parent::boot();

        static::created(function (User $user) {
            // if NOT from store, auto-create a company
            if (!Request::boolean('fromStore')) {
                $company = Company::create([
                    'company_name'  => "{$user->firstname}'s Company",
                    'owner_user_id' => $user->id,
                ]);

                $user->company_id = $company->id;
            } else {
                // if from store, use company_id from payload
                // (already assigned in controller create)
            }

            // generate unique_id after company_id is set
            $user->unique_id = sprintf(
                '%s%s%s',
                date('Y'),
                $user->company_id,
                $user->id
            );
            
            $user->pin_code = str_pad(random_int(0, 99999999), 8, '0', STR_PAD_LEFT);

            $user->save();
        });
    }

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }
}
