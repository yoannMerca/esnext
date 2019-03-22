const print = console.log;
let favoriteCityId = "rome";
print(favoriteCityId);

favoriteCityId = "paris";
print(favoriteCityId);

const citiesId = ["paris", "nyc", "rome", "rio-de-janeiro"];
print(citiesId);

//citiesId = [];
//Assignment to constant variable.
//print(citiesId);

citiesId.push("tokyo");
print(citiesId);

function getWeather(cityId) {
  let city = cityId.toUpperCase();
  let temperature = 20;
  return { city, temperature };
}

const weather = getWeather(favoriteCityId);
print(weather);

let { city, temperature } = weather;
print(city);
print(temperature);

const [parisId, nyId, ...othersCitiesId] = citiesId;
print(parisId);
print(nyId);
print(othersCitiesId.length);

class Trip {
  constructor(id, name, imageUrl) {
    this.id = id || "paris";
    this.name = name || "Paris";
    this.imageUrl = imageUrl || "img/paris.jpg";
  }

  get price() {
    return this._price;
  }

  set price(newPrice) {
    this._price = newPrice;
  }

  toString() {
    return `Trip[${this.id} ${this.name} ${this.imageUrl} ${this.price}]`;
  }
  static defaultTrip() {
    return new Trip(
      "rio-de-janeiro",
      "Rio De Janeiro",
      "img/rio-de-janeiro.jpg"
    );
  }
}

const parisTrip = new Trip();
print(parisTrip);
print(parisTrip.name);

parisTrip.price = 100;

print(parisTrip.toString());

const defaultTrip = Trip.defaultTrip();

print(defaultTrip.toString());

class FreeTrip extends Trip {
  constructor(id, name, imageUrl) {
    super(id, name, imageUrl);
    this.price = 0;
  }
  toString() {
    return `FreeTrip[${this.id} ${this.name} ${this.imageUrl} ${this.price}]`;
  }
}

const freeTrip = new FreeTrip("nantes", "Nantes", "img/nantes.jpg");

print(freeTrip.toString());
//
//
//Promise, Set, Map, Arrow Function
//
class TripService {
  constructor() {
    this.trips = new Set();
    this.trips.add(new Trip("paris", "Paris", "img/paris.jpg"));
    this.trips.add(new Trip("nantes", "Nantes", "img/nantes.jpg"));
    this.trips.add(
      new Trip("rio-de-janeiro", "Rio de Janeiro", "img/rio-de-janeiro.jpg")
    );
  }

  findByName(tripName) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let array = Array.from(this.trips);
        let find = array.find(function(e) {
          return e.name == tripName;
        });
        if (find) {
          resolve(find);
        } else {
          reject("pas de trip avec ce nom :"+ tripName);
        }
      }, 2000);
    });
  }
}

class PriceService {
  constructor() {
    this.prices = new Map();
    this.prices.set("paris", 100);
    this.prices.set("rio-de-janeiro", 800);
    // 'paris' --> price = 100
    // 'rio-de-janeiro' --> price = 800)
    // no price for 'nantes'
  }

  findPriceByTripId(tripId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let find = this.prices.get(tripId);
        if (find) {
          resolve("Price - found :"+find );
        } else {
          reject("No price found for id :" + tripId);
        }
      }, 2000);
    });
  }
}

let testPromise = new TripService();
testPromise
  .findByName("Paris")
  .then(function(val) {
    console.log(val);
  })
  .catch(function(err) {
    console.log(err);
  });

testPromise
  .findByName("Toulouse")
  .then(function (val) {
    console.log(val);
  })
  .catch(function (err) {
    console.log(err);
  });

let testPromisePriceService = new PriceService();
testPromisePriceService
  .findPriceByTripId("rio-de-janeiro")
  .then(function(val) {
    console.log(val);
  })
  .catch(function(err) {
    console.log(err);
  });


  testPromise
  .findByName("Nantes")
  .then( (val) => testPromisePriceService
  .findPriceByTripId(val.id))
  .then((price)=>console.log(price))
  .catch((err)=>console.log(err));
