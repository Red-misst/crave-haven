
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from '@/lib/mongoDb';



interface Food {

    name: string,
    price: number,
    image: string,
    inStock: boolean, // Adjust this logic based on the actual data
    vendor: string, // Replace with the appropriate vendor field if available
    category: string,
}

export const GET = async (req: NextRequest) => {
  try {
    const { db } = await connectToDatabase();
 
    // Type cast WithId<Document>[] to Food[]
    const foods: Food[] = await db
      .collection('foods')
      .find({})
      .toArray()
      .then((result) =>
        result.map((item) => ({
          name: item.name,
          price: item.price,
          slug: item.slug,
          image: item.image,
         category: item.category,
         inStock: item.inStock
        })) as any
      );

      return NextResponse.json({foods: foods},  { status: 200 });
   } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};