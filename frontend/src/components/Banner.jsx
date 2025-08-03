import { assets } from "../assets/assets";
import { motion } from "motion/react";

const Banner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col md:flex-row items-center md:items-start justify-between px-8 min-md:pl-14 pt-10 bg-gradient-to-r from-[#5335a2] to-[#a59aeb] max-w-6xl mx-3 md:mx-auto rounded-2xl overflow-hidden shadow-[0px_0px_300px_10px_rgba(165,_39,_255,_0.48)]">
      <div className="text-white">
        <h2 className="text-3xl font-medium">Do You Own a Luxury Car?</h2>
        <p className="mt-2">
          Monetize your vehicle effortlessly by listing it on CarRental.
        </p>
        <p className="max-w-130">
          We take care of insurance, driver verification and secure payments —
          so you can earn passive income, stress-free.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 bg-white hover:bg-slate-100 transition-transform duration-300 ease-in-out  text-primary rounded-lg text-sm mt-4 cursor-pointer ">
          List your Car
        </motion.button>
      </div>
      <motion.img
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1
         }}
        transition={{ duration: 0.7}}
        src={assets.banner_car_image}
        alt="BMW"
        className="max-h-45 mt-10"
      />
    </motion.div>
  );
};

export default Banner;
