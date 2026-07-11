import axios from "axios";
import fs from "fs";

const apiKey = process.env.GOOGLE_API_KEY;
const placeId = "ChIJ26WO-8_dQUcRtBFg3oBEkgU";

const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&key=${apiKey}`;

async function update() {
  try {
    console.log("Lekérés indul:", url);

    const res = await axios.get(url);
    console.log("HTTP státusz:", res.status);
    console.log("Google API válasz:", JSON.stringify(res.data, null, 2));

    const data = res.data;

    if (data.error_message) {
      console.error("Google API hiba:", data.error_message);
      return;
    }

    if (!data.result || !data.result.reviews) {
      console.error("Nincs elérhető értékelés a Google API válaszban.");
      return;
    }

    fs.writeFileSync("reviews.json", JSON.stringify(data.result.reviews, null, 2));
    console.log("Értékelések frissítve.");
  } catch (err) {
    console.error("Axios hiba:", err.toString());
  }
}

update();
