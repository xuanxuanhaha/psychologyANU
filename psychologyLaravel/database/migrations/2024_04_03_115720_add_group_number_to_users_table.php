<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddGroupNumberToUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('c_users', function (Blueprint $table) {
            $table->integer('group')->after('language'); // 1. BASCSI, 2. BASC, 3. C
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('c_users', function (Blueprint $table) {
            $table->dropColumn('group');
        });
    }
}
