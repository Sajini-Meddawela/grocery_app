import 'package:flutter/material.dart';
import 'package:grocery_app/components/product_card.dart';
import 'package:grocery_app/models/product.dart';
import 'package:grocery_app/models/category.dart'; 

class HomeProductWidget extends StatelessWidget {
  const HomeProductWidget({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    List<Product> products = [
      Product(
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
        productType: 'Biscuits',
        stockStatus: 'In Stock',
        productId: '669a9a5e0b1568df16b4ee0b',
      ),
      Product(
        productName: 'Strawberry',
        category: Category(
          categoryName: 'Fruits and Vegetables',
          categoryImage: '/uploads/categories/1721314805591_fruits.png',
          categoryId: '66992df582f34b2b33879d16',
        ),
        productShortDescription: 'Fresh, juicy strawberries bursting with sweet, tangy flavor. Perfect for snacking, baking, or adding a touch of sweetness to your favorite dishes.',
        productPrice: 1250,
        productSalePrice: 1100,
        productImage: '/uploads/products\\1721458427013_strawberry.jpg',
        productSKU: '6784',
        productType: 'Fruits',
        stockStatus: 'In Stock',
        productId: '669b5efb935ca96ba38d2e6d',
      ),
    ];

    return Container(
      color: Color.fromARGB(255, 255, 255, 255),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Padding(
                padding: const EdgeInsets.only(left: 16, top: 15, bottom: 10),
                child: const Text(
                  "Top 10 products",
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                ),
              ),
            ],
          ),
          _buildProductList(products),
        ],
      ),
    );
  }

  Widget _buildProductList(List<Product> products) {
    return Container(
      height: 200,
      alignment: Alignment.centerLeft,
      child: ListView.builder(
        physics: const ClampingScrollPhysics(),
        scrollDirection: Axis.horizontal,
        itemCount: products.length,
        itemBuilder: (context, index) {
          var data = products[index];
          return GestureDetector(
            onTap: () {},
            child: ProductCard(
              model: data, 
            ),
          );
        },
      ),
    );
  }
}
