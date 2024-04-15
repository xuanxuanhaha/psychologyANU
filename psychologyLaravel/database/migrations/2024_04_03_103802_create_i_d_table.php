<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateIDTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('c_ids', function (Blueprint $table) {
            $table->increments('id');
            $table->longText('code');
            $table->boolean('available')->default(true);
            $table->integer('group')->default(1);
            $table->timestamps();
        });


        $totalEntries = 100;
        $group1Count = (int) ($totalEntries * 0.60);
        $group2Count = (int) ($totalEntries * 0.20);
        $group3Count = $totalEntries - $group1Count - $group2Count;

        // Insert entries for Group 1
        for ($i = 0; $i < $group1Count; $i++) {
            \DB::table('c_ids')->insert([
                'code' => Number::random(10), // Adjust length as needed
                'group' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }

        // Insert entries for Group 2
        for ($i = 0; $i < $group2Count; $i++) {
            \DB::table('c_ids')->insert([
                'code' => Number::random(10),
                'group' => 2,
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }

        // Insert entries for Group 3
        for ($i = 0; $i < $group3Count; $i++) {
            \DB::table('c_ids')->insert([
                'code' => Number::random(10),
                'group' => 3,
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }
    

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('c_ids');
    }
}
