<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
// use App\Models\Company;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Make sure we have companies first
        // if (Company::count() === 0) {
        //     Company::factory()->count(5)->create();
        // }

        // Create random users
        User::factory()->count(10)->create();

        // Create 1 fixed admin-like user
        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        //     'unique_id' => '12345678', // fixed unique id
        //     // 'company_id' => Company::inRandomOrder()->first()->id,
        // ]);
    }
}
