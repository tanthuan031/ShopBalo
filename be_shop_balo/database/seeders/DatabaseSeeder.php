<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\ProductDetail;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            // GroupProductSeeder::class,
            // ProductSeeder::class,
            // CategorySeeder::class,
            // ProductDetailSeeder::class,
            // DiscountSeeder::class,
            // RatingSeeder::class,

        ]);
    }
}
