'use strict';

(function (global) {

  var filterWifi = document.querySelector('#filter-wifi');
  var filterDishwasher = document.querySelector('#filter-dishwasher');
  var filterParking = document.querySelector('#filter-parking');
  var filterWasher = document.querySelector('#filter-washer');
  var filterElevator = document.querySelector('#filter-elevator');
  var filterConditioner = document.querySelector('#filter-conditioner');
  var filterGuests = document.querySelector('#housing-guests');
  var filterRooms = document.querySelector('#housing-rooms');
  var filterPrice = document.querySelector('#housing-price');
  var filterType = document.querySelector('#housing-type');

  var featureFilter = function (item) {
    var wifiPresented = item.offer.features.indexOf('wifi') !== -1;
    var dishwasherPresented = item.offer.features.indexOf('dishwasher') !== -1;
    var parkingPresented = item.offer.features.indexOf('parking') !== -1;
    var washerPresented = item.offer.features.indexOf('washer') !== -1;
    var elevatorPresented = item.offer.features.indexOf('elevator') !== -1;
    var conditionerPresented = item.offer.features.indexOf('conditioner') !== -1;

    var result = true;
    result = result && (filterWifi.checked ? wifiPresented : true);
    result = result && (filterDishwasher.checked ? dishwasherPresented : true);
    result = result && (filterParking.checked ? parkingPresented : true);
    result = result && (filterWasher.checked ? washerPresented : true);
    result = result && (filterElevator.checked ? elevatorPresented : true);
    result = result && (filterConditioner.checked ? conditionerPresented : true);

    return result;
  };

  var guestsFilter = function (item) {
    var matchGuests = item.offer.guests === +filterGuests.value;
    return filterGuests.value === 'any' ? true : matchGuests;
  };

  var roomsFilter = function (item) {
    var matchRooms = item.offer.rooms === +filterRooms.value;
    return filterRooms.value === 'any' ? true : matchRooms;
  };

  var priceFilter = function (item) {
    var price = item.offer.price;
    if (filterPrice.value === 'any') {
      return true;
    }

    if (filterPrice.value === 'middle') {
      return price >= 10000 && price <= 50000;
    } else if (filterPrice.value === 'low') {
      return price <= 10000;
    }

    return price >= 50000;
  };

  var houseTypeFilter = function (item) {
    var matchType = item.offer.type === filterType.value;
    return filterType.value === 'any' ? true : matchType;
  };

  global.useFilter = function (adverts) {
    return adverts.filter(function (item) {
      return (
        featureFilter(item) &&
        guestsFilter(item) &&
        roomsFilter(item) &&
        priceFilter(item) &&
        houseTypeFilter(item)
      );
    });
  };
})(window);
