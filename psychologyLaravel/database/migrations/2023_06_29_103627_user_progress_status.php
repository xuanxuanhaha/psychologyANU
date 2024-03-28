<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UserProgressStatus extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('c_user_progress_status', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('userid');
            $table->integer('sessionid')->nullable();
            $table->unsignedBigInteger('startat')->default(time())->nullable();
            $table->unsignedBigInteger('firstopenat')->default(time())->nullable(); // first time user open session
            $table->unsignedBigInteger('lastopenat')->default(time())->nullable(); // last time user open session
            $table->unsignedBigInteger('endat')->nullable();
            $table->boolean('sessionfinishemailsent')->default(0)->nullable();
            $table->unsignedBigInteger('sessionfinishemailsenttime')->nullable();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('c_user_progress_status');
    }
}
