import 'package:flutter/material.dart';
import 'package:grocery_app/components/product_card.dart';
import 'package:grocery_app/models/category.dart';
import 'package:grocery_app/widgets/widget_home_categories.dart';
import 'package:grocery_app/models/product.dart';
import 'package:grocery_app/widgets/widget_home_products.dart';

class HomePage extends StatelessWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Product model = Product(
      productName: 'Chocolate Biscuit',
      category: Category(
        categoryName: 'Bakery and Biscuits',
        categoryImage: '/uploads/categories/1721314757069_bakery.png',
        categoryId: '66992dc582f34b2b33879d14',
      ),
      productShortDescription: 'Chocolate Biscuits',
      productPrice: 450,
      productSalePrice: 300,
      productImage: '/uploads/products\\1721408094179_chocolate.jpeg',
      productSKU: '4567',
      productType: 'Buscuits',
      stockStatus: 'In Stock',
      productId: '669a9a5e0b1568df16b4ee0b',
    );

    return Scaffold(
      appBar: AppBar(
        title: const Text('All Categories'),
      ),
      body: ListView(
        children: [
          const HomeCategoriesWidget(),
          const HomeProductWidget()
          // ProductCard(product: model),
        ],
      ),
    );
  }
}
