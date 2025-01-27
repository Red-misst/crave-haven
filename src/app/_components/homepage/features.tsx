import { FaTruck, FaUndo, FaHeadset } from "react-icons/fa";

function FeaturesSection() {
  return (
    <section className="container mx-auto my-8 flex flex-col justify-center gap-6 lg:flex-row text-gray-600">
      {/* Fast Delivery */}
      <div className="mx-5 mb-4 lg:mb-0 lg:ml-6 flex flex-row items-center justify-center border-2 border-yellow-500 rounded-lg py-4 px-5 bg-gradient-to-r from-yellow-400 to-orange-500 shadow-lg">
        <div>
          <FaTruck className="h-6 w-6 text-gray-600 lg:mr-2" />
        </div>
        <div className="ml-6 flex flex-col justify-center">
          <h3 className="text-left text-xs font-bold lg:text-sm text-white">Fast Delivery</h3>
          <p className="text-light text-center text-xs lg:text-left lg:text-sm ">
            Reliable delivery
          </p>
        </div>
      </div>

      {/* Money Returns */}
      <div className="mx-5 mb-4 lg:mb-0 lg:ml-6 flex flex-row items-center justify-center border-2 border-yellow-500 rounded-lg py-4 px-5 bg-gradient-to-r from-yellow-400 to-orange-500 shadow-lg">
        <div>
          <FaUndo className="h-6 w-6  lg:mr-2" />
        </div>
        <div className="ml-6 flex flex-col justify-center">
          <h3 className="text-left text-xs font-bold lg:text-sm text-white">Money Returns</h3>
          <p className="text-light text-left text-xs lg:text-sm ">24 Hrs guarantee</p>
        </div>
      </div>

      {/* 24/7 Support */}
      <div className="mx-5 lg:ml-6 flex flex-row items-center justify-center border-2 border-yellow-500 rounded-lg py-4 px-5 bg-gradient-to-r from-yellow-400 to-orange-500 shadow-lg">
        <div>
          <FaHeadset className="h-6 w-6  lg:mr-2" />
        </div>
        <div className="ml-6 flex flex-col justify-center">
          <h3 className="text-left text-xs font-bold lg:text-sm text-white">24/7 Support</h3>
          <p className="text-light text-left text-xs lg:text-sm ">Customer support</p>
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;