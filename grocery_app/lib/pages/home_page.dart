import 'package:flutter/material.dart';
import 'package:grocery_app/widgets/widget_home_categories.dart';
import 'package:grocery_app/widgets/widget_home_products.dart';

class HomePage extends StatelessWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {

    return Scaffold(
      appBar: AppBar(
        title: const Text('All Categories'),
      ),
      body: ListView(
        children: const [
          HomeCategoriesWidget(),
          HomeProductWidget(),
        ],
      ),
    );
  }
}
