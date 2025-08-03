import { assets } from "../assets/assets";
import Title from "./Title";
import { motion } from "motion/react";

const Testimonial = () => {
  const testimonials = [
    {
      name: "Ananya Deshmukh",
      location: "Pune, Maharashtra",
      image: assets.testimonial_image_1,
      rating: 5,
      testimonial:
        "I've rented cars from various companies, but the experience with CarRental was exceptional.",
    },
    {
      name: "Vivaan Kapoor",
      location: "New Delhi, India",
      image: assets.testimonial_image_2,
      testimonial:
        "CarRental made my trip so much easier. The car was delivered right to my door, and the customer service was fantastic!",
    },
    {
      name: "Meera Fernandez",
      location: "Chennai, Tamil Nadu",
      image: assets.testimonial_image_3,
      testimonial:
        "I highly recommend CarRental! Their fleet is amazing, and I always feel like I'm getting the best deal with excellent service.",
    },
  ];

  return (
    <div className="py-28 px-6 md:px-16 lg:px-24 xl:px-44">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}>
        <Title
          title="What Our Customers Say"
          subTitle="Discover why Discerning travellers choose StayVenture for there luxury accomodations around the world."
        />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-18">
        {testimonials.map((testimonial, index) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.4,
              ease: "easeInOut",
            }}
            viewport={{ once: true, amount: 0.3 }}
            key={index}
            className="bg-white p-6 rounded-xl shadow-[0px_0px_207px_10px_rgba(60,_59,_60,_0.2)] hover:-translate-y-1 transition-all duration-500">
            <div className="flex items-center gap-3">
              <img
                className="w-12 h-12 rounded-full"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div>
                <p className="font-playfair text-xl">{testimonial.name}</p>
                <p className="text-gray-500">{testimonial.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4">
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <img key={index} src={assets.star_icon} alt="Star Icon" />
                ))}
            </div>
            <p className="text-gray-500 max-w-90 mt-4 font-light">
              "{testimonial.testimonial}"
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
