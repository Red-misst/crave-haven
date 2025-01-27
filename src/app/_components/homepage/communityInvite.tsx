import { FaWhatsapp } from "react-icons/fa";

function JoinCommunity() {
    return (
        <section className="mt-10 mx-auto flex flex-col-reverse md:flex-row max-w-[1200px] justify-between gap-6 px-4 md:px-0">
            {/* Left Section */}
            <div className="py-8 px-6 lg:px-10 bg-gradient-to-r from-yellow-400 to-orange-500 w-full rounded-lg shadow-lg">
                <p className="text-white text-sm">JOIN OUR COMMUNITY</p>
                <h2 className="pt-6 text-3xl font-bold text-white">
                    <FaWhatsapp className="inline mr-2 text-green-600" size="1.7em" /> WhatsApp Invite
                </h2>
                <p className="pt-4 text-white text-lg">
                    Stay updated with the latest news and exciting offers from FOOD-E
                </p>
                <a href="https://chat.whatsapp.com/ETR6TOrMo6DHpj1S0r5eaH">
                    <button className="mt-6 bg-white text-green-600 px-6 py-3 rounded-full duration-150 hover:bg-green-500 hover:text-gray-700">

                        Join now

                    </button>
                </a>
            </div>

            {/* Right Section Banner */}
            <div className="relative w-full md:w-[550px] max-w-[400px] mx-auto rounded-lg">
                <img
                    className="w-full h-[250px] md:h-[350px] object-cover rounded-lg shadow-md"
                    src="https://res.cloudinary.com/dcdivbkwd/image/upload/v1676012814/samples/food/fish-vegetables.jpg"
                    alt="Delicious food"
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center bg-gradient-to-t from-black via-transparent to-transparent rounded-lg text-white text-center p-4">
                    <h3 className="text-2xl font-bold mb-2">Taste the Best, Delivering to You!</h3>
                    <p className="text-sm md:text-base mb-4">
                        Fresh, hot, and delivered fast – because you deserve the best every time.
                    </p>
                    <button className="bg-yellow-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-yellow-600">
                        Discover More
                    </button>
                </div>
            </div>
        </section>
    );
}

export default JoinCommunity;