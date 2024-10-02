<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMoreBascsiIdsInCIdsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $codes = [];

        // Generate 72 random 6-digit numbers
        for ($i = 0; $i < 21; $i++) {
            $group = 1;  // Cycle through the pattern
            $codes[] = [
                'code' => 'C' . random_int(1000000, 9999999),
                'group' => $group,
                'created_at' => now(),
                'updated_at' => now()
            ];
        }

        // Insert the data into the database
        \DB::table('c_ids')->insert($codes);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
    }
}
