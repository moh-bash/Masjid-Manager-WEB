import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest
) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json([]);
  }

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        query
      )}&limit=5`,
      {
        headers: {
          "User-Agent": "MasjidManager",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Location search failed");
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "حدث خطأ أثناء البحث عن الموقع",
      },
      {
        status: 500,
      }
    );
  }
}