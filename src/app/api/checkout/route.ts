import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from '@/lib/mongoDb';
import { getServerSession } from "next-auth/next";
import { options } from "@/lib/AuthOptions";
import { ObjectId } from "mongodb";
// Define the User interface
interface User {
  name: string;
  address: any[];  // Address can be more complex; adjust as needed.
  cart: any[]; // Cart should hold cart items; adjust the type as needed.
}

// GET handler for the checkout page
export const GET = async (req: NextRequest) => {
  try {
    // Get the session of the currently logged-in user
   
  const session = await getServerSession({
    req,
    res: NextResponse,
    ...options
  });
    // If the session does not exist, respond with an unauthorized status
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Extract the user ID from the session
    const _id = session.user?._id;

    // Check if the user ID exists
    if (!_id) {
      return NextResponse.json({ error: "User ID not found" }, { status: 400 });
    }

    // Connect to the database
    const { db } = await connectToDatabase();

    // Fetch the user data from the database (use findOne for a single user)
    const user = await db.collection("users").findOne({ _id: new ObjectId(_id) });

    // If no user is found, return an error
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Return the user data along with cart and address
    return NextResponse.json(
      {
        name: user.name,
        address: user.address,
        cart: user.cart,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
