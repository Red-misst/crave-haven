import Image from "next/image";
import Link from "next/link";

function Banner() {
  return (
    <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] rounded-xl overflow-hidden mt-4">
      <Image
        src="https://res.cloudinary.com/dcdivbkwd/image/upload/v1701018195/food-e/chipsnburgers_jbxrgd.jpg"
        alt="Chips and Burgers"
        className="object-cover w-full h-full rounded-lg shadow-md"
        layout="fill"
        priority
      />
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="absolute inset-0 flex justify-center items-center text-center text-white z-10">
        <div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4">
            Your Hunger, Our Mission
          </h1>
          <p className="text-lg sm:text-xl mb-6">
            Craving something delicious? We’ve got you covered. Fast, fresh, and straight to you!
          </p>
          <Link href="/menu">
         
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-full text-lg font-semibold transition duration-300">
                Explore Menu
              </button>
          
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Banner;