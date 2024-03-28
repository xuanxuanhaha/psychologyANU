<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class SessionReminderEmailStatus extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('c_session_reminder_email_status', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('userid');
            $table->integer('sessionid')->nullable();
            $table->boolean('sessionreminderemailsent')->default(0)->nullable();
            $table->unsignedBigInteger('sessionreminderemailsenttime')->nullable();
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
        Schema::dropIfExists('c_session_reminder_email_status');
    }
}
