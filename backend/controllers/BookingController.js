import Booking from "../models/Booking.js";
import Car from "../models/car.js";

//Fnction to check the Availaibility of the Car for given date
const checkAvailability = async (car, pickupDate, returnDate) => {
  const bookings = await Booking.find({
    car: car,
    pickupDate: { $lte: returnDate },
    returnDate: { $gte: pickupDate },
  });
  return bookings.length === 0;
};

//API to check the Availaibility of the Car for given date and location
export const checkCarAvailability = async (req, res) => {
  try {
    const { pickupDate, returnDate, location } = req.body;

    const cars = await Car.find({ location, isAvaliable: true });

    const availableCarsPromises = cars.map(async (car) => {
      const isAvailable = await checkAvailability(
        car._id,
        pickupDate,
        returnDate
      );
      return { ...car._doc, isAvailable: isAvailable };
    });

    let availableCars = await Promise.all(availableCarsPromises);
    availableCars = availableCars.filter((car) => car.isAvailable === true);
    res.json({ success: true, availableCars });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//api to create Booking

export const createBooking = async (req, res) => {
  try {
    const { _id } = req.user;
    const { car, pickupDate, returnDate } = req.body;
    const isAvailable = await checkAvailability(car, pickupDate, returnDate);
    if (!isAvailable) {
      return res.json({ success: false, message: "Car is not available" });
    }
    const carData = await Car.findById(car);

    // calculate price on the basis of pickupdate and return date
    const picked = new Date(pickupDate);
    const returned = new Date(returnDate);
    const noOfDays = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24));
    const price = noOfDays * carData.pricePerDay;

    await Booking.create({
      car,
      owner: carData.owner,
      user: _id,
      pickupDate,
      returnDate,
      price,
    });
    res.json({ success: true, message: "Booking created successfully" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//api to get all bookings
export const getUserBooking = async (req, res) => {
  try {
    const { _id } = req.user;
    const bookings = await Booking.find({ user: _id }).populate("car").sort({
      createdAt: -1,
    });
    res.json({ success: true, bookings });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//api to get owner booking
export const getOwnerBookings = async (req, res) => {
  try {
    if (req.user.role !== "owner") {
      return res.json({
        success: false,
        message: "You are not authorized to access this route.",
      });
    }

    const bookings = await Booking.find({ owner: req.user._id })
      .populate("car user")
      .select("-user.password")
      .sort({
        createdAt: -1,
      });
    res.json({ success: true, bookings });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//api to change booking status
export const changeBookingStatus = async (req, res) => {
  try {
    const { _id } = req.user;
    const { bookingId, status } = req.body;
    const booking = await Booking.findById(bookingId);

    if (booking.owner.toString() !== _id.toString()) {
      return res.json({
        success: false,
        message: "You are not authorized to access this route.",
      });
    }

    booking.status = status;
    await booking.save();

    res.json({ success: true, message: "Booking status updated." });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
