import 'package:flutter/cupertino.dart';
import '../data/cart.dart';

class CartOrder with ChangeNotifier {
  List<PropertyCart> _cart = [];

  List<PropertyCart> get cart => _cart;

  void addToCart(PropertyCart propertyCart) {
    final indexProperty = _cart.indexWhere((element) =>
        element.propertyDetail.id == propertyCart.propertyDetail.id);
    if (indexProperty != -1) {
      // PropertyCart exists, add RoomCart to it
      _cart[indexProperty].carts.addAll(propertyCart.carts);
    } else {
      // PropertyCart does not exist, add new PropertyCart
      _cart.add(propertyCart);
    }
    notifyListeners();
  }

  void updateCart(String idProperty, RoomCart roomCart) {
    final indexProperty =
        _cart.indexWhere((element) => element.propertyDetail.id == idProperty);
    if (indexProperty != -1) {
      final index = _cart[indexProperty]
          .carts
          .indexWhere((element) => element.room.id == roomCart.room.id);
      if (index != -1) {
        _cart[indexProperty].carts[index] = roomCart;
        notifyListeners();
      } else {
        print("Room not found in the property.");
      }
    } else {
      print("Property not found in the cart.");
    }
  }

  void removeFromCart(String idProperty, RoomCart roomCart) {
    final indexProperty =
        _cart.indexWhere((element) => element.propertyDetail.id == idProperty);
    if (indexProperty != -1) {
      final index = _cart[indexProperty]
          .carts
          .indexWhere((element) => element.room.id == roomCart.room.id);
      if (index != -1) {
        _cart[indexProperty].carts.removeAt(index); // Remove by index
        if (_cart[indexProperty].carts.isEmpty) {
          _cart.removeAt(
              indexProperty); // Remove PropertyCart if no RoomCart left
        }
        notifyListeners();
      } else {
        print("Room not found in the property.");
      }
    } else {
      print("Property not found in the cart.");
    }
  }

  PropertyCart? getCartByPropertyId(String idProperty) {
    final indexProperty =
        _cart.indexWhere((element) => element.propertyDetail.id == idProperty);
    if (indexProperty != -1) {
      print(_cart[indexProperty].carts);
      return _cart[indexProperty];
    } else {
      print("Property not found in the cart.");
      return null;
    }
  }
  void clearCart() {
    _cart.clear();
    notifyListeners();
  }
}
