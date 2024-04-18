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


        $pattern = '213132123213231123321123';
        $codes = [];

        // Generate 72 random 6-digit numbers
        for ($i = 0; $i < 72; $i++) {
            $group = $pattern[$i % strlen($pattern)];  // Cycle through the pattern
            $codes[] = [
                'code' => random_int(100000, 999999),
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
        Schema::dropIfExists('c_ids');
    }
}
