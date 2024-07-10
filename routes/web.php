<?php

use Illuminate\Support\Facades\Route;

// Route::redirect('/', '/backoffice');
Route::get('/', fn() => view('home'))->name('home');



/* route backoffice  */
require __DIR__.'/backoffice.php';
/* route auth  */
require __DIR__.'/auth.php';
