import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:grocery_app/api/api_service.dart';
import 'package:grocery_app/application/notifier/product_filter_notifier.dart';
import 'package:grocery_app/application/notifier/products_notifier.dart';
import 'package:grocery_app/application/state/product_state.dart';
import 'package:grocery_app/models/category.dart';
import 'package:grocery_app/models/pagination.dart';
import 'package:grocery_app/models/product.dart';
import 'package:grocery_app/models/product_filter.dart';

final categoriesProvider = 
    FutureProvider.family<List<Category>?, PaginationModel>(
  (ref, paginationModel) async {
    final apiRepository = ref.watch(apiService);

    return apiRepository.getCategories(
      paginationModel.page, 
      paginationModel.pageSize
    );
  },
  );

final homeProductProvider = 
FutureProvider.family<List<Product>?, ProductFilterModel>(
  (ref, productFilterModel){
    final apiRepository = ref.watch(apiService);
    return apiRepository.getProducts(productFilterModel);
    },
  );

  final productsFilterProvider = 
  StateNotifierProvider<ProductsFilterNotifier, ProductFilterModel>(
    (ref) => ProductsFilterNotifier(),
  );

  final productsNotifierProvider =
  StateNotifierProvider <ProductsNotifier, ProductsState>(
    (ref) => ProductsNotifier(
      ref.watch(apiService),
      ref.watch(productsFilterProvider),
    )
  );