<?php

namespace Database\Seeders;

use App\Models\Company;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Company::create([
        //     'company_name' => 'Slim Shady Enterprises',
        //     'owner_user_id' => 1, // change this to an existing user ID
        // ]);

        // Company::factory()->count(1)->create(); // if you also add a factory
    }
}
