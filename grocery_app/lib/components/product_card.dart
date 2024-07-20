import 'package:flutter/material.dart';
import 'package:grocery_app/models/product.dart';
import 'package:grocery_app/config.dart';

class ProductCard extends StatelessWidget {
  final Product model;

  const ProductCard({Key? key, required this.model}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    
    return Container(
      width: 150,
      decoration: const BoxDecoration(color: Colors.white),
      margin: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
      child: Stack(
        children: [
          Column(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              if (model.calculateDiscount > 0)
                Align(
                  alignment: Alignment.topLeft,
                  child: Container(
                    padding: const EdgeInsets.all(5),
                    decoration: const BoxDecoration(
                      color: Colors.green,
                    ),
                    child: Text(
                      "${model.calculateDiscount}% OFF",
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 12,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
                ),
              SizedBox(
                height: 100,
                width: 100, 
                child: Image.network(
                  model.fullImagePath,
                  fit: BoxFit.contain, 
                ),
              ),
              Text(
                model.productName,
                textAlign: TextAlign.left,
                overflow: TextOverflow.ellipsis,
                style: const TextStyle(
                  fontSize: 13,
                  fontWeight: FontWeight.bold,
                  color: Colors.black,
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Flexible(
                      child: Row(
                        children: [
                          Text(
                            "${Config.currency}${model.productPrice.toString()}",
                            textAlign: TextAlign.left,
                            style: TextStyle(
                              fontSize: 12,
                              color: model.calculateDiscount > 0 ? Colors.red : Colors.black,
                              fontWeight: FontWeight.bold,
                              decoration: model.productSalePrice > 0
                                  ? TextDecoration.lineThrough
                                  : null,
                            ),
                          ),
                          if (model.calculateDiscount > 0)
                            Text(
                              " ${Config.currency}${model.productSalePrice.toString()}",
                              textAlign: TextAlign.left,
                              style: const TextStyle(
                                fontSize: 12,
                                color: Colors.black,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                        ],
                      ),
                    ),
                    GestureDetector(
                      child: const Icon(
                        Icons.favorite,
                        color: Colors.grey,
                        size: 20,
                      ),
                      onTap: () {
                        // Handle favorite button tap
                      },
                    )
                  ],
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
