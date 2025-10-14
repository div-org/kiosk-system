<?php

namespace Database\Seeders;

use App\Models\Role;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::create([
            'name' => 'Super Admin',
            'level' => 10
        ]);
        Role::create([
            'name' => 'Admin',
            'level' => 5
        ]);
        Role::create([
            'name' => 'Moderator',
            'level' => 4
        ]);
        Role::create([
            'name' => 'Store',
            'level' => 3
        ]);
        Role::create([
            'name' => 'Volunteer',
            'level' => 2
        ]);
    }
}
