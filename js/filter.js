'use strict';

(function (global) {

  let filterWifi = document.querySelector('#filter-wifi');
  let filterDishwasher = document.querySelector('#filter-dishwasher');
  let filterParking = document.querySelector('#filter-parking');
  let filterWasher = document.querySelector('#filter-washer');
  let filterElevator = document.querySelector('#filter-elevator');
  let filterConditioner = document.querySelector('#filter-conditioner');
  let filterGuests = document.querySelector('#housing-guests');
  let filterRooms = document.querySelector('#housing-rooms');
  let filterPrice = document.querySelector('#housing-price');
  let filterType = document.querySelector('#housing-type');

  function featureFilter(item) {
    let wifiPresented = item.offer.features.indexOf('wifi') !== -1;
    let dishwasherPresented = item.offer.features.indexOf('dishwasher') !== -1;
    let parkingPresented = item.offer.features.indexOf('parking') !== -1;
    let washerPresented = item.offer.features.indexOf('washer') !== -1;
    let elevatorPresented = item.offer.features.indexOf('elevator') !== -1;
    let conditionerPresented = item.offer.features.indexOf('conditioner') !== -1;

    let result = true;
    result = result && (filterWifi.checked ? wifiPresented : true);
    result = result && (filterDishwasher.checked ? dishwasherPresented : true);
    result = result && (filterParking.checked ? parkingPresented : true);
    result = result && (filterWasher.checked ? washerPresented : true);
    result = result && (filterElevator.checked ? elevatorPresented : true);
    result = result && (filterConditioner.checked ? conditionerPresented : true);

    return result;
  };

  function guestsFilter(item) {
    let matchGuests = item.offer.guests === +filterGuests.value;
    return filterGuests.value === 'any' ? true : matchGuests;
  };

  function roomsFilter(item) {
    let matchRooms = item.offer.rooms === +filterRooms.value;
    return filterRooms.value === 'any' ? true : matchRooms;
  };

  function priceFilter(item) {
    let price = item.offer.price;
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

  function houseTypeFilter(item) {
    let matchType = item.offer.type === filterType.value;
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
