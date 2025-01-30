import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoDb";
import { getServerSession } from "next-auth/next";
import { options } from "@/lib/AuthOptions";
import { ObjectId } from "mongodb";

interface CartItem {
  slug: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartData {
  items: CartItem[];
  totalPrice: number;
}

export const POST = async (req: NextRequest) => {
  try {
    const session = await getServerSession({ req, res: NextResponse, ...options });

    // Check if the user is logged in
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse the incoming cart data
    const cartData: CartData = await req.json();

    // Connect to MongoDB
    const { db } = await connectToDatabase();

    // Get the user ID from the session
    const userId = session.user?._id;

    if (!userId) {
      return NextResponse.json({ error: "User ID not found in session" }, { status: 400 });
    }

    // Find the user document
    const user = await db.collection("users").findOne({ _id: new ObjectId(userId) });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update the user's cart in the database
    const updatedUser = await db.collection("users").updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: {
          cart: cartData.items, // Save the updated cart
          totalPrice: cartData.totalPrice, // Save the total price
        },
      }
    );

    if (updatedUser.modifiedCount === 0) {
      console.log("error")
      return NextResponse.json({ error: "Failed to save cart" }, { status: 500 });
    }

    return NextResponse.json({ message: "Cart saved successfully" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
